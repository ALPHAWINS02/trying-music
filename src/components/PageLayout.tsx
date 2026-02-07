import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { VALENTINE_DAYS } from "../data/days";
import type { DayConfig } from "../data/days";
import DayNavigation from "./DayNavigation";

interface PageLayoutProps {
  day: DayConfig;
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: 60, filter: "blur(10px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -60, filter: "blur(10px)" },
};

export default function PageLayout({ day, children }: PageLayoutProps) {
  const navigate = useNavigate();
  const currentIndex = VALENTINE_DAYS.findIndex((d) => d.id === day.id);
  const prevDay = currentIndex > 0 ? VALENTINE_DAYS[currentIndex - 1] : null;
  const nextDay =
    currentIndex < VALENTINE_DAYS.length - 1
      ? VALENTINE_DAYS[currentIndex + 1]
      : null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${day.bgGradientFrom}, ${day.bgGradientTo})`,
      }}
    >
      {/* Home button - small, top-left */}
      <div className="absolute top-4 left-4" style={{ zIndex: 30 }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
          className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full border border-white/30 hover:bg-white/30 transition-colors"
          style={{ color: day.primaryColor }}
        >
          <Home className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10">
        {children}

        {/* Prev / Next navigation - centered below content, above click overlays */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-5 mt-10 relative"
          style={{ zIndex: 30 }}
        >
          {prevDay && (
            <motion.button
              whileHover={{ scale: 1.08, x: -3 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(prevDay.route)}
              className="backdrop-blur-sm px-6 py-2.5 rounded-full border-2 transition-colors flex items-center gap-2 text-sm font-semibold shadow-md cursor-pointer"
              style={{
                backgroundColor: day.primaryColor + "18",
                borderColor: day.primaryColor + "40",
                color: day.primaryColor,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              {prevDay.emoji} {prevDay.name}
            </motion.button>
          )}
          {nextDay && (
            <motion.button
              whileHover={{ scale: 1.08, x: 3 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => navigate(nextDay.route)}
              className="backdrop-blur-sm px-6 py-2.5 rounded-full border-2 transition-colors flex items-center gap-2 text-sm font-semibold shadow-md cursor-pointer"
              style={{
                backgroundColor: day.primaryColor + "18",
                borderColor: day.primaryColor + "40",
                color: day.primaryColor,
              }}
            >
              {nextDay.name} {nextDay.emoji}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <div className="relative" style={{ zIndex: 30 }}>
        <DayNavigation />
      </div>
    </motion.div>
  );
}
