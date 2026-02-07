import { motion } from "framer-motion";

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  primaryColor?: string;
}

export default function CountdownTimer({ days, hours, minutes, seconds, primaryColor = "#C41E3A" }: CountdownTimerProps) {
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2"
            style={{
              backgroundColor: primaryColor + "15",
              borderColor: primaryColor + "30",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-bold font-serif"
              style={{ color: primaryColor }}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
          </motion.div>
          <span
            className="text-xs sm:text-sm mt-2 font-medium"
            style={{ color: primaryColor, opacity: 0.6 }}
          >
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
