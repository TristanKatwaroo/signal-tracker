"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { tabs } from "./tabsConfig";
import { cn } from "@/lib/utils";
import AuthCard from "../auth/AuthCard";
import AccountMenu from "../auth/AccountMenu";

type SidebarContentProps = {
  userEmail: string | null;
};

export default function SidebarContent({ userEmail }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:block h-screen sticky top-0 border-r bg-muted/30">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">SIGNALTRACKER.GG</span>
          </Link>
          <Image 
            src="/images/bangboos/bangboo1half.png"
            alt="Your Image"
            width={500}
            height={500}
            className="hidden lg:block h-full w-full -ml-1"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  pathname === tab.href
                    ? "bg-muted/45 text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <tab.icon className="h-6 w-6" />
                {tab.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {userEmail ? <AccountMenu email={userEmail} /> : <AuthCard />}
        </div>
      </div>
    </div>
  );
}
