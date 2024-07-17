import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpToLine, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BannerCard from '@/components/signals/BannerCard'
import dynamic from 'next/dynamic'

const WideMultiBar = dynamic(() => import('@/components/charts/WideMultiBar'), {
  ssr: true,
})

const LuckRadar = dynamic(() => import('@/components/charts/LuckRadar'), {
  ssr: true,
})

export const runtime = "edge";

type Props = {}

export default async function SignalsPage({}: Props) {

  const bannerStats = [
    { label: 'S Rank', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Won 50:50', total: 2, percent: 66.67, pityAvg: 0, color: 'text-primary-foreground' },
    { label: 'A Rank', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: '— Won 50:50', total: 12, percent: 40, pityAvg: 0, color: 'text-primary-foreground' }
  ];

  const weaponStats = [
    { label: 'S Rank', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Won 75:25', total: 2, percent: 66.67, pityAvg: 0, color: 'text-primary-foreground' },
    { label: 'A Rank', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: '— Won 50:50', total: 12, percent: 40, pityAvg: 0, color: 'text-primary-foreground' }
  ];

  const standardStats = [
    { label: 'S Rank', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: 'A Rank', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
  ];

  // Sample chartData with counts for five-star and four-star pulls at each pity number from 0 to 90
  const chartData = Array.from({ length: 91 }, (_, pity) => ({
    pity,
    fiveStar: Math.floor(Math.random() * 1.6),
    fourStar: Math.floor(Math.random() * 8.8),
    threeStar: Math.floor(Math.random() * 30.8),
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:px-0">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">Signals</h1>
        <Button asChild size="default" className="ml-6 pr-5 gap-1" variant="tertiary">
          <Link href="/signals/import" prefetch={false}>
            <ArrowUpToLine className="h-4 w-4 mr-1" />
            Import
          </Link>
        </Button>
        <Button asChild size="default" className="ml-6 pr-5 gap-1" variant="tertiary">
          <Link href="#" prefetch={false}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Link>
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mr-0">
          <WideMultiBar chartData={chartData} />
          <BannerCard 
            title="Exclusive Channel"
            lifetimePulls={325}
            pityFive={22}
            pityFour={2}
            stats={bannerStats}
          />
          <BannerCard 
            title="W-Engine Channel"
            lifetimePulls={123}
            pityFive={45}
            pityFour={9}
            stats={weaponStats}
          />
          <BannerCard 
            title="Stable Channel"
            lifetimePulls={88}
            pityFive={36}
            pityFour={8}
            stats={standardStats}
          />
          <BannerCard 
            title="Bangboo Channel"
            lifetimePulls={88}
            pityFive={36}
            pityFour={8}
            stats={standardStats}
          />
          <LuckRadar />
        </div>
      </div>
    </main>
  )
}
