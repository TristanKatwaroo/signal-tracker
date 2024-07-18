// src/utils/fetchGachaLogs.ts

interface GachaLogData {
  data: {
    list: any[];
    [key: string]: any;
  };
  message: string;
  retcode: number;
}

async function fetchGachaLogZenless(baseUrl: string, gachaType: number, page: number = 1, endId: number | string = 0): Promise<GachaLogData | null> {
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

export async function fetchAllGachaLogsForType(baseUrl: string, gachaType: number): Promise<any[]> {
  let allData: any[] = [];
  let page = 1;
  let endId: number | string = 0;
  let moreData = true;

  while (moreData) {
    const data = await fetchGachaLogZenless(baseUrl, gachaType, page, endId);

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
