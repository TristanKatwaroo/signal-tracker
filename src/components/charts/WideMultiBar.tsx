import dynamic from 'next/dynamic';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartDataItem, ChartKeys } from '@/types/custom';

const WideMultiBarContent = dynamic(() => import('./WideMultiBarContent').then((mod) => mod.WideMultiBarContent), {
  ssr: false,
});

const chartConfig = {
  fiveStar: { label: "S-Rank", color: "hsl(var(--chart-2))" },
  fourStar: { label: "A-Rank", color: "hsl(var(--chart-7))" },
  threeStar: { label: "B-Rank", color: "hsl(var(--chart-6))" },
} as const;

interface WideMultiBarProps {
  chartData: ChartDataItem[];
}

export default function WideMultiBar({ chartData }: WideMultiBarProps) {
  const total = chartData.reduce((acc, curr) => ({
    total: acc.total + curr.fiveStar + curr.fourStar + curr.threeStar,
    fiveStar: acc.fiveStar + curr.fiveStar,
    fourStar: acc.fourStar + curr.fourStar,
    threeStar: acc.threeStar + curr.threeStar,
  }), { total: 0, fiveStar: 0, fourStar: 0, threeStar: 0 });

  return (
    <Card className="lg:col-span-2 overflow-hidden rounded-md">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Distribution</CardTitle>
          <CardDescription>
            Showing a breakdown of your signals across the pity range
          </CardDescription>
        </div>
        <div className="flex">
          <TotalDisplay label="Total" value={total.total} />
          {(Object.keys(chartConfig) as ChartKeys[]).map((key) => (
            <ChartToggle
              key={key}
              chart={key}
              label={chartConfig[key].label}
              value={total[key]}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <WideMultiBarContent chartData={chartData} />
      </CardContent>
    </Card>
  );
}

interface TotalDisplayProps {
  label: string;
  value: number;
}

function TotalDisplay({ label, value }: TotalDisplayProps) {
  return (
    <div className="relative z-30 flex flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-bold leading-none sm:text-3xl">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

interface ChartToggleProps {
  chart: ChartKeys;
  label: string;
  value: number;
}

function ChartToggle({ chart, label, value }: ChartToggleProps) {
  return (
    <div
      className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 transition-all hover:bg-muted/30"
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-bold leading-none sm:text-3xl">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
