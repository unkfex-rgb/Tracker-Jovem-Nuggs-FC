import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Animar saída
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Limpar autenticação
    logout();
    
    // Redirecionar para splash
    navigate("/splash");
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isLoggingOut ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white hover:bg-white/5 gap-2"
        title="Sair"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline text-xs">Sair</span>
      </Button>
    </motion.div>
  );
}
