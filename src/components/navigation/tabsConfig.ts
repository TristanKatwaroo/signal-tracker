// components/tabsConfig.ts
import {
    Home,
    Signal,
    Globe,
    CalendarDays,
    Trophy,
    Clock,
    Settings,
    ArrowDownUp,
    SquarePen,
  } from "lucide-react";
  
  export const tabs = [
    // {
    //   title: "Home",
    //   href: "/",
    //   icon: Home,
    // },
    {
      title: "Signals",
      href: "/signals",
      icon: Signal,
    },
    {
      title: "Global Stats",
      href: "/global-stats",
      icon: Globe,
    },
    {
      title: "Timeline",
      href: "/timeline",
      icon: CalendarDays,
    },
    {
      title: "Tier List",
      href: "/tier-list",
      icon: ArrowDownUp,
    },
    // {
    //   title: "Planner",
    //   href: "/planner",
    //   icon: SquarePen,
    // },
    // {
    //   title: "Achievements",
    //   href: "/achievements",
    //   icon: Trophy,
    // },
    // {
    //   title: "Reminders",
    //   href: "/reminders",
    //   icon: Clock,
    // },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  