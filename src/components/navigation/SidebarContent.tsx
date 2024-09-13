// components/navigation/SidebarContent.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { tabs } from "./tabsConfig";
import { cn } from "@/lib/utils";
import AccountMenu from "../auth/AccountMenu";
import imagesConfig from "@/lib/imagesConfig";
import AuthForm from "../auth/AuthForm";
import { useState } from "react";

type SidebarContentProps = {
  userEmail: string | null;
};

export default function SidebarContent({ userEmail }: SidebarContentProps) {
  const pathname = usePathname();
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp' | 'resetPassword'>('signIn');

  const toggleAuthMode = (mode: 'signIn' | 'signUp' | 'resetPassword') => {
    setAuthMode(mode);
  };

  const handleAuthSuccess = (message: string) => {
    console.log(message);
    // You might want to add some state to show this message to the user
  };

  return (
    <div className="hidden md:block h-screen sticky top-0 border-r bg-muted/30">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <span className="text-lg">SIGNALTRACKER.GG</span> */}
            <Image 
              src={imagesConfig.logos.transparent}
              alt="SIGNALTRACKER.GG"
              width={500}
              height={500}
              quality={100}
              className="hidden lg:block h-full w-full -ml-1"
            />
          </Link>
          {/* <Image 
            src={imagesConfig.bangboos.bangboo1half}
            alt="Your Image"
            width={500}
            height={500}
            className="hidden lg:block h-full w-full -ml-1"
            // loader={cloudflareImageLoader}
          /> */}
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
            {tabs.map((tab) => {
              const isActive = tab.href === '/'
                ? pathname === tab.href
                : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    isActive
                      ? "bg-muted/45 text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <tab.icon className="h-6 w-6" />
                  {tab.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {userEmail ? (
            <AccountMenu email={userEmail} />
          ) : (
            <div className="space-y-4">
              <AuthForm
                mode={authMode as "signIn" | "signUp" | "requestPasswordReset"}
                toggleAuthMode={(mode: "signIn" | "signUp" | "requestPasswordReset") => toggleAuthMode(mode as "signIn" | "signUp" | "resetPassword")}
                onSuccess={handleAuthSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
