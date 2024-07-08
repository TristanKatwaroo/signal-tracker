import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface GachaLogData {
  data: {
    list: any[];
    [key: string]: any;
  };
  message: string;
  retcode: number;
}

const baseUrl = 'https://public-operation-nap-sg.hoyoverse.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&authkey=pwb87aNtQDhOe6nHV56jOAXV1YZGUMc4Q9RffOrGqJgXYC3bbkB3H7My%2fpCQ1f01pUf11JBHvB7M9YeBeGCBCwE1%2fwh3R9FcgpTAJqRypxokZ198SDQKDU3z%2b5JoZ%2fuT99LTTP1XeaG1wy3FT4XpDh9uCfqGYjecMejRCM7k2CebH0yVtA7eQatmrrEcjX0mOWIIuf5bzm5uSjgVjF5p%2b7TqIOSkBvgZz8wiepwWsYdYUdRu1BzWtqUtkdGUCDB4q5UCeN5EVrv5MyUuwh77paav07Vlapb601ftmlzXK%2fWnPUiTCVNp6x4RJUV%2bRz7YOqqGDCslO4Ng5U2%2fBHNgsJR84cuuhVxvcu%2fkupibNoXbrzNnEmdRwqzcziVabqXO0zA2FNTkDkj%2f2uw9%2fBw8m0Y7uJ3iv42LVsBv8enW32akFYAHT6lkaMqYy3t2neci0VzVoZS0EYNi35Izfjgh9e7JGTOzWkGC8CZfhEggmmAVxGXw1u%2fQ7d47fV0%2fkrLAc4NndWWAA2oICv%2fe49t5INlRtiMxfYTx6m%2fAO%2fovPjxVkGfq7XXPiSRhk7b1LrMzSTBBI93qzJ05%2fsD9iBiK6gYiMg0rC99Q81kGecPIlNIhKgASusKW6%2blZ5p8AtByl55BJABnUtMyi6Bv0AG%2bFhUPjhzx0wrv56KQE8A5URx4%3d&lang=en&game_biz=nap_global';

async function fetchGachaLogZenless(gachaType: number, page: number = 1, endId: number | string = 0): Promise<GachaLogData | null> {
  const completeUrl = `${baseUrl}&page=${page}&size=20&gacha_type=${gachaType}&end_id=${endId}&sync_upstream=1`;

  try {
    console.log(`Fetching data for gacha type ${gachaType}, page ${page}`);
    const response = await fetch(completeUrl);
    const data = await response.json() as GachaLogData;

    if (data.retcode !== 0) {
      console.error(`Error fetching data for gacha type ${gachaType}: ${data.message}`);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error(`Failed to fetch gacha log data for gacha type ${gachaType}: ${(error as Error).message}`);
    return null;
  }
}

async function fetchAllGachaLogsForType(gachaType: number): Promise<any[]> {
  let allData: any[] = [];
  let page = 1;
  let endId: number | string = 0;
  let moreData = true;

  while (moreData) {
    const data = await fetchGachaLogZenless(gachaType, page, endId);

    if (data === null) {
      console.log(`Stopping fetch for gacha type ${gachaType} due to an error.`);
      moreData = false;
    } else if (data.data.list.length > 0) {
      allData = allData.concat(data.data.list);
      page++;
      endId = data.data.list[data.data.list.length - 1].id; // Update endId for next page
    } else {
      moreData = false; // No more data available
    }

    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`Fetched a total of ${allData.length} gacha logs for gacha type ${gachaType}.`);
  return allData;
}

export async function GET(req: NextRequest) {
  const gachaTypes = [1001, 2001, 3001, 5001];

  try {
    let allData: any[] = [];

    for (const gachaType of gachaTypes) {
      const dataForType = await fetchAllGachaLogsForType(gachaType);
      allData = allData.concat(dataForType);

      // Add delay between types to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return NextResponse.json({ data: allData, count: allData.length });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
