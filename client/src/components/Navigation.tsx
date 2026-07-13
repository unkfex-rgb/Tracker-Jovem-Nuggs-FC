import { Link, useLocation } from "wouter";
import { BarChart3, Home, Search, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/search", label: "Buscar", icon: Search },
  { href: "/club", label: "Clube", icon: Trophy },
  { href: "/squad", label: "Elenco", icon: Users },
  { href: "/h2h", label: "H2H", icon: BarChart3 },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/8 bg-sidebar/80 backdrop-blur-xl lg:flex"
        aria-label="Navegação principal"
      >
        <Link href="/" className="flex items-center gap-3 px-6 py-6">
          <img
            src="/manus-storage/clubstats-logo_e0c71d31.png"
            alt="ClubStats"
            className="h-9 w-9"
          />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            ClubStats
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-white shadow-[0_0_20px_rgba(124,58,237,0.08)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Not affiliated with EA Sports
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/8 bg-sidebar/90 backdrop-blur-xl lg:hidden"
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
                isActive ? "text-primary" : "text-muted-foreground"
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
