import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { VALENTINE_DAYS } from "../data/days";
import { useCurrentDate } from "../hooks/useCurrentDate";

export default function DayNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDayUnlocked } = useCurrentDate();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      className="w-full bg-black/10 backdrop-blur-md border-t border-black/10 px-4 py-3"
    >
      <div className="flex justify-center gap-1 sm:gap-2 max-w-2xl mx-auto overflow-x-auto">
        {VALENTINE_DAYS.map((day) => {
          const unlocked = isDayUnlocked(day.date);
          const isActive = location.pathname === day.route;

          return (
            <motion.button
              key={day.id}
              whileHover={unlocked ? { scale: 1.1 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              onClick={() => {
                if (unlocked) navigate(day.route);
              }}
              className={`flex flex-col items-center p-1.5 sm:p-2 rounded-xl transition-all min-w-[48px] sm:min-w-[60px] ${
                isActive
                  ? "bg-white/50 shadow-lg"
                  : unlocked
                  ? "bg-white/20 hover:bg-white/30 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <span className="text-lg sm:text-xl">{day.emoji}</span>
              <span className="text-[9px] sm:text-[10px] text-gray-700 mt-0.5 font-medium whitespace-nowrap">
                {day.date} Feb
              </span>
              {unlocked ? (
                <Unlock className="w-2.5 h-2.5 text-green-600 mt-0.5" />
              ) : (
                <Lock className="w-2.5 h-2.5 text-gray-400 mt-0.5" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
