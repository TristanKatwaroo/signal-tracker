import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

interface GachaLog {
  id: string;
  gacha_type: number;
  item_id: number;
  item_name: string;
  item_rarity: number;
  user_id: number;
  timestamp: string;
}

interface GachaResponse {
  retcode: number;
  message: string;
  data: {
    list: GachaLog[];
  };
}

function isGachaResponse(data: any): data is GachaResponse {
  return (
    typeof data === 'object' &&
    'retcode' in data &&
    'message' in data &&
    'data' in data &&
    data.data !== null && // Ensure data.data is not null
    'list' in data.data &&
    Array.isArray(data.data.list)
  );
}

async function fetchGachaLogZenless(gachaType: number, page = 1, endId = 0): Promise<GachaResponse | null> {
  const baseUrl = "https://public-operation-nap-sg.hoyoverse.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&authkey=pwb87aNtQDhOe6nHV56jOAXV1YZGUMc4Q9RffOrGqJgXYC3bbkB3H7My%2fpCQ1f01pUf11JBHvB7M9YeBeGCBCwE1%2fwh3R9FcgpTAJqRypxokZ198SDQKDU3z%2b5JoZ%2fuT99LTTP1XeaG1wy3FT4XpDh9uCfqGYjecMejRCM7k2CebH0yVtA7eQatmrrEcjX0mOWIIuf5bzm5uSjgVjF5p%2b7TqIOSkBvgZz8wiepwWsYdYUdRu1BzWtqUtkdGUCDB4q5UCeN5EVrv5MyUuwh77paav07Vlapb601ftmlzXK%2fWnPUiTCVNp6x4RJUV%2bRz7YOqqGDCslO4Ng5U2%2fBHNgsJR84cuuhVxvcu%2fkupibNoXbrzNnEmdRwqzcziVabqXO0zA2FNTkDkj%2f2uw9%2fBw8m0Y7uJ3iv42LVsBv8enW32akFYAHT6lkaMqYy3t2neci0VzVoZS0EYNi35Izfjgh9e7JGTOzWkGC8CZfhEggmmAVxGXw1u%2fQ7d47fV0%2fkrLAc4NndWWAA2oICv%2fe49t5INlRtiMxfYTx6m%2fAO%2fovPjxVkGfq7XXPiSRhk7b1LrMzSTBBI93qzJ05%2fsD9iBiK6gYiMg0rC99Q81kGecPIlNIhKgASusKW6%2blZ5p8AtByl55BJABnUtMyi6Bv0AG%2bFhUPjhzx0wrv56KQE8A5URx4%3d&lang=en&game_biz=nap_global";
  const completeUrl = `${baseUrl}&page=${page}&size=20&gacha_type=${gachaType}&end_id=${endId}&sync_upstream=1`;

  try {
    const response = await fetch(completeUrl);
    const data: unknown = await response.json();

    if (!isGachaResponse(data)) {
      throw new Error('Invalid response structure');
    }

    if (data.retcode !== 0) {
      throw new Error(data.message);
    }

    
    console.log("page: ", page, " | gachaType: ", gachaType, " | endId: ", endId)

    return data;
  } catch (error) {
    console.error(`Failed to fetch gacha log data: ${(error as Error).message}`);
    return null;
  }
}

async function fetchAllGachaLogsZenless(): Promise<GachaLog[]> {
  const gachaTypes = [1001, 2001, 3001, 5001];
  let allData: GachaLog[] = [];
  let fetchError = false;

  for (const gachaType of gachaTypes) {
    if (fetchError) {
      break;
    }

    let page = 1;
    let endId = 0;
    let moreData = true;

    while (moreData) {
      const data = await fetchGachaLogZenless(gachaType, page, endId);
    //   console.log(`Fetched data for gachaType ${gachaType}, page ${page}:`, data);

      if (data === null) {
        console.log(`Stopping fetch for all gacha types due to an error.`);
        fetchError = true;
        moreData = false;
      } else if (data.data.list.length > 0) {
        allData = allData.concat(data.data.list);
        page++;
        endId = parseInt(data.data.list[data.data.list.length - 1].id); // Update endId for next page
      } else {
        moreData = false; // No more data available
      }
    }
  }

  return allData;
}

export async function GET() {
  try {
    const data = await fetchAllGachaLogsZenless();
    console.log('Length: ', data.length);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error fetching gacha logs:', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
