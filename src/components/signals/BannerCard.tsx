// components/BannerCard.tsx
import React from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BannerStat = {
  label: string;
  total: number;
  percent: number;
  pityAvg: number;
  color: string;
};

type BannerCardProps = {
  title: string;
  lifetimePulls: number;
  pityFive: number;
  pityFour: number;
  stats: BannerStat[];
}

const BannerCard: React.FC<BannerCardProps> = ({ title, lifetimePulls, pityFive, pityFour, stats }) => {
  return (
    <Card className="p-2 shadow-lg">
      <CardHeader className="pb-2 flex flex-row items-center">
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1" variant="tertiary">
          <Link href="#" prefetch={false}>
            View All
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center pb-1 pt-2">
          <div>
            <div className="font-medium text-primary-foreground">Lifetime Signal Searches</div>
            <div className="text-sm text-muted-foreground">{lifetimePulls * 160}</div>
          </div>
          <div className="text-3xl font-bold">{lifetimePulls}</div>
        </div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div>
            <div className="font-medium text-primary-foreground">5★ Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at 90</div>
          </div>
          <div className="text-3xl font-bold text-primary">{pityFive}</div>
        </div>
        <div className='pb-2'><Progress value={(pityFive / 90) * 100} color='primary' aria-label="5★ Pity Progress" /></div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div>
            <div className="font-medium text-primary-foreground">4★ Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at 10</div>
          </div>
          <div className="text-3xl font-bold text-quaternary">{pityFour}</div>
        </div>
        <div className='pb-5'><Progress value={(pityFour / 10) * 100} color='quaternary' aria-label="4★ Pity Progress" /></div>
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Percent</TableHead>
              <TableHead>Pity AVG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell className={stat.color}>{stat.label}</TableCell>
                <TableCell className={stat.color}>{stat.total}</TableCell>
                <TableCell className={stat.color}>{stat.percent.toFixed(2)}%</TableCell>
                <TableCell className={stat.color}>{stat.pityAvg.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  );
}

export default BannerCard;
