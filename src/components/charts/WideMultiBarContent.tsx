"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
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
    threeStar: false,
  });

  const toggleChartVisibility = React.useCallback((chart: ChartKeys) => {
    setVisibleCharts((prev) => ({ ...prev, [chart]: !prev[chart] }));
  }, []);

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
  );
}
