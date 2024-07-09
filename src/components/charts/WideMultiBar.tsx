// components/charts/WideChart.tsx

"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  fiveStar: {
    label: "S-Rank",
    color: "hsl(var(--chart-2))",
  },
  fourStar: {
    label: "A-Rank",
    color: "hsl(var(--chart-7))",
  },
  threeStar: {
    label: "B-Rank",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function WideMultiBar({ chartData }: { chartData: any[] }) {
  const [visibleCharts, setVisibleCharts] = React.useState({
    fiveStar: true,
    fourStar: true,
    threeStar: true,
  })

  const toggleChartVisibility = (chart: keyof typeof chartConfig) => {
    setVisibleCharts((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }))
  }

  const total = React.useMemo(
    () => ({
      fiveStar: chartData.reduce((acc, curr) => acc + curr.fiveStar, 0),
      fourStar: chartData.reduce((acc, curr) => acc + curr.fourStar, 0),
      threeStar: chartData.reduce((acc, curr) => acc + curr.threeStar, 0),
    }),
    [chartData]
  )

  const getRadius = (entry: any, dataKey: string) => {
    const enabledBars = Object.keys(visibleCharts).filter(
      (key) => visibleCharts[key as keyof typeof visibleCharts]
    )
    const barsPresent = enabledBars.filter((key) => entry[key] > 0)

    if (enabledBars.length === 1) {
      return [3, 3, 3, 3]
    }

    if (barsPresent.length === 1) {
      return [3, 3, 3, 3]
    }

    const isHighest = barsPresent[0] === dataKey
    const isLowest = barsPresent[barsPresent.length - 1] === dataKey

    if (isHighest) {
      return [0, 0, 3, 3]
    }
    if (isLowest) {
      return [3, 3, 0, 0]
    }
    return [0, 0, 0, 0]
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Distribution</CardTitle>
          <CardDescription>
            Showing a breakdown of your signals across the pity range
          </CardDescription>
        </div>
        <div className="flex">
          {["fiveStar", "fourStar", "threeStar"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={visibleCharts[chart]}
                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${
                  visibleCharts[chart] ? "bg-muted/50" : ""
                }`}
                onClick={() => toggleChartVisibility(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="pity"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => `Pity: ${value}`}
                />
              }
            />
            {visibleCharts.fiveStar && (
              <Bar dataKey="fiveStar" stackId="a" fill="var(--color-fiveStar)">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    radius={getRadius(entry, "fiveStar") as any}
                  />
                ))}
              </Bar>
            )}
            {visibleCharts.fourStar && (
              <Bar dataKey="fourStar" stackId="a" fill="var(--color-fourStar)">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    radius={getRadius(entry, "fourStar") as any}
                  />
                ))}
              </Bar>
            )}
            {visibleCharts.threeStar && (
              <Bar dataKey="threeStar" stackId="a" fill="var(--color-threeStar)">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    radius={getRadius(entry, "threeStar") as any}
                  />
                ))}
              </Bar>
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
