import { LuckRadarContent } from "./LuckRadarContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gem, Fish } from "lucide-react";

const chartData = [
  { category: "50:50 Wins", value: 80 },
  { category: "S-Rank", value: 60 },
  { category: "A-Rank", value: 30 },
];

export default function LuckRadar() {
  return (
    <Card className="px-2 xl:p-0 flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Luckiness</CardTitle>
        <CardDescription>
          Comparing your luck to other users
        </CardDescription>
      </CardHeader>
      <div className="flex-grow flex flex-col pb-0 xl:flex-row">
        <CardContent className="pb-0 xl:flex-[40%] flex items-center justify-center xl:justify-start">
          <LuckRadarContent chartData={chartData} />
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-sm xl:flex-[60%] items-start justify-center pt-3 sm:pb-8 xl:py-0 xl:mb-12 xl:pl-4">
          <div className="flex items-center gap-2 leading-none py-2">
            <Gem className="h-5 w-5 text-tertiary" />
            <span>
              Luckier than <span className="text-primary">68.2%</span> of SIGNALTRACKER.GG users
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none pt-2">
            <Fish className="h-5 w-5 text-tertiary" />
            <span>
              More pulls than <span className="text-primary">53.8%</span> of SIGNALTRACKER.GG users
            </span>
          </div>
        </CardFooter>
      </div>
      <div className="text-xs text-center text-muted-foreground/60">SIGNALTRACKER.GG</div>
    </Card>
  );
}
