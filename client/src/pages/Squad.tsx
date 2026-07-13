import { useEffect, useMemo, useState } from "react";
import { useSearch } from "wouter";
import { motion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search as SearchIcon,
  Users,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/Skeletons";
import { clubService } from "@/services/club.service";
import type { Player } from "@/types";
import { cn } from "@/lib/utils";

const easeOut = [0.23, 1, 0.32, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

type SortKey = keyof Pick<Player, "name" | "position" | "avgRating" | "games" | "goals" | "assists" | "avgMatchRating" | "goalParticipations">;
type SortDir = "asc" | "desc";

const columns: { key: SortKey; label: string; sortable: boolean; align?: "left" | "right" | "center" }[] = [
  { key: "name", label: "Jogador", sortable: true, align: "left" },
  { key: "position", label: "Posição", sortable: true, align: "center" },
  { key: "avgRating", label: "Rating Médio", sortable: true, align: "right" },
  { key: "games", label: "Jogos", sortable: true, align: "right" },
  { key: "goals", label: "Gols", sortable: true, align: "right" },
  { key: "assists", label: "Assistências", sortable: true, align: "right" },
  { key: "avgMatchRating", label: "Nota Média", sortable: true, align: "right" },
  { key: "goalParticipations", label: "Part. em Gol", sortable: true, align: "right" },
];

const positionColors: Record<string, string> = {
  GK: "bg-amber-500/15 text-amber-300",
  DEF: "bg-blue-500/15 text-blue-300",
  MID: "bg-emerald-500/15 text-emerald-300",
  FWD: "bg-red-500/15 text-red-300",
};

const PAGE_SIZE = 8;

export default function Squad() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const clubId = params.get("id") || "jovem-nuggs-fc";

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("goals");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    clubService.getPlayers(clubId).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, [clubId]);

  const filtered = useMemo(() => {
    let result = [...players];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (positionFilter !== "ALL") {
      result = result.filter((p) => p.position === positionFilter);
    }
    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return result;
  }, [players, searchQuery, positionFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (loading) {
    return (
      <div className="container py-8 lg:py-12">
        <TableSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="container py-8 lg:py-12 space-y-6">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
          <Users className="h-8 w-8 text-primary" />
          Elenco
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtered.length} jogadores · clique nas colunas para ordenar
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <GlassCard padding="md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar jogador..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="bg-white/5 border-white/10 pl-9"
                aria-label="Buscar jogador"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={positionFilter}
                onValueChange={(v) => {
                  setPositionFilter(v);
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-40 bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas as posições</SelectItem>
                  <SelectItem value="GK">Goleiros</SelectItem>
                  <SelectItem value="DEF">Defensores</SelectItem>
                  <SelectItem value="MID">Meio-campistas</SelectItem>
                  <SelectItem value="FWD">Atacantes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Table */}
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <GlassCard padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-3 font-medium text-muted-foreground whitespace-nowrap",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.align === "left" && "text-left",
                        col.sortable && "cursor-pointer hover:text-white transition-colors"
                      )}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.sortable && sortKey === col.key && (
                          sortDir === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((player, idx) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="border-b border-white/5 transition-colors hover:bg-white/5"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-bold text-primary">
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn(
                        "inline-block rounded px-2 py-0.5 text-xs font-medium",
                        positionColors[player.position]
                      )}>
                        {player.positionLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-display font-semibold text-white tabular-nums">
                      {player.avgRating.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{player.games}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-emerald-400">{player.goals}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-blue-400">{player.assists}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-white">{player.avgMatchRating.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-violet-400">{player.goalParticipations}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/8 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Página {page + 1} de {totalPages}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
                  aria-label="Próxima página"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
