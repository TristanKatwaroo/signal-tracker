// src/app/signals/import/actions.ts

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface GachaLogData {
  data: {
    list: any[];
    [key: string]: any;
  };
  message: string;
  retcode: number;
}

export async function clearCookies() {
  cookies().delete('displayResults')
  cookies().delete('resultData')
}

async function fetchType(baseUrl: string, gachaType: number): Promise<{ error?: string, dataForType?: any[] }> {
  let allData: any[] = [];
  let page = 1;
  let endId: number | string = 0;
  let moreData = true;

  while (moreData) {
    const completeUrl = `${baseUrl}&page=${page}&size=20&gacha_type=${gachaType}&end_id=${endId}&sync_upstream=1`;

    try {
      console.log(`Fetching data for gacha type ${gachaType}, page ${page}`);
      const response = await fetch(completeUrl);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(allData); // Output to console

  // Revalidate the path to refresh the page if necessary
  revalidatePath('/signals/import');

  return { data: allData };
}

export async function saveSignals(formData: FormData) {
  // const url = formData.get('url') as string;

  if (!formData) {
    return { error: "data is empty." };
  }

  const response = await fetch(`https://dummyjson.com/posts?limit=3`);
  const data = await response.json()
  console.log(data)

  // const gachaTypes = [1001, 2001, 3001, 5001];
  // let allData: any[] = [];

    // const { error, dataForType } = await fetchType(url, gachaType);

    // if (error) {
    //   return { error };
    // }

    // Add delay between types to avoid rate limiting
    // await new Promise(resolve => setTimeout(resolve, 1000));

  // Revalidate the path to refresh the page if necessary
  revalidatePath('/signals/import');

  // return { data: allData };
}