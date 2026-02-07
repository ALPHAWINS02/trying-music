import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";
import FloatingElements from "../components/FloatingElements";

const day = VALENTINE_DAYS[5]; // Hug Day

export default function HugDayPage() {
  const [embraced, setEmbraced] = useState(false);
  const [heartsMerged, setHeartsMerged] = useState(false);

  const handleEmbrace = () => {
    setEmbraced(true);
    setTimeout(() => setHeartsMerged(true), 800);
  };

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        <FloatingElements emoji="🧡" count={10} direction="up" minDuration={5} maxDuration={8} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20"
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤗
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
            className="text-xl sm:text-2xl font-serif italic max-w-lg mx-auto mb-10"
            style={{ color: day.primaryColor }}
          >
            "{day.quote}"
          </motion.p>

          {/* Hearts merging interaction */}
          <div className="relative h-48 w-80 sm:w-96 mx-auto mb-8">
            {!heartsMerged ? (
              <>
                <motion.button
                  className="absolute text-5xl cursor-pointer bg-transparent border-none select-none"
                  style={{ left: "0%", top: "50%", y: "-50%" }}
                  animate={
                    embraced
                      ? { x: 100, scale: 1.2 }
                      : { x: [0, 15, 0], y: ["-50%"] }
                  }
                  transition={
                    embraced
                      ? { duration: 0.8, type: "spring" }
                      : { duration: 2, repeat: Infinity }
                  }
                  onClick={handleEmbrace}
                  whileHover={{ scale: 1.2 }}
                >
                  💗
                </motion.button>
                <motion.button
                  className="absolute text-5xl cursor-pointer bg-transparent border-none select-none"
                  style={{ right: "0%", top: "50%", y: "-50%" }}
                  animate={
                    embraced
                      ? { x: -100, scale: 1.2 }
                      : { x: [0, -15, 0], y: ["-50%"] }
                  }
                  transition={
                    embraced
                      ? { duration: 0.8, type: "spring" }
                      : { duration: 2, repeat: Infinity, delay: 0.5 }
                  }
                  onClick={handleEmbrace}
                  whileHover={{ scale: 1.2 }}
                >
                  💗
                </motion.button>
              </>
            ) : (
              <AnimatePresence>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <span className="text-7xl">💕</span>
                </motion.div>

                {/* Warm glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.3, 0.15], scale: [0, 2, 2.5] }}
                  transition={{ duration: 1.5 }}
                  style={{
                    background: "radial-gradient(circle, rgba(255,127,80,0.3) 0%, transparent 70%)",
                  }}
                />

                {/* Sparkles */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * 360;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.span
                      key={i}
                      className="absolute text-lg pointer-events-none"
                      style={{ left: "50%", top: "50%" }}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: Math.cos(rad) * 90,
                        y: Math.sin(rad) * 90,
                      }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                    >
                      ✨
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-500 max-w-md mx-auto"
          >
            {day.subQuote}
          </motion.p>

          {!heartsMerged && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-orange-400/60 mt-4"
            >
              💗 Tap a heart to bring them together 💗
            </motion.p>
          )}
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
