// src/app/signals/import/actions.ts

'use server';

import { revalidatePath } from 'next/cache';

interface GachaLogData {
  data: {
    list: any[];
    [key: string]: any;
  };
  message: string;
  retcode: number;
}

async function fetchGachaLogs(baseUrl: string, gachaType: number): Promise<any[]> {
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
        throw new Error(data.message);
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
      moreData = false;
    }
  }

  console.log(`Fetched a total of ${allData.length} gacha logs for gacha type ${gachaType}.`);
  return allData;
}

export async function importGachaLog(url: string) {
  if (!url) {
    throw new Error('No URL provided');
  }

  try {
    const gachaTypes = [1001, 2001, 3001, 5001];
    let allData: any[] = [];

    for (const gachaType of gachaTypes) {
      const dataForType = await fetchGachaLogs(url, gachaType);
      allData = allData.concat(dataForType);

      // Add delay between types to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(allData); // Output to console

    // Revalidate the path to refresh the page if necessary
    revalidatePath('/signals/import');

    return { count: allData.length };
  } catch (error) {
    console.error(`Failed to fetch gacha log data: ${(error as Error).message}`);
    throw error;
  }
}

export async function handleSubmit(formData: FormData) {
  const url = formData.get('url') as string;
  return await importGachaLog(url);
}
