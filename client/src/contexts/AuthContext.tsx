import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  clubName: string | null;
  authenticate: (key: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_CLUB_NAME = "Jovem Nuggs FC";
const AUTH_STORAGE_KEY = "clubstats:auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clubName, setClubName] = useState<string | null>(null);

  // Restore auth from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { club } = JSON.parse(stored);
        setClubName(club);
        setIsAuthenticated(true);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const authenticate = async (key: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if key matches the valid club name (case-insensitive)
    if (key.toLowerCase().trim() === VALID_CLUB_NAME.toLowerCase()) {
      setClubName(VALID_CLUB_NAME);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ club: VALID_CLUB_NAME }));
      } catch {
        // ignore storage errors
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setClubName(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, clubName, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
