import { useState, useEffect } from "react";
import { MASTER_KEY } from "../data/days";

export function useCurrentDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDay = now.getDate();
  const currentMonth = now.getMonth(); // 0-indexed, Feb = 1

  const isDayUnlocked = (dayOfMonth: number): boolean => {
    // Check master key from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get("key") === MASTER_KEY) return true;

    // February = month index 1
    if (currentMonth > 1) return true; // After February, all unlocked
    if (currentMonth < 1) return false; // Before February, all locked
    return currentDay >= dayOfMonth;
  };

  const getTimeUntil = (dayOfMonth: number) => {
    const target = new Date(now.getFullYear(), 1, dayOfMonth, 0, 0, 0);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  return { now, currentDay, currentMonth, isDayUnlocked, getTimeUntil };
}
