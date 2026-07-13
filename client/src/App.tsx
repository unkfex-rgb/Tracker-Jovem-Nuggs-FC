import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
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

function AuthRouter() {
  return (
    <Switch>
      <Route path="/splash" component={Splash} />
      <Route path="/login" component={Login} />
      <Route component={Splash} />
    </Switch>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/club" component={ClubProfile} />
      <Route path="/squad" component={Squad} />
      <Route path="/h2h" component={H2H} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppRouter /> : <AuthRouter />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            {isAuthenticated ? (
              <Layout>
                <Router />
              </Layout>
            ) : (
              <Router />
            )}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
