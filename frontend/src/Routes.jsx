import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/Notfound";
import AlverseSection from './pages/aIverse-section';
import ArticlesTechnicalNewsFeed from './pages/articles-technical-news-feed';
import StudentLeaderboard from './pages/student-leaderboard';
import WeeklyChallengesPage from './pages/weekly-challenges-page';
import LandingPage from './pages/landing-page';
import EventsPage from './pages/events-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlverseSection />} />
        <Route path="/alverse-section" element={<AlverseSection />} />
        <Route path="/articles-technical-news-feed" element={<ArticlesTechnicalNewsFeed />} />
        <Route path="/student-leaderboard" element={<StudentLeaderboard />} />
        <Route path="/weekly-challenges-page" element={<WeeklyChallengesPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/events-page" element={<EventsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
