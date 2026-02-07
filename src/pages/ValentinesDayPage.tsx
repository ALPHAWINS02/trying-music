import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VALENTINE_DAYS } from "../data/days";
import DateLockGuard from "../components/DateLockGuard";
import PageLayout from "../components/PageLayout";

const day = VALENTINE_DAYS[7]; // Valentine's Day

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function ValentinesDayPage() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [celebration, setCelebration] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const confettiColors = ["#E31B23", "#FFD700", "#FF69B4", "#FF1493", "#FF6B6B", "#FFC0CB", "#FFB6C1"];

  useEffect(() => {
    // Initial confetti burst
    const pieces: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 720,
    }));
    setConfetti(pieces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerCelebration = () => {
    setCelebration(true);

    // Launch fireworks
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const firework: Firework = {
          id: Date.now() + i,
          x: 20 + Math.random() * 60,
          y: 15 + Math.random() * 30,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        };
        setFireworks((prev) => [...prev, firework]);
      }, i * 400);
    }

    setTimeout(() => setShowMessage(true), 1500);
  };

  return (
    <DateLockGuard day={day}>
      <PageLayout day={day}>
        {/* Confetti */}
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute pointer-events-none z-0"
            style={{
              left: `${piece.x}%`,
              top: "-20px",
              width: `${piece.size}px`,
              height: `${piece.size * 0.6}px`,
              backgroundColor: piece.color,
              borderRadius: "2px",
            }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, piece.rotation],
            }}
            transition={{
              duration: piece.duration,
              repeat: Infinity,
              delay: piece.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Fireworks */}
        <AnimatePresence>
          {fireworks.map((fw) => (
            <motion.div
              key={fw.id}
              className="absolute pointer-events-none z-30"
              style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: fw.color,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(rad) * (60 + Math.random() * 40),
                      y: Math.sin(rad) * (60 + Math.random() * 40),
                      opacity: [1, 1, 0],
                      scale: [1, 1.5, 0],
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                );
              })}
              {/* Center flash */}
              <motion.div
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ width: 20, height: 20, backgroundColor: fw.color }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2, 0], opacity: [1, 0.5, 0] }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-20"
        >
          {/* Pulsing heart */}
          <motion.div
            className="cursor-pointer inline-block"
            onClick={triggerCelebration}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="text-8xl sm:text-9xl block mb-6"
              animate={
                celebration
                  ? {
                      scale: [1, 1.4, 1.2, 1.5, 1],
                      rotate: [0, -10, 10, -5, 0],
                    }
                  : {
                      scale: [1, 1.2, 1],
                    }
              }
              transition={
                celebration
                  ? { duration: 1 }
                  : { duration: 1.5, repeat: Infinity }
              }
            >
              💝
            </motion.span>
          </motion.div>

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

          {/* Celebration message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-10 p-8 bg-white/30 backdrop-blur-md rounded-3xl border-2 border-white/40 shadow-2xl max-w-md mx-auto"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-serif font-bold mb-4"
                  style={{ color: day.primaryColor }}
                >
                  Happy Valentine's Day!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-700 font-medium leading-relaxed"
                >
                  Through rose petals and sweet chocolates, through warm hugs and tender kisses, 
                  through every promise made and every teddy shared — this journey of love 
                  has been nothing short of magical. 
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-lg mt-4 font-serif italic"
                  style={{ color: day.primaryColor }}
                >
                  Here's to forever 💕
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {!celebration && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm text-red-400/60 mt-8"
            >
              💝 Tap the heart for a celebration! 🎆
            </motion.p>
          )}
        </motion.div>
      </PageLayout>
    </DateLockGuard>
  );
}
