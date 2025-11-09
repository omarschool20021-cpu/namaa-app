import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { IntroAnimation } from "@/components/IntroAnimation";
import { AppHeader } from "@/components/AppHeader";
import { useState } from "react";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Prayers from "@/pages/Prayers";
import Quran from "@/pages/Quran";
import Lessons from "@/pages/Lessons";
import WeeklyOverview from "@/pages/WeeklyOverview";
import Motivation from "@/pages/Motivation";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/prayers" component={Prayers} />
      <Route path="/quran" component={Quran} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/weekly" component={WeeklyOverview} />
      <Route path="/motivation" component={Motivation} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem("namaa_intro_seen");
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    localStorage.setItem("namaa_intro_seen", "true");
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SettingsProvider>
          {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
          <div className="min-h-screen bg-background">
            <AppHeader />
            <main className="pb-8">
              <Router />
            </main>
          </div>
          <Toaster />
        </SettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
