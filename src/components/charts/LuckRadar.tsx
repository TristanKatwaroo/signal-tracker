"use client"

import { Fish, Gem, TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { category: "50:50 Wins", value: 80 },
  { category: "S-Rank", value: 60 },
  { category: "A-Rank", value: 30 },
]

const chartConfig = {
  value: {
    label: "Luck",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function LuckRadar() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Luckiness</CardTitle>
        <CardDescription>
          Comparing your luck to other users
        </CardDescription>
      </CardHeader>
      <div className="flex">
        <CardContent className="pb-0 flex-[40%]">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData} outerRadius="70%">
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fill: 'white' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-sm flex-[60%] p-4 items-center justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
            Luckier than 68.2% of SIGNALTRACKER.GG users!<Gem className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2 font-medium leading-none">
            More pulls than 53.8% of SIGNALTRACKER.GG users!<Fish className="h-4 w-4" />
          </div></div>
        </CardFooter>
      </div>
    </Card>
  )
}
