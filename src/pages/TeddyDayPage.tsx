import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";

const day = VALENTINE_DAYS[3]; // Teddy Day

export default function TeddyDayPage() {
  const [hugged, setHugged] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const hugTeddy = () => {
    setHugged(true);
    setHugCount((prev) => prev + 1);
    setTimeout(() => setHugged(false), 2000);
  };

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        {/* Floating stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-xl pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ⭐
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20"
        >
          {/* Teddy */}
          <motion.div
            className="relative inline-block cursor-pointer"
            onClick={hugTeddy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="text-8xl sm:text-9xl block mb-4"
              animate={
                hugged
                  ? { scale: [1, 1.3, 1.1], rotate: [0, -10, 10, 0] }
                  : { y: [0, -8, 0] }
              }
              transition={
                hugged
                  ? { duration: 0.5 }
                  : { duration: 2, repeat: Infinity }
              }
            >
              🧸
            </motion.span>

            {/* Heart burst on hug */}
            <AnimatePresence>
              {hugged && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * 360;
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <motion.span
                        key={i}
                        className="absolute text-2xl pointer-events-none"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1.5, 0],
                          x: Math.cos(rad) * 80,
                          y: Math.sin(rad) * 80,
                          opacity: [1, 1, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        ❤️
                      </motion.span>
                    );
                  })}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {hugCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-amber-700 font-medium mb-4"
            >
              {hugCount} hug{hugCount !== 1 ? "s" : ""} given! 🤗
            </motion.p>
          )}

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
            style={{ color: "#8B7355" }}
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
            className="text-sm text-amber-600/60 mt-6"
          >
            🫂 Tap the teddy for a warm hug!
          </motion.p>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
