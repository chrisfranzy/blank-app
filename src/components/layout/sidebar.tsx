"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Route,
  FileText,
  Users,
  Link as LinkIcon,
  Bell,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/path", label: "My Path", icon: Route },
  { href: "/reference", label: "Reference", icon: FileText },
  { href: "/team", label: "Team", icon: Users },
  { href: "/integrations", label: "Integrations", icon: LinkIcon },
  { href: "/updates", label: "Updates", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-zinc-900" />
          </div>
          <span className="text-lg font-semibold text-white">Learning Hub</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-400/15 text-brand-300"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
        <p className="text-xs text-zinc-400">
          Powered by Claude &middot; Anthropic
        </p>
      </div>
    </aside>
  );
}
