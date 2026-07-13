import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Search as SearchIcon, Trophy, X } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clubService } from "@/services/club.service";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import type { ClubSearchResult, Platform } from "@/types";
import { cn } from "@/lib/utils";

const easeOut = [0.23, 1, 0.32, 1] as const;

export default function Search() {
  const [clubId, setClubId] = useState("");
  const [clubName, setClubName] = useState("");
  const [platform, setPlatform] = useState<string>("ALL");
  const [division, setDivision] = useState<string>("ALL");
  const [results, setResults] = useState<ClubSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { searches, addSearch, clearSearches } = useRecentSearches();

  const performSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await clubService.searchClubs(
        clubName || clubId,
        platform === "ALL" ? undefined : platform
      );
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, [clubId, clubName, platform]);

  // Auto-suggestions as user types
  useEffect(() => {
    if (!clubName.trim() && !clubId.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const data = await clubService.searchClubs(
          clubName || clubId,
          platform === "ALL" ? undefined : platform
        );
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [clubName, clubId, platform]);

  const handleSelectClub = (club: ClubSearchResult) => {
    addSearch({
      id: club.id,
      name: club.name,
      platform: club.platform,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="container py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <h1 className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Buscar Clube
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pesquise por Club ID, nome ou filtre por plataforma e divisão.
        </p>
      </motion.div>

      {/* Search form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: easeOut }}
        className="mt-6"
      >
        <GlassCard padding="lg">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="club-id" className="text-xs text-muted-foreground">
                Club ID
              </Label>
              <Input
                id="club-id"
                placeholder="ex: jovem-nuggs-fc"
                value={clubId}
                onChange={(e) => setClubId(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="club-name" className="text-xs text-muted-foreground">
                Nome do Clube
              </Label>
              <Input
                id="club-name"
                placeholder="ex: Jovem Nuggs"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Plataforma</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas</SelectItem>
                  <SelectItem value="PS5">PS5</SelectItem>
                  <SelectItem value="Xbox">Xbox</SelectItem>
                  <SelectItem value="PC">PC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Divisão</Label>
              <Select value={division} onValueChange={setDivision}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas</SelectItem>
                  <SelectItem value="1">Divisão 1</SelectItem>
                  <SelectItem value="2">Divisão 2</SelectItem>
                  <SelectItem value="3">Divisão 3</SelectItem>
                  <SelectItem value="4">Divisão 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={performSearch}
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              <SearchIcon className="h-4 w-4 mr-2" />
              {loading ? "Buscando..." : "Pesquisar"}
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Recent searches */}
      {searches.length > 0 && !hasSearched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="h-4 w-4" />
              Buscas Recentes
            </h2>
            <button
              onClick={clearSearches}
              className="text-xs text-muted-foreground hover:text-white"
            >
              Limpar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searches.map((s) => (
              <Link
                key={s.id}
                href={`/club?id=${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                <Trophy className="h-3 w-3 text-primary" />
                {s.name}
                <span className="text-muted-foreground">{s.platform}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mt-6"
        >
          <h2 className="mb-4 text-sm font-medium text-muted-foreground">
            {loading ? "Buscando..." : `${results.length} resultado(s)`}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 rounded bg-white/10" />
                      <div className="h-3 w-20 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <GlassCard padding="lg" className="text-center">
              <p className="text-muted-foreground">
                Nenhum clube encontrado. Tente outros termos de busca.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((club, idx) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05, ease: easeOut }}
                >
                  <Link href={`/club?id=${club.id}`}>
                    <GlassCard
                      padding="md"
                      hover="lift"
                      className="cursor-pointer"
                      onClick={() => handleSelectClub(club)}
                    >
                      <div className="flex items-center gap-3">
                        {club.emblem ? (
                          <img
                            src={club.emblem}
                            alt={club.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                            <Trophy className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-white">{club.name}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={cn(
                              "rounded px-1.5 py-0.5 font-medium",
                              club.platform === "PS5" && "bg-blue-500/15 text-blue-300",
                              club.platform === "Xbox" && "bg-green-500/15 text-green-300",
                              club.platform === "PC" && "bg-orange-500/15 text-orange-300",
                            )}>
                              {club.platform}
                            </span>
                            <span>Div {club.division}</span>
                            <span>·</span>
                            <span className="font-display font-semibold text-white">
                              {club.skillRating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
