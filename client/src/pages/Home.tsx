import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BarChart3, Search, Trophy, Users, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

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
    <div className="container py-8 lg:py-12">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative mb-12 lg:mb-16"
      >
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Pro Clubs Analytics Platform
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Analyze any club.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Track every match.
            </span>
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            O dashboard de estatísticas mais completo do ecossistema Pro Clubs.
            Performance, elenco, sequências e comparações head-to-head em uma plataforma premium.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              Buscar Clube
            </Link>
            <Link
              href="/club"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
            >
              Ver Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Feature grid */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} variants={item}>
              <GlassCard padding="lg" hover="lift" className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Stats showcase */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
        className="mt-12 lg:mt-16"
      >
        <GlassCard padding="xl" className="overflow-hidden">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { label: "Clubes Indexados", value: "12K+", },
              { label: "Partidas Rastreadas", value: "4.2M" },
              { label: "Jogadores Ativos", value: "85K+" },
              { label: "Plataformas", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
