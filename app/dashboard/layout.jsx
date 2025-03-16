"use client"

import { BookOpen, ChartNoAxesGantt, File, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error logging out:", error.message)
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <div className="w-full h-svh grid grid-cols-[max-content_1fr]">
      {/* Navigation */}
      <nav className="flex flex-col items-center gap-6 border-r border-border p-3 pt-5 transition-colors bg-secondary/30">
        {/* Logo */}
        <a href="/dashboard">
          <div className="block w-6 h-6 bg-primary"></div>
        </a>

        {/* Links */}
        <div className="flex flex-col flex-1 gap-4 mx-auto">
          <Button variant="ghost" size="icon" className={cn("w-10 h-10 cursor-pointer rounded-lg hover:text-primary", {
            "text-primary": pathname.includes("/dashboard/files"),
          })} onClick={() => router.push("/dashboard/files")}>
              <File className="size-6" />
          </Button>
          
          <Button variant="ghost" size="icon" className={cn("w-10 h-10 cursor-pointer rounded-lg hover:text-primary", {
            "text-primary": pathname.includes("/dashboard/prompts"),
          })} onClick={() => router.push("/dashboard/prompts")}>
              <BookOpen className="size-6" />
          </Button>

          <Button variant="ghost" size="icon" className={cn("w-10 h-10 cursor-pointer rounded-lg hover:text-primary", {
            "text-primary": pathname.includes("/dashboard/flows"),
          })} onClick={() => router.push("/dashboard/flows")}>
              <Sparkles className="size-6" />
          </Button>
        </div>

        {/* Account actions */}
        <div className="flex flex-col gap-4 mx-auto">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="w-10 h-10 cursor-pointer rounded-lg hover:text-primary" onClick={logout}>
            <LogOut className="size-6" />
          </Button>
        </div>
      </nav>

      {/* Dashboard content */}
      <div>
        {children}
      </div>
    </div>
  );
}
