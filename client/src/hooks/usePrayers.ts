import { useLocalStorage } from "./useLocalStorage";
import type { DailyPrayers } from "@shared/schema";
import { format } from "date-fns";
import { prayerNames } from "@shared/schema";

export function usePrayers() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [dailyPrayers, setDailyPrayers] = useLocalStorage<DailyPrayers>(
    `namaa_prayers_${today}`,
    {
      date: today,
      prayers: prayerNames.map(name => ({ name, completed: false, date: today })),
    }
  );

  const togglePrayer = (prayerName: string) => {
    setDailyPrayers({
      ...dailyPrayers,
      prayers: dailyPrayers.prayers.map(prayer =>
        prayer.name === prayerName ? { ...prayer, completed: !prayer.completed } : prayer
      ),
    });
  };

  const getProgress = () => {
    const completed = dailyPrayers.prayers.filter(p => p.completed).length;
    return Math.round((completed / prayerNames.length) * 100);
  };

  return {
    prayers: dailyPrayers.prayers,
    togglePrayer,
    getProgress,
  };
}
