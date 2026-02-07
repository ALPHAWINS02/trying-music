import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";
import FloatingElements from "../components/FloatingElements";

const day = VALENTINE_DAYS[0]; // Rose Day

interface Rose {
  id: number;
  x: number;
  y: number;
}

export default function RoseDayPage() {
  const [roses, setRoses] = useState<Rose[]>([]);

  const plantRose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only plant if the click target is the background div itself, not a button
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRoses((prev) => [...prev, { id: Date.now(), x, y }]);
  }, []);

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        <FloatingElements emoji="🌹" count={18} direction="down" />

        {/* Click-to-plant layer — behind all interactive elements */}
        <div
          className="absolute inset-0 cursor-crosshair"
          style={{ zIndex: 1 }}
          onClick={plantRose}
        />

        {/* Planted roses */}
        <AnimatePresence>
          {roses.map((rose) => (
            <motion.div
              key={rose.id}
              className="absolute pointer-events-none select-none"
              style={{ left: rose.x, top: rose.y, zIndex: 2 }}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <span className="text-4xl">🌹</span>
                <motion.div
                  className="w-0.5 bg-green-600 origin-top"
                  initial={{ height: 0 }}
                  animate={{ height: 40 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main content — pointer-events-none so clicks pass through to plant layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center relative pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌹
          </motion.span>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-4"
            style={{ color: day.primaryColor }}
          >
            {day.name}
          </h1>

          <p className="text-lg text-gray-600 mb-2">February {day.date}</p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl font-serif italic max-w-lg mx-auto mt-6"
            style={{ color: day.primaryColor }}
          >
            "{day.quote}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 mt-4 max-w-md mx-auto"
          >
            {day.subQuote}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-400 mt-8"
          >
            ✨ Click anywhere to plant a rose ✨
          </motion.p>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
