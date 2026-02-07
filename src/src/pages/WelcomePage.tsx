import { motion } from "framer-motion";
import TextCarousel from "../components/TextCarousel";
import DodgeButton from "../components/DodgeButton";
import BloomButton from "../components/BloomButton";

export default function WelcomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden animate-gradient-bg"
    >
      {/* Floating hearts background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            fontSize: `${18 + Math.random() * 28}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.08, 0.2, 0.08],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {["💕", "💗", "✨", "🌸", "💖", "🤍", "💫"][Math.floor(Math.random() * 7)]}
        </motion.span>
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-6xl sm:text-7xl">🩰</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-lg sm:text-xl font-medium tracking-widest uppercase mb-8 text-center px-4"
        >
          Valentine Week Runway
        </motion.h1>

        {/* Carousel */}
        <TextCarousel text="finally you are here Shortcake 🧁 ! There's no need of violence little one !" />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12"
        >
          <DodgeButton />
          <BloomButton />
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-1/3 h-0.5 bg-white/30 rounded-full mb-8"
      />
    </motion.div>
  );
}
