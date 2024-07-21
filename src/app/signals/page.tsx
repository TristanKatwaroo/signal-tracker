import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { getGachaTypeName } from '@/utils/gachaTypeUtil';
import { getRankTypeName } from '@/utils/rankTypeUtil';
import BannerCard from '@/components/signals/BannerCard';
import SkeletonCard from '@/components/signals/SkeletonCard';
import { ArrowUpToLine, Globe, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const runtime = 'edge';

type Props = {
  searchParams: { authModal: string };
};

export default async function SignalsPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let signals: any[] = [];
  if (user) {
    const { data, error } = await supabase
      .from('signals')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching signals:', error);
    } else {
      signals = data;
    }
  }

  // Group signals by gacha type
  const signalsByGachaType: { [key: string]: any[] } = {};
  signals.forEach((signal) => {
    const gachaTypeName = getGachaTypeName(signal.gacha_type!);
    if (!signalsByGachaType[gachaTypeName]) {
      signalsByGachaType[gachaTypeName] = [];
    }
    signalsByGachaType[gachaTypeName].push(signal);
  });

  // Calculate lifetime pulls, pity values, and recent S-Ranks
  const bannerData = Object.keys(signalsByGachaType).map((gachaTypeName) => {
    const signals = signalsByGachaType[gachaTypeName];
    const lifetimePulls = signals.length;

    let pityFive = 0;
    let pityFour = 0;
    let recentSRanks: { pity: number; name: string }[] = [];

    // Calculate pity values and collect recent S-Ranks in reverse order
    for (let i = signals.length - 1; i >= 0; i--) {
      const signal = signals[i];
      const rankTypeName = getRankTypeName(signal.rank_type);

      if (rankTypeName === 'S-Rank') {
        recentSRanks.push({ pity: pityFive + 1, name: signal.name });
        pityFive = 0;
      } else {
        pityFive++;
      }

      if (rankTypeName === 'A-Rank') {
        pityFour = 0;
      } else {
        pityFour++;
      }
    }

    return {
      title: gachaTypeName,
      lifetimePulls,
      pityFive,
      pityFour,
      stats: [], // Fill this with appropriate data if needed
      recentSRanks: recentSRanks.slice(0, 5) // Get the most recent 5 S-Ranks
    };
  });

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div className="flex items-center">
        <h1 className="text-lg mr-6 font-bold md:text-3xl hidden md:block">Signals</h1>
        <div className="flex flex-wrap w-full gap-4 md:flex-nowrap md:gap-6">
          <Button asChild size="default" className="flex-1 md:flex-none pr-5 gap-1" variant="tertiary">
            <Link href="/signals/import" prefetch={false}>
              <ArrowUpToLine className="h-4 w-4 mr-1" />
              Import
            </Link>
          </Button>
          <Button asChild size="default" className="flex-1 md:flex-none pr-5 gap-1" variant="outline">
            <Link href="#" prefetch={false}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Link>
          </Button>
          <Button asChild size="default" className="flex-1 md:flex-none pr-5 gap-1" variant="outline">
            <Link href="/global-stats" prefetch={false}>
              <Globe className="h-4 w-4 mr-1" />
              Global Stats
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mr-0">
          {['Standard', 'Exclusive', 'W-Engine', 'Bangboo'].map((type, index) => {
            const banner = bannerData.find(b => b.title === type);
            return banner ? (
              <BannerCard
                key={index}
                title={banner.title}
                lifetimePulls={banner.lifetimePulls}
                pityFive={banner.pityFive}
                pityFour={banner.pityFour}
                stats={banner.stats}
                recentSRanks={banner.recentSRanks}
              />
            ) : (
              <SkeletonCard key={index} title={type} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
