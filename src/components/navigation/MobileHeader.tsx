import { createClient } from "@/utils/supabase/server";
import MobileHeaderContent from "./MobileHeaderContent";

export default async function MobileHeader() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email || null;

  return <MobileHeaderContent userEmail={email} />;
}
