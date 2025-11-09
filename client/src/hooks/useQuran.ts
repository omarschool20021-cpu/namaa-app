import { useLocalStorage } from "./useLocalStorage";
import type { DailyQuran } from "@shared/schema";
import { format, startOfWeek, addDays } from "date-fns";

export function useQuran() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [dailyQuran, setDailyQuran] = useLocalStorage<DailyQuran>(
    `namaa_quran_${today}`,
    {
      date: today,
      pages: Array.from({ length: 5 }, (_, i) => ({
        pageNumber: i + 1,
        completed: false,
        date: today,
      })),
    }
  );

  const togglePage = (pageNumber: number) => {
    setDailyQuran({
      ...dailyQuran,
      pages: dailyQuran.pages.map(page =>
        page.pageNumber === pageNumber ? { ...page, completed: !page.completed } : page
      ),
    });
  };

  const getDailyProgress = () => {
    const completed = dailyQuran.pages.filter(p => p.completed).length;
    return Math.round((completed / 5) * 100);
  };

  const getWeeklyProgress = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 6 });
    let weeklyCompleted = 0;

    for (let i = 0; i < 7; i++) {
      const date = format(addDays(weekStart, i), "yyyy-MM-dd");
      const stored = localStorage.getItem(`namaa_quran_${date}`);
      if (stored) {
        const data: DailyQuran = JSON.parse(stored);
        weeklyCompleted += data.pages.filter(p => p.completed).length;
      }
    }

    return Math.round((weeklyCompleted / 35) * 100);
  };

  return {
    pages: dailyQuran.pages,
    togglePage,
    getDailyProgress,
    getWeeklyProgress,
  };
}
