// src/components/signals/SkeletonCard.tsx

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type SkeletonCardProps = {
  title: string;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ title }) => {
  return (
    <Card className="p-2 shadow-md">
      <CardHeader className="pb-5 pt-5 flex flex-row items-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <Skeleton className="h-8 w-24 ml-auto rounded-lg" />
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center">
          <div className="">
            <div className="font-medium text-primary-foreground">Lifetime Signal Searches</div>
            <Skeleton className="h-5 w-16 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div className="">
            <div className="font-medium text-primary-foreground">S-Rank Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at 90</div>
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <div className="pb-2">
          <Skeleton className="relative h-2 w-full overflow-hidden rounded-full" />
        </div>
        <div className="flex justify-between items-center pb-3 pt-2">
          <div className="">
            <div className="font-medium text-primary-foreground">A-Rank Pity</div>
            <div className="text-sm text-muted-foreground">Guaranteed at 10</div>
          </div>
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <div className="pb-5">
          <Skeleton className="relative h-2 w-full overflow-hidden rounded-full" />
        </div>
        <div className="flex justify-between items-center ">
          <div>
            <div className="font-medium text-primary-foreground">Recent S-Rank Signal Searches</div>
            <div className="flex flex-wrap pt-1 pb-3">
                <Skeleton className="h-4 w-full rounded-lg" />
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-muted-foreground/60">SIGNALTRACKER.GG</div>
      </CardContent>
    </Card>
  );
}

export default SkeletonCard;
