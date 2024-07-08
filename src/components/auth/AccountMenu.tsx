// components/auth/AccountMenu.tsx
import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SidebarButton } from "../navigation/sidebar-button";
import { Separator } from "../ui/separator";

const AccountMenu = () => {
  const { logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full bg-muted justify-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <span>Account</span>
            </div>
            <MoreHorizontal size={20} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
        <div className="space-y-1">
          <SidebarButton size="sm" icon={User} className="w-full" onClick={logout}>
            Support
          </SidebarButton>
          <Separator />
          <SidebarButton size="sm" icon={LogOut} className="w-full" onClick={logout}>
            Logout
          </SidebarButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AccountMenu;
