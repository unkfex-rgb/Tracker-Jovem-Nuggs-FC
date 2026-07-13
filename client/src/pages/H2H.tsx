import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { BarChart3, Trophy } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { H2HSkeleton } from "@/components/Skeletons";
import { clubService } from "@/services/club.service";
import type { H2HComparison } from "@/types";
import { cn } from "@/lib/utils";

const easeOut = [0.23, 1, 0.32, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

interface ComparisonRow {
  label: string;
  aKey: keyof H2HComparison["clubA"];
  bKey: keyof H2HComparison["clubB"];
  format: (val: number) => string;
  higherIsBetter: boolean;
}

const rows: ComparisonRow[] = [
  { label: "Vitórias", aKey: "wins", bKey: "wins", format: (v) => v.toString(), higherIsBetter: true },
  { label: "Empates", aKey: "draws", bKey: "draws", format: (v) => v.toString(), higherIsBetter: false },
  { label: "Derrotas", aKey: "losses", bKey: "losses", format: (v) => v.toString(), higherIsBetter: false },
  { label: "Gols Marcados", aKey: "goalsFor", bKey: "goalsFor", format: (v) => v.toString(), higherIsBetter: true },
  { label: "Gols Sofridos", aKey: "goalsAgainst", bKey: "goalsAgainst", format: (v) => v.toString(), higherIsBetter: false },
  { label: "Saldo de Gols", aKey: "goalDifference", bKey: "goalDifference", format: (v) => (v > 0 ? `+${v}` : v.toString()), higherIsBetter: true },
  { label: "Posse Média (%)", aKey: "avgPossession", bKey: "avgPossession", format: (v) => v.toFixed(1), higherIsBetter: true },
  { label: "Aproveitamento (%)", aKey: "winRate", bKey: "winRate", format: (v) => v.toFixed(1), higherIsBetter: true },
];

export default function H2H() {
  const [data, setData] = useState<H2HComparison | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    clubService.getH2H("jovem-nuggs-fc", "elite-squad").then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container py-8 lg:py-12">
        <H2HSkeleton />
      </div>
    );
  }

  if (!data) return null;

  const { clubA, clubB, totalMeetings } = data;

  return (
    <div className="container py-8 lg:py-12 space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
          <BarChart3 className="h-8 w-8 text-primary" />
          Head-to-Head
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {totalMeetings} confrontos diretos entre os clubes
        </p>
      </motion.div>

      {/* Club comparison header */}
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <GlassCard padding="xl">
          <div className="flex items-center justify-between gap-4">
            {/* Club A */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              {clubA.emblem ? (
                <img src={clubA.emblem} alt={clubA.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              )}
              <div>
                <p className="font-display text-lg font-bold text-white">{clubA.name}</p>
                <p className="text-xs text-muted-foreground">{clubA.winRate.toFixed(1)}% aproveitamento</p>
              </div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-muted-foreground">VS</span>
              <span className="mt-1 text-xs text-muted-foreground">{totalMeetings} jogos</span>
            </div>

            {/* Club B */}
            <div className="flex flex-1 flex-col items-center gap-3 text-center sm:flex-row-reverse sm:text-right">
              {clubB.emblem ? (
                <img src={clubB.emblem} alt={clubB.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">
                  <Trophy className="h-8 w-8 text-red-400" />
                </div>
              )}
              <div>
                <p className="font-display text-lg font-bold text-white">{clubB.name}</p>
                <p className="text-xs text-muted-foreground">{clubB.winRate.toFixed(1)}% aproveitamento</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Comparison bars */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <GlassCard padding="lg">
          <div className="space-y-5">
            {rows.map((row, idx) => {
              const aVal = clubA[row.aKey] as number;
              const bVal = clubB[row.bKey] as number;
              const total = Math.abs(aVal) + Math.abs(bVal);
              const aPercent = total > 0 ? (Math.abs(aVal) / total) * 100 : 50;
              const bPercent = 100 - aPercent;
              const aWins = row.higherIsBetter ? aVal > bVal : aVal < bVal;
              const bWins = row.higherIsBetter ? bVal > aVal : bVal < aVal;

              return (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06, ease: easeOut }}
                >
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className={cn("font-display font-semibold tabular-nums", aWins ? "text-emerald-400" : "text-white")}>
                      {row.format(aVal)}
                    </span>
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className={cn("font-display font-semibold tabular-nums", bWins ? "text-emerald-400" : "text-white")}>
                      {row.format(bVal)}
                    </span>
                  </div>
                  <div className="flex h-2 gap-0.5 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${aPercent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.06 + 0.1, ease: easeOut }}
                      className={cn("rounded-l-full", aWins ? "bg-primary" : "bg-primary/40")}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bPercent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.06 + 0.1, ease: easeOut }}
                      className={cn("rounded-r-full", bWins ? "bg-red-500" : "bg-red-500/40")}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
