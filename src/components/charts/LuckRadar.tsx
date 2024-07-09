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
    <Card className="px-2 xl:p-4 flex flex-col h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>Luckiness</CardTitle>
        <CardDescription>
          Comparing your luck to other users
        </CardDescription>
      </CardHeader>
      <div className="flex-grow flex flex-col xl:flex-row">
        <CardContent className="pb-0 xl:flex-[40%] flex items-center justify-center xl:justify-start">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[350px] xl:max-h-[350px] w-full h-full"
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
        <CardFooter className="flex flex-col gap-2 text-sm xl:flex-[60%] items-start justify-center pt-4 pb-0 xl:py-0 xl:mb-12 xl:pl-4">
          <div className="flex items-center gap-2 leading-none py-2">
            <Gem className="h-5 w-5 text-tertiary" />
            <span className="">
              Luckier than <span className="text-primary">68.2%</span> of SIGNALTRACKER.GG users
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none pt-2">
            <Fish className="h-5 w-5 text-tertiary" />
            <span className="">
              More pulls than <span className="text-primary">53.8%</span> of SIGNALTRACKER.GG users
            </span>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
