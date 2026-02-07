import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";

const day = VALENTINE_DAYS[2]; // Chocolate Day

const chocolates = [
  { emoji: "🍫", message: "You melt my heart like chocolate on a warm day 💕", color: "#8B4513" },
  { emoji: "🍬", message: "Sweet like candy, but even sweeter is your love 🍭", color: "#D2691E" },
  { emoji: "🧁", message: "You're the icing on the cupcake of my life ✨", color: "#CD853F" },
  { emoji: "🍩", message: "My love for you has no holes... okay maybe that's a donut joke 😄", color: "#A0522D" },
  { emoji: "🎂", message: "Every day with you is a celebration worth having 🎉", color: "#DEB887" },
  { emoji: "🍪", message: "You're one smart cookie, and I'm lucky you chose me 🍪", color: "#B8860B" },
];

export default function ChocolateDayPage() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [unwrapped, setUnwrapped] = useState(false);

  const toggleChocolate = (index: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        {/* Chocolate particle background */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-30px`,
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              rotate: [0, 360],
              x: [0, Math.random() * 80 - 40],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear",
            }}
          >
            {["🍫", "🍬", "🍭", "🧁"][Math.floor(Math.random() * 4)]}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20"
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🍫
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
            className="text-xl sm:text-2xl font-serif italic max-w-lg mx-auto mb-8"
            style={{ color: day.primaryColor }}
          >
            "{day.quote}"
          </motion.p>

          {/* Unwrap animation */}
          {!unwrapped ? (
            <motion.button
              onClick={() => setUnwrapped(true)}
              className="px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-lg cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${day.primaryColor}, ${day.secondaryColor})` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎁 Unwrap the chocolate box!
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto mt-4"
            >
              {chocolates.map((choco, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleChocolate(i)}
                  className="cursor-pointer"
                >
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 hover:shadow-xl transition-shadow min-h-[120px] flex flex-col items-center justify-center"
                    style={{ borderColor: choco.color + "40" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {revealed.has(i) ? (
                        <motion.p
                          key="message"
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -90 }}
                          className="text-sm font-medium text-amber-800 leading-snug"
                        >
                          {choco.message}
                        </motion.p>
                      ) : (
                        <motion.span
                          key="emoji"
                          initial={{ opacity: 0, rotateY: -90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: 90 }}
                          className="text-4xl"
                        >
                          {choco.emoji}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 mt-6"
          >
            {day.subQuote}
          </motion.p>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
