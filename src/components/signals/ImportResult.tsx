// src/app/signals/import/ImportResult.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getGachaTypeName } from "@/utils/gachaTypeUtil";
import { getRarityColor } from "@/utils/rarityColorUtil";
import SaveButton from "./SaveButton";

type Props = {
  result: {
    error?: string;
    data?: any[];
  } | null;
};

export default function ImportResult({ result }: Props) {
  if (!result) {
    return null;
  }

  if (result.error) {
    return <p className="text-red-500 text-sm">Error: {result.error}</p>;
  }

  if (result.data && result.data.length > 0) {
    const sortedData = result.data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    return (
      <div className="w-full mx-auto mt-4">
        <h2 className="text-xl font-bold mb-2">Import Result</h2>
        <div className="rounded-md border">
          <div className="overflow-hidden">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
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
                {sortedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-[50px]">{index + 1}</TableCell>
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
        <SaveButton data={result.data} />
      </div>
    );
  }

  return <p>No data found.</p>;
}
