"use client";

import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, LogOut, User } from "lucide-react";
import { SidebarButton } from "../navigation/sidebar-button";
import { Separator } from "../ui/separator";
import { signout } from "@/app/auth/actions";

interface AccountMenuProps {
  email: string | null;
}

const AccountMenu = ({ email }: AccountMenuProps) => {
  const handleLogout = async () => {
    try {
      await signout();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-muted justify-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <span>{email ?? "Account"}</span>
            </div>
            <MoreHorizontal size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
        <div className="space-y-1">
          <SidebarButton size="sm" icon={User} className="w-full">
            Support
          </SidebarButton>
          <Separator />
          <SidebarButton size="sm" icon={LogOut} className="w-full" onClick={handleLogout}>
            Logout
          </SidebarButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountMenu;
