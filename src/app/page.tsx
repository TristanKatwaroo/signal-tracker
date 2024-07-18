// pages/app/landing/page.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { EyeIcon, UploadCloudIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const runtime = "edge";

const changelogs = [
  {
    date: "07.11",
    content: "We added a language switcher to the website! However, we are still lacking translations for all the pages. If you want to help out, join our Discord server!",
    labels: ["Update"]
  },
  {
    date: "07.02",
    content: "We have an Achievement Tracker now! It lists all achievements, including hidden ones. It also allows you to export & import your data so you can bring it anywhere.",
    labels: ["New Feature"]
  },
  {
    date: "07.01",
    content: "You can now customize your Share Cards with custom images!",
    labels: ["Improvement"]
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card/65 border-primary/50 border-dashed">
          <CardHeader>
            <CardTitle className="text-4xl text-primary-foreground font-bold mb-4">Welcome to SIGNALTRACKER.GG</CardTitle>
            <CardDescription className="font-normal text-muted-foreground">
              The ultimate community-driven tool for Zenless Zone Zero! Here you can track your signals,
              view global signal stats, check the event/banner timeline, and more!
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What would you like to do today, Phaethon?</CardTitle>
            <CardDescription>Select a tool below to get started.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/import">
                <UploadCloudIcon className="mr-2 h-4 w-4" /> Import History
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/view">
                <EyeIcon className="mr-2 h-4 w-4" /> View Pull History
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/sync">
                <img src="https://www.gstatic.com/images/branding/product/1x/google_g_32dp.png" alt="Google" className="mr-2 h-4 w-4" />
                Sync Your Data
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Changelogs</CardTitle>
            <CardDescription>View website announcements here.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-4">
                {changelogs.map((log, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 rounded-lg border hover:bg-accent transition-all">
                    <div className="flex justify-between">
                      <span className="font-bold">{log.date}</span>
                      <div className="flex gap-2">
                        {log.labels.map((label, idx) => (
                          <Badge key={idx} variant="secondary">{label}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-muted-foreground">{log.content}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Links</CardTitle>
            <CardDescription>Connect with us on various platforms.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="https://discord.com/invite/your-discord-link" target="_blank" rel="noopener noreferrer">
                <img src="/icons/discord.svg" alt="Discord" className="mr-2 h-4 w-4" /> Discord Server
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="https://www.hoyoverse.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/hoyoverse.svg" alt="HoYoverse" className="mr-2 h-4 w-4" /> HoYoverse
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="https://zenless.hoyoverse.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/zenless.svg" alt="Zenless Zone Zero" className="mr-2 h-4 w-4" /> Zenless Zone Zero
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
