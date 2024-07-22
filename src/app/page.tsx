import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDownUp, ArrowUpRightIcon, CalendarDays, Globe, Signal } from "lucide-react"

export default async function IndexPage() {
  return (
    <>
      {/* <Card className="space-y-6 bg-card/65 border-primary-foreground/50 border-dashed pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"> */}
      <Card className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-2xl sm:text-2xl md:text-3xl lg:text-6xl">
            Welcome to <span className="font-bold"><br />SIGNALTRACKER.GG</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
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
              {/* <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current"></svg> */}
              <div className="flex flex-row">
                <Signal className="h-12 w-12" />
                <Button asChild size="sm" className="ml-auto gap-1" variant="tertiary">
                  <Link href="#" prefetch={false}>
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
              {/* <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current"></svg> */}
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
              {/* <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current"></svg> */}
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
              {/* <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current"></svg> */}
              <ArrowDownUp className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Tier List</h3>
                <p className="text-sm text-muted-foreground">
                  A tier list decided by community votes, refreshed every banner.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-12 w-12 fill-current"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Authentication using NextAuth.js and middlewares.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current"></svg>
              <div className="space-y-2">
                <h3 className="font-bold">Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                  Free and paid subscriptions using Stripe.
                </p>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy also includes a blog and a full-featured documentation site
            built using Contentlayer and MDX.
          </p>
        </div> */}
      </section>
      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={""}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section> */}
    </>
  )
}
