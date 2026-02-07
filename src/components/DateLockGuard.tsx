import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useCurrentDate } from "../hooks/useCurrentDate";
import type { DayConfig } from "../data/days";
import CountdownTimer from "./CountdownTimer";
import DayNavigation from "./DayNavigation";

interface DateLockGuardProps {
  day: DayConfig;
  children: ReactNode;
}

export default function DateLockGuard({ day, children }: DateLockGuardProps) {
  const { isDayUnlocked, getTimeUntil } = useCurrentDate();
  const unlocked = isDayUnlocked(day.date);

  if (unlocked) {
    return <>{children}</>;
  }

  const time = getTimeUntil(day.date);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${day.bgGradientFrom}, ${day.bgGradientTo})`,
      }}
    >
      {/* Floating decorations */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20 pointer-events-none select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {day.emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center z-10 px-6"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <Lock className="w-16 h-16 mx-auto" style={{ color: day.primaryColor, opacity: 0.5 }} />
        </motion.div>

        <motion.span className="text-6xl mb-4 block">{day.emoji}</motion.span>

        <h1
          className="text-4xl sm:text-5xl font-serif font-bold mb-3"
          style={{ color: day.primaryColor }}
        >
          {day.name}
        </h1>

        <p className="text-lg mb-8 font-medium" style={{ color: day.primaryColor, opacity: 0.6 }}>
          February {day.date} — Unlocks in...
        </p>

        <CountdownTimer {...time} primaryColor={day.primaryColor} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 italic text-sm max-w-md mx-auto"
          style={{ color: day.primaryColor, opacity: 0.4 }}
        >
          Good things come to those who wait... 💕
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0">
        <DayNavigation />
      </div>
    </div>
  );
}
