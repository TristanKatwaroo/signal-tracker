// 'use client';

// import React, { useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getGachaTypeName } from "@/utils/gachaTypeUtil";
import { getRarityColor } from "@/utils/rarityColorUtil";
import SaveButton from "./SaveButton";
import { saveSignals } from "@/app/signals/import/actions";

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

  const handleSubmit = async (formData: FormData) => {
    'use server';

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("submit");
    
    const result = await saveSignals(formData);
    if (result) {
      console.log(result);
    }
  };

  if (result.data && result.data.length > 0) {
    return (
      <form action={handleSubmit} className="w-full mx-auto mt-4">
        <h2 className="text-xl font-bold mb-2">Import Result</h2>
        <div className="rounded-md border">
          <div className="overflow-hidden">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[200px]">Channel</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[200px]">Time</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableBody>
                {result.data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-[200px]">{getGachaTypeName(item.gacha_type)}</TableCell>
                    <TableCell className={getRarityColor(item.rank_type)}>
                      {item.name}
                    </TableCell>
                    <TableCell className="w-[200px]">{new Date(item.time).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <p className="mt-2 text-sm text-gray-500">Total items: {result.data.length}</p>
        <SaveButton />
      </form>
    );
  }

  return <p>No data found.</p>;
}