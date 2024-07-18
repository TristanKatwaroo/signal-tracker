"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { ChartDataItem, ChartKeys } from '@/types/custom';

const chartConfig: ChartConfig = {
  fiveStar: { label: "S-Rank", color: "hsl(var(--chart-2))" },
  fourStar: { label: "A-Rank", color: "hsl(var(--chart-7))" },
  threeStar: { label: "B-Rank", color: "hsl(var(--chart-6))" },
};

interface WideMultiBarContentProps {
  chartData: ChartDataItem[];
}

export function WideMultiBarContent({ chartData }: WideMultiBarContentProps) {
  const [visibleCharts, setVisibleCharts] = React.useState<Record<ChartKeys, boolean>>({
    fiveStar: true,
    fourStar: true,
    threeStar: true,
  });

  const toggleChartVisibility = React.useCallback((chart: ChartKeys) => {
    setVisibleCharts((prev) => ({ ...prev, [chart]: !prev[chart] }));
  }, []);

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => ({
      total: acc.total + curr.fiveStar + curr.fourStar + curr.threeStar,
      fiveStar: acc.fiveStar + curr.fiveStar,
      fourStar: acc.fourStar + curr.fourStar,
      threeStar: acc.threeStar + curr.threeStar,
    }), { total: 0, fiveStar: 0, fourStar: 0, threeStar: 0 });
  }, [chartData]);

  const getRadius = React.useCallback((entry: ChartDataItem, dataKey: ChartKeys): [number, number, number, number] => {
    const enabledBars = (Object.keys(visibleCharts) as ChartKeys[])
      .filter((key) => visibleCharts[key]);
    const barsPresent = enabledBars.filter((key) => entry[key] > 0);

    if (enabledBars.length === 1 || barsPresent.length === 1) return [3, 3, 3, 3];

    const isHighest = barsPresent[0] === dataKey;
    const isLowest = barsPresent[barsPresent.length - 1] === dataKey;

    if (isHighest) return [0, 0, 3, 3];
    if (isLowest) return [3, 3, 0, 0];
    return [0, 0, 0, 0];
  }, [visibleCharts]);

  return (
    <Card className="lg:col-span-2 overflow-hidden">
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
              isVisible={visibleCharts[key]}
              label={chartConfig[key].label as string}
              value={total[key]}
              onToggle={() => toggleChartVisibility(key)}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="pity" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <ChartTooltip content={<ChartTooltipContent className="w-[150px]" nameKey="pity" labelFormatter={(value, payload) => `${payload[0].payload.pity}`} />} />
            {(Object.keys(chartConfig) as ChartKeys[]).map((key) =>
              visibleCharts[key] && (
                <Bar key={key} dataKey={key} stackId="a" fill={`var(--color-${key})`}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${key}-${index}`} radius={getRadius(entry, key) as any} />
                  ))}
                </Bar>
              )
            )}
          </BarChart>
        </ChartContainer>
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
  isVisible: boolean;
  label: string;
  value: number;
  onToggle: () => void;
}

function ChartToggle({ chart, isVisible, label, value, onToggle }: ChartToggleProps) {
  return (
    <button
      data-active={isVisible}
      className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${
        isVisible ? "bg-muted/50" : ""
      } transition-all hover:bg-muted/30`}
      onClick={onToggle}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-bold leading-none sm:text-3xl">
        {value.toLocaleString()}
      </span>
    </button>
  );
}
