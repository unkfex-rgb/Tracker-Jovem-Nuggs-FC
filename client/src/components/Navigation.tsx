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
