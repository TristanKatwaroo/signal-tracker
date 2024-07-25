// src/components/signals/BannerCard.tsx

import React from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from 'lucide-react';
import ResultPill from './ResultPill';
import { getMaxPity } from '@/utils/gachaUtil'; // Ensure this utility function is correctly implemented

type BannerStat = {
  label: string;
  total: number;
  percent: number;
  pityAvg: number;
  color: string;
};

type BannerCardProps = {
  title: string;
  gachaType: number;
  lifetimePulls: number;
  pityFive: number;
  pityFour: number;
  stats: BannerStat[];
  recentSRanks: { pity: number; name: string }[];
};

const BannerCard: React.FC<BannerCardProps> = ({ title, gachaType, lifetimePulls, pityFive, pityFour, stats, recentSRanks }) => {
  const maxPity = getMaxPity(gachaType);  // Get the maximum pity based on gacha type

  return (
    <Card className="p-2 shadow-md">
      <CardHeader className="pb-5 pt-5 flex flex-row items-center">
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1" variant="tertiary">
          <Link href="#" prefetch={false}>
            Details
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='pb-3'>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-primary-foreground">Lifetime Signal Searches</div>
            <div className="text-sm text-muted-foreground">{lifetimePulls * 160}</div>
          </div>
          <div className="text-3xl font-bold">{lifetimePulls}</div>
        </div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div>
            <div className="font-medium text-primary-foreground">S-Rank Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at {maxPity}</div>
          </div>
          <div className="text-3xl font-bold text-primary">{pityFive}</div>
        </div>
        <div className='pb-2'><Progress value={(pityFive / maxPity) * 100} color='primary' aria-label="S Rank Pity Progress" /></div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div>
            <div className="font-medium text-primary-foreground">A-Rank Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at 10</div>
          </div>
          <div className="text-3xl font-bold text-quinary">{pityFour}</div>
        </div>
        <div className='pb-5'><Progress value={(pityFour / 10) * 100} color='quinary' aria-label="A Rank Pity Progress" /></div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-primary-foreground">Recent S-Rank Signal Searches</div>
            <div className="flex flex-wrap pt-1 pb-3">
              {recentSRanks.length > 0 ? recentSRanks.map((rank, index) => (
                <ResultPill key={index} pity={rank.pity} name={rank.name} />
              )) : (
                <span className="text-sm text-muted-foreground">None found</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-muted-foreground/60">SIGNALTRACKER.GG</div>
      </CardContent>
    </Card>
  );
}

export default BannerCard;
