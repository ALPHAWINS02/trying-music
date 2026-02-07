import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";
import FloatingElements from "../components/FloatingElements";

const day = VALENTINE_DAYS[1]; // Propose Day

export default function ProposeDayPage() {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        <FloatingElements emoji="💛" count={12} direction="up" />
        <FloatingElements emoji="✨" count={8} direction="down" minDuration={6} maxDuration={10} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20"
        >
          <motion.span
            className="text-7xl sm:text-8xl block mb-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💍
          </motion.span>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-4"
            style={{ color: day.primaryColor }}
          >
            {day.name}
          </h1>

          <p className="text-lg text-gray-600 mb-6">February {day.date}</p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-serif italic max-w-lg mx-auto mb-8"
            style={{ color: day.primaryColor }}
          >
            "{day.quote}"
          </motion.p>

          {/* Love Letter */}
          <motion.div
            className="relative cursor-pointer mx-auto"
            style={{ perspective: "1000px" }}
            onClick={() => setLetterOpen(!letterOpen)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-amber-200 p-8 max-w-md mx-auto overflow-hidden"
              animate={{ height: letterOpen ? "auto" : "120px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Envelope top flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-100 to-transparent flex items-center justify-center"
                animate={{ opacity: letterOpen ? 0 : 1 }}
              >
                <span className="text-amber-600 font-medium text-sm tracking-wider">
                  ✉️ Tap to open the love letter...
                </span>
              </motion.div>

              <AnimatePresence>
                {letterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4"
                  >
                    <p className="font-serif text-amber-900 text-left leading-relaxed">
                      <span className="text-3xl font-bold text-amber-700">D</span>ear Love,
                    </p>
                    <p className="font-serif text-amber-800 text-left leading-relaxed mt-3">
                      From the moment you walked into my life, everything changed. 
                      The colors became brighter, the music became sweeter, and 
                      my heart <span className="line-through opacity-60">found its rhythm</span> got busted.
                    </p>
                    <p className="font-serif text-amber-800 text-left leading-relaxed mt-3">
                      {day.subQuote}
                    </p>
                    <p className="font-serif text-amber-700 text-right mt-4 italic">
                      Forever yours 💕
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
