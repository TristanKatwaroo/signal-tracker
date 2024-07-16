import React, { useEffect, useState } from 'react';

interface GachaLog {
  id: string;
  name: string;
  // Add other fields as necessary
}

interface ApiResponse {
  data: GachaLog[];
  count: number;
  error?: string;
}

const FetchGachaLogs: React.FC = () => {
  const [logs, setLogs] = useState<GachaLog[]>([]);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/fetchGachaLogs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();

        if (isMounted) {
          if (result.error) {
            setError(result.error);
            console.error(`Error fetching gacha logs: ${result.error}`);
          } else {
            setLogs(result.data);
            setCount(result.count);
            console.log('Fetched gacha logs:', result.data);
            console.log(`Total number of gacha objects found: ${result.count}`);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('An error occurred while fetching gacha logs.');
          console.error('An error occurred while fetching gacha logs:', err);
        }
      }
    };

    fetchLogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Gacha Logs</h1>
      {error && <p>Error: {error}</p>}
      <p>Total Logs: {count}</p>
      <ul>
        {logs.map(log => (
          <li key={log.id}>{log.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchGachaLogs;
