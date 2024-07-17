import dynamic from 'next/dynamic';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartDataItem } from '@/types/custom';

const WideMultiBarContent = dynamic(() => import('./WideMultiBarContent').then((mod) => mod.WideMultiBarContent), {
  ssr: false,
  loading: () => (
    <Card className="lg:col-span-2 overflow-hidden rounded-md">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            <Skeleton className="h-6 w-32 mb-2" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            >
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
    </Card>
  ),
});

interface WideMultiBarProps {
  chartData: ChartDataItem[];
}

export default function WideMultiBar({ chartData }: WideMultiBarProps) {
  return (
    <WideMultiBarContent chartData={chartData} />
  );
}
