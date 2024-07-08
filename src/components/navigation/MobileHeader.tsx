// components/MobileHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { tabs } from "./tabsConfig";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import AccountMenu from "../auth/AccountMenu";
import AuthCard from "../auth/AuthCard";
import AuthDialog from "../auth/AuthDialog"; // Import AuthDialog
import { Menu } from "lucide-react";
import { useState } from "react";

type Props = {}

export default function MobileHeader({}: Props) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to control the Sheet open state

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all",
                  pathname === tab.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
                onClick={handleTabClick}
              >
                <tab.icon className="h-5 w-5" />
                {tab.title}
              </Link>
            ))}
          </nav>
          
          <div className="flex-1 flex items-end w-full">
            {/* <Image 
              src="/images/characters/anby.png"
              alt="Anby"
              width={300}
              height={400}
              className="h-96 min-w-max -ml-6"
            /> */}
            
            <Image 
                src="/images/characters/anby.png"
                alt="Anby"
                width={300}
                height={444}
                sizes="(max-width: 1024px) 100vw, 50vw" // Responsive sizes attribut
                className="w-auto h-auto max-h-48 object-cover ml-20 -mb-3"
            />
          </div>
          <div className="mt-0 p-2">
            {user ? <AccountMenu /> : <AuthCard />}
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
    </header>
  );
}
