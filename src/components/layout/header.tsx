"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
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

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-surface-0/90 backdrop-blur-xl border-b border-surface-3/40">
        <div className="flex items-center justify-between px-5 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-coral to-accent-sand flex items-center justify-center">
              <span className="font-display font-bold text-surface-0 text-xs">C</span>
            </div>
            <span className="font-display font-semibold text-ink text-[15px] tracking-tight">
              Learning Hub
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink-muted hover:text-ink transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-surface-0/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface-1 border-l border-surface-3/50 p-5 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-display font-semibold text-ink">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-ink-muted hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1 stagger">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-accent-coral/10 text-accent-coral"
                        : "text-ink-muted hover:text-ink hover:bg-surface-2/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
