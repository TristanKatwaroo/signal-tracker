// pages/index.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDownUp, ArrowUpRightIcon, CalendarDays, Globe, Signal } from "lucide-react";
import imagesConfig from "@/lib/imagesConfig"; // Import the images config

export default function IndexPage() {
  return (
    <>
      <Card
        className="relative border-none space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${imagesConfig.thumbnails.cunninghares1})`,
        }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> Overlay */}
        <div className="relative container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-2xl sm:text-2xl md:text-3xl lg:text-6xl text-white">
            Welcome to <span className="font-bold"><br />SIGNALTRACKER.GG</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8 text-white">
            The ultimate community-driven tool for Zenless Zone Zero! Here you can track your signals,
            view global signal stats, check the event/banner timeline, and more!
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ variant: "tertiary", size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </Card>
      <section
        id="features"
        className="w-full space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-semibold leading-none text-2xl sm:text-2xl md:text-2xl">
            What would you like to do today, Phaethon?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-base sm:leading-7">
            Select a tool below to get started.
          </p>
        </div>
        <div className="mx-auto w-full grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex flex-row">
                <Signal className="h-12 w-12" />
                <Button asChild size="sm" className="ml-auto gap-1" variant="tertiary">
                  <Link href="/signals" prefetch={false}>
                    Go
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Signals</h3>
                <p className="text-sm text-muted-foreground">
                  Save your signals to our database and view analytics with our signal tracker.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Globe className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Global Stats</h3>
                <p className="text-sm text-muted-foreground">
                  View global signal statistics and see how your luck compares to other users.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <CalendarDays className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Stay up to date with all the events and banners. Updated by the community.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ArrowDownUp className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Tier List</h3>
                <p className="text-sm text-muted-foreground">
                  A tier list decided by community votes, refreshed every banner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
