import { useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function DodgeButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dodge = useCallback(() => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    setPosition({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  }, []);

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={dodge}
      onMouseEnter={dodge}
      className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/50 text-lg tracking-wide border-2 border-red-400/50 cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
    >
      Violence 😤
    </motion.button>
  );
}
