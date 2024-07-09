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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  combined: {
    label: "Combined",
    color: "hsl(var(--chart-1))",
  },
  fiveStar: {
    label: "5★ Pulls",
    color: "hsl(var(--chart-2))",
  },
  fourStar: {
    label: "4★ Pulls",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function WideMultiBar({ chartData }: { chartData: any[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("combined")

  const total = React.useMemo(
    () => ({
      combined: chartData.reduce((acc, curr) => acc + curr.fiveStar + curr.fourStar, 0),
      fiveStar: chartData.reduce((acc, curr) => acc + curr.fiveStar, 0),
      fourStar: chartData.reduce((acc, curr) => acc + curr.fourStar, 0),
    }),
    [chartData]
  )

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
          {["combined", "fiveStar", "fourStar"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
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
            {activeChart === "combined" ? (
              <>
                <Bar dataKey="fiveStar" stackId="a" fill="var(--color-fiveStar)">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      radius={
                        entry.fourStar === 0
                          ? [3, 3, 3, 3] as any
                          : [0, 0, 3, 3] as any
                      }
                    />
                  ))}
                </Bar>
                <Bar dataKey="fourStar" stackId="a" fill="var(--color-fourStar)">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      radius={
                        entry.fiveStar === 0
                          ? [3, 3, 3, 3] as any
                          : [3, 3, 0, 0] as any
                      }
                    />
                  ))}
                </Bar>
              </>
            ) : (
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={3} />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
