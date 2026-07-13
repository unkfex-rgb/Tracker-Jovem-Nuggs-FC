import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Preload from "@/pages/Preload";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ClubProfile from "./pages/ClubProfile";
import Squad from "./pages/Squad";
import H2H from "./pages/H2H";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Preload />;
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {!isAuthenticated && <Route path="*" component={Preload} />}
      {isAuthenticated && (
        <>
          <Route path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/club" component={ClubProfile} />
          <Route path="/squad" component={Squad} />
          <Route path="/h2h" component={H2H} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Layout>
              <Router />
            </Layout>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
