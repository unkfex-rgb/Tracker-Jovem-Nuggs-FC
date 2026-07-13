import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export default function Login() {
  const [clubName, setClubName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { authenticate } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim()) return;

    setStatus("loading");
    const success = await authenticate(clubName);

    if (success) {
      setStatus("success");
      setTimeout(() => {
        navigate("/club");
      }, 1200);
    } else {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setClubName("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-white mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">ClubStats</h1>
          <p className="text-sm text-gray-400">Acesso exclusivo do clube</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="clubName" className="block text-sm font-medium text-white mb-3">
              Nome do clube
            </label>
            <Input
              id="clubName"
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="bg-white/5 border-white/20 text-white placeholder:text-transparent focus:border-white/40 h-12 text-base"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              Digite o nome exato do seu clube para acessar
            </p>
          </div>

          <Button
            type="submit"
            disabled={!clubName.trim() || status === "loading" || status === "success"}
            className="w-full bg-white text-black hover:bg-gray-100 disabled:opacity-50 h-12 font-medium"
          >
            {status === "loading" ? (
              <motion.span
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                Verificando...
              </motion.span>
            ) : status === "success" ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Acesso concedido
              </span>
            ) : (
              "Acessar"
            )}
          </Button>
        </motion.form>

        {/* Error message */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-300">Dessa vez você falhou</p>
              <p className="text-xs text-red-200/70 mt-0.5">
                Tente novamente. Verifique se digitou o nome correto do clube.
              </p>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-gray-500 mt-12"
        >
          Not affiliated with EA Sports
        </motion.p>
      </motion.div>
    </div>
  );
}
