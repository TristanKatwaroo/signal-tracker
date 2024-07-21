// src/app/signals/import/actions.ts

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Ensure this path is correct

interface SignalData {
  uid: string;
  gacha_id: string;
  gacha_type: string;
  item_id: string;
  count: string;
  time: string;
  name: string;
  item_type: string;
  rank_type: string;
  id: string;
}

interface GachaLogData {
  data: {
    list: any[];
    [key: string]: any;
  };
  message: string;
  retcode: number;
}

const rateLimit = {
  requests: 0,
  maxRequests: 100, // Max requests per minute
  resetTime: Date.now() + 60 * 1000 // Reset every minute
};

async function fetchWithExponentialBackoff(url: string, retries: number = 5, delay: number = 1000): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries === 0) {
      throw new Error(`Max retries reached. ${error}`);
    }
    console.error(`Retrying fetch... ${retries} retries left. Error: ${error}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithExponentialBackoff(url, retries - 1, delay * 2);
  }
}

async function fetchType(baseUrl: string, gachaType: number): Promise<{ error?: string, dataForType?: any[] }> {
  let allData: any[] = [];
  let page = 1;
  let endId: number | string = 0;
  let moreData = true;

  while (moreData) {
    const completeUrl = `${baseUrl}&page=${page}&size=20&gacha_type=${gachaType}&end_id=${endId}&sync_upstream=1`;

    // Global rate limit check
    if (Date.now() > rateLimit.resetTime) {
      rateLimit.requests = 0;
      rateLimit.resetTime = Date.now() + 60 * 1000;
    }

    if (rateLimit.requests >= rateLimit.maxRequests) {
      console.error('Rate limit exceeded. Please try again later.');
      return { error: 'Rate limit exceeded. Please try again later.' };
    }

    try {
      console.log(`Fetching data for gacha type ${gachaType}, page ${page}`);
      const response = await fetchWithExponentialBackoff(completeUrl);
      const data = await response.json() as GachaLogData;

      if (data.retcode !== 0) {
        console.error(`Error fetching data for gacha type ${gachaType}: ${data.message}`);
        return { error: data.message };
      }

      if (data.data.list.length > 0) {
        allData = allData.concat(data.data.list);
        page++;
        endId = data.data.list[data.data.list.length - 1].id; // Update endId for next page
      } else {
        moreData = false; // No more data available
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 80));

      // Increment the rate limit counter
      rateLimit.requests++;
    } catch (error) {
      console.error(`Failed to fetch gacha log data for gacha type ${gachaType}: ${(error as Error).message}`);
      return { error: (error as Error).message };
    }
  }

  console.log(`Fetched a total of ${allData.length} gacha logs for gacha type ${gachaType}.`);
  return { dataForType: allData };
}

export async function importSignals(formData: FormData) {
  const url = formData.get('url') as string;

  if (!url) {
    return { error: "Field can't be empty." };
  }

  const gachaTypes = [1001, 2001, 3001, 5001];
  let allData: any[] = [];

  for (const gachaType of gachaTypes) {
    const { error, dataForType } = await fetchType(url, gachaType);

    if (error) {
      return { error };
    }

    allData = allData.concat(dataForType);

    // Add delay between types to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 80));
  }

  console.log(allData); // Output to console

  // Revalidate the path to refresh the page if necessary
  revalidatePath('/signals/import');

  return { data: allData };
}

export async function saveSignals(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "User not authenticated." };
  }

  const data = formData.get('data') as string;
  if (!data) {
    return { error: "Data is empty." };
  }

  let signals: SignalData[];
  try {
    signals = JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse signals data:", error);
    return { error: "Invalid data format." };
  }

  const insertData = signals.map(signal => ({
    uid: signal.uid,
    gacha_id: signal.gacha_id,
    gacha_type: parseInt(signal.gacha_type, 10),
    item_id: signal.item_id,
    count: parseInt(signal.count, 10),
    time: signal.time,
    name: signal.name,
    item_type: signal.item_type,
    rank_type: parseInt(signal.rank_type, 10),
    user_id: user.id, // Use the authenticated user's UID
    signal_id: signal.id // Add the signal_id field
  }));

  const { error } = await supabase
    .from('signals')
    .insert(insertData);

  if (error) {
    if (error.code === '23505') { // Check for duplicate key error
      console.error("Duplicate entry detected:", error);
      return { error: "Data already exists in the database." };
    } else {
      console.error("Failed to save signals:", error);
      return { error: "Failed to save signals." };
    }
  }

  console.log("Signals saved successfully");

  revalidatePath('/signals/import');
  redirect('/signals');
}
