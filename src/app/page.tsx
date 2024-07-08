"use client"

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  CalendarDays,
  CircleUser,
  Clock,
  Globe,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Signal,
  Trophy,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/navigation/Sidebar"
import MobileHeader from "@/components/navigation/MobileHeader"
import { useEffect, useState } from "react"
import FetchGachaLogs from "@/components/FetchGachaLogs"

// interface GachaLog {
//   id: string;
//   gacha_type: number;
//   item_id: number;
//   item_name: string;
//   item_rarity: number;
//   user_id: number;
//   timestamp: string;
// }

// export const metadata: Metadata = {
//   title: "SIGNALTRACKER.GG - ZZZ Signal Tracker and Database",
//   // description: "Example music app using the components.",
// }

export default function Dashboard() {
  // const [data, setData] = useState<GachaLog[] | null>(null);
  
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/fetch-gacha');
  //     const result = await response.json();
  //     // console.log('Fetched Gacha Logs:', result);
  //     setData(result);
  //   }

  //   fetchData();
  // }, []);
  
  return (
    
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    {/* <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
    </div> */}
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">About</h1>
        <p className="text-muted-foreground">
          {/* Here&apos;s a list of your tasks for this month! */}
          Welcome to SIGNALTRACKER.GG, the ultimate tool for Zenless Zone Zero! Here you can track your signals, 
          view global signal stats, check the event/banner timeline, and more!
        </p>
        <div>
          <h1>Gacha Logs</h1>
          <FetchGachaLogs />
        </div>
      </div>
    </div>
    {/* <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Welcome to SIGNALTRACKER.GG!</h1>
    </div>
    <p className="text-lg font-semibold md:text-2xl">Welcome to SIGNALTRACKER.GG!</p> */}
    {/* <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support
          team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card> */}
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Lorem ipsum dolor sit amet
        </h3>
        <p className="text-sm text-muted-foreground">
          Maecenas sit amet enim porttitor quam consequat rutrum quis vitae odio.
        </p>
        <Button className="mt-4">Test Button</Button>
        <Button className="mt-4" variant="tertiary">Test Button</Button>
      </div>
    </div>
  </main>
  )
}
