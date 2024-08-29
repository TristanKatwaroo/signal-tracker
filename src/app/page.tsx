// app/page.tsx
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
        className="relative border-none shadow-dark-md space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.6)), url(${imagesConfig.thumbnails.cunninghares1})`,
        }}
      >
        <div className="relative container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-2xl sm:text-2xl md:text-3xl lg:text-6xl">
            Welcome to <span className="font-bold"><br />SIGNALTRACKER.GG</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-zinc-300/90 sm:text-lg sm:leading-8">
            The ultimate community-driven tool for Zenless Zone Zero! Here you can track your signals,
            view global signal stats, check the event/banner timeline, and more!
          </p>
        </div>
      </Card>
      <section
        id="features"
        className="w-full space-y-6 py-8 md:py-12 lg:py-12"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-semibold leading-none px-8 text-2xl sm:text-2xl md:text-2xl">
            What would you like to do today, Phaethon?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-base sm:leading-7">
            Select a tool below to get started.
          </p>
        </div>
        <div className="mx-auto w-full grid justify-center gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Signal, title: "Signals", description: "Save your signals to our database and view analytics with our signal tracker.", url: "/signals" },
            { icon: Globe, title: "Global Stats", description: "View global signal statistics and see how your luck compares to other users.", url: "/" },
            { icon: CalendarDays, title: "Timeline", description: "Stay up to date with all the events and banners. Updated by the community.", url: "/" },
            { icon: ArrowDownUp, title: "Tier List", description: "A tier list decided by community votes, refreshed every banner.", url: "/" },
          ].map((item, index) => (
            <Link href={item.url} key={index} className="group">
              <Card className="relative overflow-hidden rounded-lg border bg-card p-2 transition-colors hover:bg-accent">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="flex flex-row items-start">
                    <item.icon className="h-12 w-12" />
                    {(item.title === "Global Stats" || item.title === "Timeline" || item.title === "Tier List") ? (
                      <div className="ml-auto bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                        Coming Soon
                      </div>
                    ) : (
                      <ArrowUpRightIcon className="h-4 w-4 ml-auto text-primary" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
