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
    <aside className="hidden lg:flex flex-col w-[260px] bg-surface-1/50 border-r border-surface-3/50 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-7">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-coral to-accent-sand flex items-center justify-center shadow-lg shadow-accent-coral/10 group-hover:shadow-accent-coral/20 transition-shadow">
            <span className="font-display font-bold text-surface-0 text-sm">C</span>
          </div>
          <div>
            <span className="text-[15px] font-display font-semibold text-ink tracking-tight">
              Learning Hub
            </span>
            <span className="block text-[10px] text-ink-faint uppercase tracking-[0.15em] mt-0.5">
              by Anthropic
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200",
                isActive
                  ? "bg-accent-coral/10 text-accent-coral font-medium"
                  : "text-ink-muted hover:text-ink hover:bg-surface-2/50"
              )}
            >
              <item.icon
                className={cn(
                  "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                  isActive ? "text-accent-coral" : "text-ink-faint"
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-coral" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mx-4 mb-5 p-4 rounded-xl bg-surface-2/40 border border-surface-3/30">
        <p className="text-[11px] text-ink-faint font-mono tracking-wide">
          POWERED BY CLAUDE
        </p>
      </div>
    </aside>
  );
}
