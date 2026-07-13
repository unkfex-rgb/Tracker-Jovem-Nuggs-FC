import { Link, useLocation } from "wouter";
import { BarChart3, Home, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/club", label: "Clube", icon: Trophy },
  { href: "/squad", label: "Elenco", icon: Users },
  { href: "/h2h", label: "H2H", icon: BarChart3 },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <>
      {/* Desktop header */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-40 h-16 items-center justify-between px-6 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/manus-storage/clubstats-logo_e0c71d31.png"
            alt="ClubStats"
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            ClubStats
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LogoutButton />
      </header>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/10 bg-black/50 backdrop-blur-xl lg:hidden"
        aria-label="Navegação principal"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2.5 text-[10px] font-medium transition-colors",
                isActive ? "text-white" : "text-gray-400"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
