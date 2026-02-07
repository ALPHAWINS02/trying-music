import { useState } from "react";
import { motion } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";
import FloatingElements from "../components/FloatingElements";

const day = VALENTINE_DAYS[4]; // Promise Day

const promises = [
  { front: "🤞 Promise #1", back: "I promise to always make you smile, even on your worst days." },
  { front: "💜 Promise #2", back: "I promise to be your biggest cheerleader, always and forever." },
  { front: "🌟 Promise #3", back: "I promise to hold your hand through every storm that comes our way." },
  { front: "🦋 Promise #4", back: "I promise to love you more with each passing day." },
  { front: "🌙 Promise #5", back: "I promise to be the reason you believe in fairy tales." },
  { front: "💫 Promise #6", back: "I promise to never let you go to sleep angry." },
];

export default function PromiseDayPage() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        <FloatingElements emoji="💜" count={10} direction="up" minDuration={5} maxDuration={9} />
        <FloatingElements emoji="✨" count={6} direction="down" minDuration={4} maxDuration={7} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20 w-full max-w-2xl"
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🤙
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

          {/* Promise Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
            {promises.map((promise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => toggleFlip(i)}
                className="cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="relative min-h-[130px] rounded-2xl shadow-lg"
                  animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-lavender border-2 border-purple-200"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-2xl mb-2">{promise.front.split(" ")[0]}</span>
                    <span className="text-sm font-medium text-purple-700">
                      {promise.front.split(" ").slice(1).join(" ")}
                    </span>
                    <span className="text-xs text-purple-400 mt-2">tap to reveal</span>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl p-4 flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-100 border-2 border-purple-300"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-sm font-medium text-purple-800 leading-snug">
                      {promise.back}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-500 mt-6"
          >
            {day.subQuote}
          </motion.p>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
