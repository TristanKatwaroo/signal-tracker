// components/navigation/MobileHeaderContent.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { tabs } from "./tabsConfig";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import AccountMenu from "../auth/AccountMenu";
import AuthCard from "../auth/AuthCard";
import { Menu } from "lucide-react";

type MobileHeaderContentProps = {
  userEmail: string | null;
};

export default function MobileHeaderContent({ userEmail }: MobileHeaderContentProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to control the Sheet open state

  const handleTabClick = () => {
    setIsOpen(false); // Close the Sheet when a tab is clicked
  };

  return (
    <header className="sticky top-0 left-0 w-full flex h-14 md:hidden items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 z-20">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col pt-14">
          <div className="flex w-full h-14 text-center items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg">SIGNALTRACKER.GG</span>
            </Link>
            <Image 
              src="/images/bangboos/bangboo1half.png"
              alt="Your Image"
              width={500}
              height={500}
              className="h-[150%] w-auto ml-5 mb-7"
            />
          </div>
          <nav className="grid gap-2 text-lg font-medium">
            {tabs.map((tab) => {
              const isActive = tab.href === '/'
                ? pathname === tab.href
                : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={handleTabClick}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.title}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto p-2">
            {userEmail ? <AccountMenu email={userEmail} /> : <AuthCard />}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
    </header>
  );
}
