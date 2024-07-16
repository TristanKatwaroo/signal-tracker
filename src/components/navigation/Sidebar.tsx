import { createClient } from "@/utils/supabase/server";
import SidebarContent from "./SidebarContent";

export default async function Sidebar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email || null;

  return <SidebarContent userEmail={email} />;
}
