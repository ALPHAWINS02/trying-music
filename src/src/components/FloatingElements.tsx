import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingElementsProps {
  emoji: string;
  count?: number;
  direction?: "up" | "down";
  minDuration?: number;
  maxDuration?: number;
}

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function FloatingElements({
  emoji,
  count = 15,
  direction = "down",
  minDuration = 4,
  maxDuration = 8,
}: FloatingElementsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      size: 16 + Math.random() * 20,
      rotation: Math.random() * 360,
    }));
    setParticles(generated);
  }, [count, minDuration, maxDuration]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            top: direction === "down" ? "-50px" : undefined,
            bottom: direction === "up" ? "-50px" : undefined,
          }}
          animate={
            direction === "down"
              ? {
                  y: ["0vh", "110vh"],
                  x: [0, Math.random() * 60 - 30],
                  rotate: [0, p.rotation],
                }
              : {
                  y: ["0vh", "-110vh"],
                  x: [0, Math.random() * 60 - 30],
                  rotate: [0, p.rotation],
                }
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
