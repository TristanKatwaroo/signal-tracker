"use client"

import { Fish, Gem } from "lucide-react"
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
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function LuckRadar() {
  return (
    <Card className="p-2">
      <CardHeader className="items-center pb-4">
        <CardTitle>Luckiness</CardTitle>
        <CardDescription>
          Comparing your luck to other users
        </CardDescription>
      </CardHeader>
      <div className="flex">
        <CardContent className="pb-0 flex-[40%] flex items-center justify-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px] w-full"
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
        <CardFooter className="flex flex-col gap-2 text-sm flex-[60%] items-start justify-center py-4 mb-12">
          <div className="flex items-center gap-2 leading-none py-2">
            <Gem className="h-5 w-5" />
            <span className="">
              Luckier than 68.2% of SIGNALTRACKER.GG users!
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none py-2">
            <Fish className="h-5 w-5" />
            <span className="">
              More pulls than 53.8% of SIGNALTRACKER.GG users!
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
