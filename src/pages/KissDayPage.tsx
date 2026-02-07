import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";
import FloatingElements from "../components/FloatingElements";

const day = VALENTINE_DAYS[6]; // Kiss Day

interface KissMark {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

export default function KissDayPage() {
  const [kisses, setKisses] = useState<KissMark[]>([]);

  const leaveKiss = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setKisses((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        rotation: Math.random() * 40 - 20,
        size: 24 + Math.random() * 20,
      },
    ]);
  }, []);

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        <FloatingElements emoji="💋" count={12} direction="down" minDuration={4} maxDuration={8} />
        <FloatingElements emoji="💖" count={6} direction="up" minDuration={5} maxDuration={9} />

        {/* Click-to-kiss layer — behind all interactive elements */}
        <div
          className="absolute inset-0 cursor-crosshair"
          style={{ zIndex: 1 }}
          onClick={leaveKiss}
        />

        {/* Kiss marks */}
        <AnimatePresence>
          {kisses.map((kiss) => (
            <motion.div
              key={kiss.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: kiss.x,
                top: kiss.y,
                fontSize: `${kiss.size}px`,
                transform: `translate(-50%, -50%) rotate(${kiss.rotation}deg)`,
                zIndex: 2,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              💋
              {/* Sparkle burst */}
              {Array.from({ length: 4 }).map((_, i) => {
                const angle = (i / 4) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.span
                    key={i}
                    className="absolute text-xs"
                    style={{ left: "50%", top: "50%" }}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: [1, 0],
                      x: Math.cos(rad) * 30,
                      y: Math.sin(rad) * 30,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    ✨
                  </motion.span>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💋
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
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-serif italic max-w-lg mx-auto mt-6"
            style={{ color: day.primaryColor }}
          >
            "{day.quote}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-500 mt-4 max-w-md mx-auto"
          >
            {day.subQuote}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-pink-400/60 mt-8"
          >
            💋 Click anywhere to leave a kiss mark ✨
          </motion.p>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
