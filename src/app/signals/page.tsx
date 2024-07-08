import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRightIcon, ArrowUpToLine, ChevronDown, Menu, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BannerCard from '@/components/signals/BannerCard'

type Props = {}

export default function SignalsPage({}: Props) {

  const bannerStats = [
    { label: '5★', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Won 50:50', total: 2, percent: 66.67, pityAvg: 0, color: 'text-primary-foreground' },
    { label: '4★', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: '— Won 50:50', total: 12, percent: 40, pityAvg: 0, color: 'text-primary-foreground' }
  ];

  const weaponStats = [
    { label: '5★', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Won 75:25', total: 2, percent: 66.67, pityAvg: 0, color: 'text-primary-foreground' },
    { label: '4★', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: '— Won 50:50', total: 12, percent: 40, pityAvg: 0, color: 'text-primary-foreground' }
  ];

  const standardStats = [
    { label: '5★', total: 4, percent: 1.23, pityAvg: 75.75, color: 'text-primary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
    { label: '4★', total: 48, percent: 14.77, pityAvg: 6.73, color: 'text-quaternary' },
    { label: '— Character', total: 34, percent: 10.46, pityAvg: 6.97, color: 'text-primary-foreground' },
    { label: '— Weapon', total: 14, percent: 4.31, pityAvg: 6.14, color: 'text-primary-foreground' },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:px-0">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">Signal Searches</h1>
        <Button asChild size="default" className="ml-6 pr-5 gap-1" variant="tertiary">
          <Link href="#" prefetch={false}>
            <ArrowUpToLine className="h-4 w-4 mr-1" />
            Import Data
          </Link>
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 mr-0 lg:mr-60">
          <BannerCard 
            title="Exclusive"
            lifetimePulls={325}
            pityFive={22}
            pityFour={2}
            stats={bannerStats}
          />
          <BannerCard 
            title="W-Engine"
            lifetimePulls={123}
            pityFive={45}
            pityFour={9}
            stats={weaponStats}
          />
          <BannerCard 
            title="Stable"
            lifetimePulls={88}
            pityFive={36}
            pityFour={8}
            stats={standardStats}
          />
        </div>
        
        <aside className="hidden lg:block fixed lg:w-[250px] p-3 top-1 right-1">
          {/* Placeholder for Ads */}
          <div className="h-full flex flex-col gap-4">
            <div className="h-64 bg-gray-900 flex items-center justify-center">
              Ad 1
            </div>
            <div className="h-64 bg-gray-900 flex items-center justify-center">
              Ad 2
            </div>
            <div className="h-64 bg-gray-900 flex items-center justify-center">
              Ad 3
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
