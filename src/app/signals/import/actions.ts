// src/app/signals/import/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { fetchAllGachaLogsForType } from '@/utils/fetchGachaLogs';

export async function importGachaLog(formData: FormData) {
  const url = formData.get('url') as string;

  if (!url) {
    throw new Error('No URL provided');
  }

  try {
    const gachaTypes = [1001, 2001, 3001, 5001];
    let allData: any[] = [];

    for (const gachaType of gachaTypes) {
      const dataForType = await fetchAllGachaLogsForType(url, gachaType);
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
