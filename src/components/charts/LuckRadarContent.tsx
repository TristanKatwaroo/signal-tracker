"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Luck",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface LuckRadarContentProps {
  chartData: { category: string; value: number }[];
}

export function LuckRadarContent({ chartData }: LuckRadarContentProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-square max-h-[350px] xl:max-h-[350px] w-full h-full pb-0">
      <RadarChart data={chartData} outerRadius="70%">
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarGrid />
        <PolarAngleAxis dataKey="category" tick={{ fill: 'white' }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
}
