import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BloomButton() {
  const [blooming, setBlooming] = useState(false);
  const navigate = useNavigate();

  const petalColors = [
    "#FF69B4", "#FF1493", "#FFB6C1", "#FF6B6B",
    "#FF85A2", "#FFC0CB", "#FF4081", "#E91E63",
    "#F48FB1", "#FF80AB", "#FF69B4", "#FFB6C1",
  ];

  const handleClick = () => {
    setBlooming(true);
    setTimeout(() => {
      navigate("/rose-day");
    }, 2000);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-full shadow-lg hover:shadow-pink-400/50 text-lg tracking-wide border-2 border-pink-300/50 cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,105,180,0.5)" }}
        whileTap={{ scale: 0.95 }}
        disabled={blooming}
      >
        Okkaayy!! 🌸
      </motion.button>

      <AnimatePresence>
        {blooming && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Center flower core */}
            <motion.div
              className="absolute rounded-full"
              style={{ background: "#FFD700", width: 30, height: 30 }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5 }}
            />

            {/* Petals blooming outward */}
            {petalColors.map((color, i) => {
              const angle = (i / petalColors.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const distance = 120 + Math.random() * 80;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: color,
                    width: 40 + Math.random() * 20,
                    height: 55 + Math.random() * 20,
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    opacity: [0, 1, 1],
                    rotate: angle,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Secondary ring of smaller petals */}
            {petalColors.map((color, i) => {
              const angle = (i / petalColors.length) * 360 + 15;
              const rad = (angle * Math.PI) / 180;
              const distance = 200 + Math.random() * 100;
              return (
                <motion.div
                  key={`outer-${i}`}
                  className="absolute rounded-full"
                  style={{
                    background: color,
                    width: 25 + Math.random() * 15,
                    height: 35 + Math.random() * 15,
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    opacity: 0.7,
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0.8],
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    opacity: [0, 0.8, 0.6],
                    rotate: angle + 30,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.04,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Fade to white overlay */}
            <motion.div
              className="fixed inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
