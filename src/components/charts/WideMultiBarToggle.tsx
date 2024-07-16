"use client";

import * as React from "react";
import { ChartKeys, ChartDataItem } from "@/types/custom";

const chartConfig = {
  fiveStar: { label: "S-Rank", color: "hsl(var(--chart-2))" },
  fourStar: { label: "A-Rank", color: "hsl(var(--chart-7))" },
  threeStar: { label: "B-Rank", color: "hsl(var(--chart-6))" },
} as const;

interface WideMultiBarToggleProps {
  chartData: ChartDataItem[];
  visibleCharts: Record<ChartKeys, boolean>;
  setVisibleCharts: React.Dispatch<React.SetStateAction<Record<ChartKeys, boolean>>>;
}

export function WideMultiBarToggle({ chartData, visibleCharts, setVisibleCharts }: WideMultiBarToggleProps) {
  const toggleChartVisibility = React.useCallback((chart: ChartKeys) => {
    setVisibleCharts((prev) => ({ ...prev, [chart]: !prev[chart] }));
  }, [setVisibleCharts]);

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => ({
      total: acc.total + curr.fiveStar + curr.fourStar + curr.threeStar,
      fiveStar: acc.fiveStar + curr.fiveStar,
      fourStar: acc.fourStar + curr.fourStar,
      threeStar: acc.threeStar + curr.threeStar,
    }), { total: 0, fiveStar: 0, fourStar: 0, threeStar: 0 });
  }, [chartData]);

  return (
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
