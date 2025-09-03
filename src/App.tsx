import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import Quiz from "./pages/Quiz";
import PracticeTests from "./pages/PracticeTests";
import LearningGames from "./pages/LearningGames";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/books" element={<Layout><Dashboard /></Layout>} />
          <Route path="/chat" element={<Layout><AIChat /></Layout>} />
          <Route path="/chat/:bookId" element={<Layout><AIChat /></Layout>} />
          <Route path="/quiz" element={<Layout><Quiz /></Layout>} />
          <Route path="/practice" element={<Layout><PracticeTests /></Layout>} />
          <Route path="/games" element={<Layout><LearningGames /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
