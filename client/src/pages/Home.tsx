import { motion, type Variants } from "framer-motion";
import { BarChart3, Trophy, Users, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import ClubProfile from "./ClubProfile";

const features = [
  {
    icon: Trophy,
    title: "Perfil do Clube",
    description: "Skill rating, divisão, recorde geral e KPIs completos com animações em tempo real.",
  },
  {
    icon: BarChart3,
    title: "Forma Recente",
    description: "Últimas 10 partidas com gráficos de área, barras e linha temporal alternáveis.",
  },
  {
    icon: Users,
    title: "Elenco Detalhado",
    description: "Tabela profissional com ordenação, busca e filtros por posição e estatísticas.",
  },
  {
    icon: Zap,
    title: "Sequências & H2H",
    description: "Streaks históricas e comparação lado a lado entre clubes com barras animadas.",
  },
];

const easeOut = [0.23, 1, 0.32, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function Home() {
  return (
    <div>
      {/* Main club profile dashboard */}
      <ClubProfile />
    </div>
  );
}
