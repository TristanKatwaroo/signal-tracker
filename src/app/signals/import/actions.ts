'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
// import * as Sentry from '@sentry/nextjs';

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
  maxRequests: 100,
  resetTime: Date.now() + 60 * 1000
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

    if (Date.now() > rateLimit.resetTime) {
      rateLimit.requests = 0;
      rateLimit.resetTime = Date.now() + 60 * 1000;
    }

    if (rateLimit.requests >= rateLimit.maxRequests) {
      const error = new Error('Rate limit exceeded. Please try again later.');
      return { error: error.message };
    }

    try {
      const response = await fetchWithExponentialBackoff(completeUrl);
      const data = await response.json() as GachaLogData;

      if (data.retcode !== 0) {
        const error = new Error(`Error fetching data for gacha type ${gachaType}: ${data.message}`);
        return { error: data.message };
      }

      if (data.data.list.length > 0) {
        allData = allData.concat(data.data.list);
        page++;
        endId = data.data.list[data.data.list.length - 1].id;
      } else {
        moreData = false;
      }

      await new Promise(resolve => setTimeout(resolve, 80));
      rateLimit.requests++;
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  return { dataForType: allData };
}

export async function importSignals(formData: FormData) {
  const url = formData.get('url') as string;

  if (!url) {
    const error = new Error("Field can't be empty.");
    return { error: error.message };
  }

  const gachaTypes = [1001, 2001, 3001, 5001];
  let allData: any[] = [];

  for (const gachaType of gachaTypes) {
    const { error, dataForType } = await fetchType(url, gachaType);

    if (error) {
      return { error };
    }

    allData = allData.concat(dataForType);
    await new Promise(resolve => setTimeout(resolve, 80));
  }

  revalidatePath('/signals/import');

  return { data: allData };
}

export async function saveSignals(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const error = new Error("User not authenticated.");
    return { error: error.message };
  }

  const data = formData.get('data') as string;
  if (!data) {
    const error = new Error("Data is empty.");
    return { error: error.message };
  }

  let signals: SignalData[];
  try {
    signals = JSON.parse(data);
  } catch (error) {
    return { error: "Invalid data format." };
  }

  // Get the current highest signal_number for each gacha_type for the user
  const gachaTypes = new Set<number>();
  signals.forEach(signal => {
    gachaTypes.add(parseInt(signal.gacha_type, 10));
  });

  const maxSignalNumbers: { [key: number]: number } = {};
  for (const gachaType of Array.from(gachaTypes)) {
    const { data: maxSignalNumberData, error: maxSignalNumberError } = await supabase
      .from('signals')
      .select('signal_number')
      .eq('user_id', user.id)
      .eq('gacha_type', gachaType)
      .order('signal_number', { ascending: false })
      .limit(1)
      .single();

    maxSignalNumbers[gachaType] = maxSignalNumberError || maxSignalNumberData === null ? 0 : maxSignalNumberData.signal_number ?? 0;
  }

  // Prepare the data for insertion
  let insertData = signals.map(signal => {
    const gachaType = parseInt(signal.gacha_type, 10);
    const signal_number = ++maxSignalNumbers[gachaType];
    return {
      uid: signal.uid,
      gacha_id: signal.gacha_id,
      gacha_type: gachaType,
      item_id: signal.item_id,
      count: parseInt(signal.count, 10),
      time: signal.time,
      name: signal.name,
      item_type: signal.item_type,
      rank_type: parseInt(signal.rank_type, 10),
      user_id: user.id,
      signal_id: signal.id,
      signal_number
    };
  });

  const { error } = await supabase
    .from('signals')
    .insert(insertData);

  if (error) {
    if (error.code === '23505') {
      return { error: "Data already exists in the database." };
    } else {
      return { error: "Failed to save signals." };
    }
  }

  revalidatePath('/signals/import');
  redirect('/signals');
}
