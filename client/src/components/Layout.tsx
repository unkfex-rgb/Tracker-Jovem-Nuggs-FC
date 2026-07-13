import type { ReactNode } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AuroraBackground />
      <Navigation />
      <main className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
