'use client';

import React from 'react'

type Props = {
  result: {
    error?: string;
    data?: any[];
  } | null;
}

export default function ImportResult({ result }: Props) {
  if (!result) {
    return null;
  }

  if (result.error) {
    return <p className="text-red-500">Error: {result.error}</p>;
  }

  if (result.data && result.data.length > 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Import Result</h2>
        <ul className="list-disc list-inside">
          {result.data.slice(0, 10).map((item, index) => (
            <li key={index}>
              {item.item_type}: {item.name} (Rarity: {item.rank_type})
            </li>
          ))}
        </ul>
        {result.data.length > 10 && (
          <p className="mt-2">...and {result.data.length - 10} more items</p>
        )}
      </div>
    );
  }

  return <p>No data found.</p>;
}