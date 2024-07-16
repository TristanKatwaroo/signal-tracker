import dynamic from 'next/dynamic';
import React from 'react';
import { ChartDataItem } from '@/types/custom';

const WideMultiBarContent = dynamic(() => import('./WideMultiBarContent').then((mod) => mod.WideMultiBarContent), {
  ssr: false,
});

interface WideMultiBarProps {
  chartData: ChartDataItem[];
}

export default function WideMultiBar({ chartData }: WideMultiBarProps) {
  return (
    <WideMultiBarContent chartData={chartData} />
  );
}
