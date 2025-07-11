import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import FlashcardsPage from "@/pages/FlashcardsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import AchievementsPage from "@/pages/AchievementsPage";
import PracticeQuestionsPage from "@/pages/PracticeQuestionsPage";

import RoleplayPracticePage from "@/pages/RoleplayPracticePage";
import AboutUsPage from "@/pages/AboutUsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/flashcards" component={FlashcardsPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/practice" component={PracticeQuestionsPage} />

        <Route path="/roleplay" component={RoleplayPracticePage} />
        <Route path="/about" component={AboutUsPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
