import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  BarChart3,
  Calendar,
  Flag,
  Gamepad2,
  Goal,
  Layers,
  LineChart,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard } from "@/components/GlassCard";
import { StatValue } from "@/components/StatValue";
import {
  ChartSkeleton,
  ClubProfileSkeleton,
  KPIGridSkeleton,
  StreakCardSkeleton,
} from "@/components/Skeletons";
import { clubService } from "@/services/club.service";
import type { Club, KPIs as KPIsType, Match, Streak as StreakType } from "@/types";
import { cn } from "@/lib/utils";

const easeOut = [0.23, 1, 0.32, 1] as const;

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const kpiConfig = [
  { key: "wins", label: "Vitórias", icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { key: "draws", label: "Empates", icon: Activity, color: "text-amber-400", bg: "bg-amber-500/10" },
  { key: "losses", label: "Derrotas", icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" },
  { key: "winRate", label: "Win Rate", icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10", suffix: "%" },
  { key: "goalsScored", label: "Gols Marcados", icon: Goal, color: "text-blue-400", bg: "bg-blue-500/10" },
  { key: "goalsConceded", label: "Gols Sofridos", icon: Shield, color: "text-orange-400", bg: "bg-orange-500/10" },
  { key: "goalDifference", label: "Saldo", icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { key: "avgGoalsScored", label: "Média Marcados", icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/10", decimals: 2 },
  { key: "avgGoalsConceded", label: "Média Sofridos", icon: Shield, color: "text-red-400", bg: "bg-red-500/10", decimals: 2 },
  { key: "pointsPerGame", label: "Pontos/Jogo", icon: LineChart, color: "text-violet-400", bg: "bg-violet-500/10", decimals: 2 },
] as const;

type ChartView = "area" | "bars" | "timeline";

export default function ClubProfile() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const clubId = params.get("id") || "jovem-nuggs-fc";

  const [club, setClub] = useState<Club | null>(null);
  const [kpis, setKpis] = useState<KPIsType | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [streaks, setStreaks] = useState<StreakType | null>(null);
  const [chartView, setChartView] = useState<ChartView>("area");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      clubService.getClub(clubId),
      clubService.getKPIs(clubId),
      clubService.getRecentMatches(clubId),
      clubService.getStreaks(clubId),
    ]).then(([c, k, m, s]) => {
      setClub(c);
      setKpis(k);
      setMatches(m);
      setStreaks(s);
      setLoading(false);
    });
  }, [clubId]);

  const chartData = matches.map((m, i) => ({
    match: `M${i + 1}`,
    goalsFor: m.goalsFor,
    goalsAgainst: m.goalsAgainst,
    result: m.result,
    opponent: m.opponent,
    date: m.date,
  }));

  if (loading) {
    return (
      <div className="container py-8 lg:py-12 space-y-6">
        <ClubProfileSkeleton />
        <KPIGridSkeleton />
        <ChartSkeleton />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <StreakCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!club || !kpis || !streaks) return null;

  return (
    <div className="container py-8 lg:py-12 space-y-6">
      {/* Club Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <GlassCard padding="xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={club.emblem}
              alt={club.name}
              className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white/10"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {club.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                  <Gamepad2 className="h-3 w-3" />
                  {club.platform}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                  <Layers className="h-3 w-3" />
                  Divisão {club.division}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                  <Flag className="h-3 w-3" />
                  {club.country}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
                  <Calendar className="h-3 w-3" />
                  Fundado em {club.founded}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 sm:justify-start">
                <div>
                  <p className="text-xs text-muted-foreground">Skill Rating</p>
                  <StatValue
                    value={club.skillRating}
                    className="text-3xl font-bold text-white glow-text"
                  />
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div>
                  <p className="text-xs text-muted-foreground">Recorde Geral</p>
                  <p className="font-display text-lg font-semibold text-white">
                    <span className="text-emerald-400">{club.record.wins}V</span>
                    {" "}
                    <span className="text-amber-400">{club.record.draws}E</span>
                    {" "}
                    <span className="text-red-400">{club.record.losses}D</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      >
        {kpiConfig.map((config) => {
          const Icon = config.icon;
          const value = kpis[config.key as keyof KPIsType] as number;
          return (
            <motion.div key={config.key} variants={fadeUp}>
              <GlassCard padding="md" hover="glow" className="h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                  <div className={cn("rounded-lg p-1.5", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                </div>
                <StatValue
                  value={value}
                  decimals={"decimals" in config ? config.decimals : 0}
                  suffix={"suffix" in config ? config.suffix : ""}
                  className="mt-3 block text-2xl font-bold text-white"
                />
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
      >
        <GlassCard padding="lg">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Forma Recente</h2>
            <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
              {([
                { key: "area", label: "Área", icon: Activity },
                { key: "bars", label: "Barras", icon: BarChart3 },
                { key: "timeline", label: "Linha", icon: LineChart },
              ] as const).map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.key}
                    onClick={() => setChartView(view.key)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                      chartView === view.key
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-white"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {view.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Match results timeline */}
          <div className="mb-4 flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: easeOut }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold",
                  m.result === "W" && "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30",
                  m.result === "D" && "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30",
                  m.result === "L" && "bg-red-500/20 text-red-400 ring-1 ring-red-500/30",
                )}
                title={`${m.date} vs ${m.opponent}: ${m.goalsFor}-${m.goalsAgainst}`}
              >
                {m.result === "W" ? "V" : m.result === "D" ? "E" : "D"}
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "area" ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="goalsFor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="goalsAgainst" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="match" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,15,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                  />
                  <Area type="monotone" dataKey="goalsFor" stroke="#10b981" strokeWidth={2} fill="url(#goalsFor)" name="Gols Marcados" />
                  <Area type="monotone" dataKey="goalsAgainst" stroke="#ef4444" strokeWidth={2} fill="url(#goalsAgainst)" name="Gols Sofridos" />
                </AreaChart>
              ) : chartView === "bars" ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="match" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,15,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="goalsFor" fill="#10b981" radius={[4, 4, 0, 0]} name="Gols Marcados" />
                  <Bar dataKey="goalsAgainst" fill="#ef4444" radius={[4, 4, 0, 0]} name="Gols Sofridos" />
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="match" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,15,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="linear" dataKey="goalsFor" stroke="#7c3aed" strokeWidth={2.5} fill="url(#timelineGrad)" name="Gols por Partida" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Streaks */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {[
          { label: "Maior Sequência de Vitórias", value: streaks.longestWinStreak, suffix: "", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Sequência Invicta", value: streaks.longestUnbeatenRun, suffix: "", icon: Shield, color: "text-blue-400" },
          { label: "Sem Sofrer Gols", value: streaks.longestCleanSheetRun, suffix: "", icon: Shield, color: "text-cyan-400" },
          { label: "Maior Goleada", value: streaks.biggestWin.score, suffix: "", icon: Goal, color: "text-violet-400", isText: true, sub: streaks.biggestWin.opponent },
          { label: "Pior Derrota", value: streaks.worstLoss.score, suffix: "", icon: TrendingDown, color: "text-red-400", isText: true, sub: streaks.worstLoss.opponent },
          { label: "Melhor Campanha", value: streaks.bestCampaign.points, suffix: " pts", icon: Trophy, color: "text-amber-400", sub: streaks.bestCampaign.season },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div key={idx} variants={fadeUp}>
              <GlassCard padding="md" hover="glow" className="h-full">
                <Icon className={cn("h-5 w-5 mb-2", s.color)} />
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                {"isText" in s && s.isText ? (
                  <p className="font-display text-xl font-bold text-white">{s.value}</p>
                ) : (
                  <StatValue
                    value={s.value as number}
                    suffix={"suffix" in s ? s.suffix : ""}
                    className="text-xl font-bold text-white"
                  />
                )}
                {"sub" in s && s.sub && (
                  <p className="mt-1 text-xs text-muted-foreground truncate">{s.sub}</p>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
