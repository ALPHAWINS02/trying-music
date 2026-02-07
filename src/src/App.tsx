import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import WelcomePage from "./pages/WelcomePage";
import RoseDayPage from "./pages/RoseDayPage";
import ProposeDayPage from "./pages/ProposeDayPage";
import ChocolateDayPage from "./pages/ChocolateDayPage";
import TeddyDayPage from "./pages/TeddyDayPage";
import PromiseDayPage from "./pages/PromiseDayPage";
import HugDayPage from "./pages/HugDayPage";
import KissDayPage from "./pages/KissDayPage";
import ValentinesDayPage from "./pages/ValentinesDayPage";
import BackgroundMusic from "./components/BackgroundMusic";
import { VALENTINE_DAYS, WELCOME_MUSIC, LOCKED_MUSIC } from "./data/days";
import { useCurrentDate } from "./hooks/useCurrentDate";

function App() {
  const location = useLocation();
  const { isDayUnlocked } = useCurrentDate();

  // Pick the right MP3 track based on current route + lock status
  const musicSrc = useMemo(() => {
    // Welcome page
    if (location.pathname === "/") return WELCOME_MUSIC;

    // Find the day for the current route
    const currentDay = VALENTINE_DAYS.find((d) => d.route === location.pathname);
    if (!currentDay) return WELCOME_MUSIC;

    // If the day is locked, play the locked music
    if (!isDayUnlocked(currentDay.date)) return LOCKED_MUSIC;

    // Otherwise play the day-specific track
    return currentDay.music;
  }, [location.pathname, isDayUnlocked]);

  return (
    <>
      <BackgroundMusic src={musicSrc} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/rose-day" element={<RoseDayPage />} />
          <Route path="/propose-day" element={<ProposeDayPage />} />
          <Route path="/chocolate-day" element={<ChocolateDayPage />} />
          <Route path="/teddy-day" element={<TeddyDayPage />} />
          <Route path="/promise-day" element={<PromiseDayPage />} />
          <Route path="/hug-day" element={<HugDayPage />} />
          <Route path="/kiss-day" element={<KissDayPage />} />
          <Route path="/valentines-day" element={<ValentinesDayPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
