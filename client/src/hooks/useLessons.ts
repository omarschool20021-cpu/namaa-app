import { useLocalStorage } from "./useLocalStorage";
import type { WeeklyLessons, LessonMetrics } from "@shared/schema";
import { format, startOfWeek, addDays } from "date-fns";

export function useLessons() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 6 });
  const weekKey = format(weekStart, "yyyy-MM-dd");
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const [weeklyLessons, setWeeklyLessons] = useLocalStorage<WeeklyLessons>(
    `namaa_lessons_${weekKey}`,
    {
      weekStart: weekKey,
      lessons: weekDays.map(day => ({
        date: format(day, "yyyy-MM-dd"),
        focus: 3,
        interaction: false,
        homework: false,
        mistakeReduction: false,
        respectDiscipline: false,
        notes: "",
      })),
    }
  );

  const updateLesson = (date: string, updates: Partial<LessonMetrics>) => {
    setWeeklyLessons({
      ...weeklyLessons,
      lessons: weeklyLessons.lessons.map(lesson =>
        lesson.date === date ? { ...lesson, ...updates } : lesson
      ),
    });
  };

  const getProgress = () => {
    const averageFocus = weeklyLessons.lessons.reduce((sum, l) => sum + l.focus, 0) / 7;
    return Math.round((averageFocus / 5) * 100);
  };

  const getAverages = () => {
    const focus = weeklyLessons.lessons.reduce((sum, l) => sum + l.focus, 0) / 7;
    const interaction = (weeklyLessons.lessons.filter(l => l.interaction).length / 7) * 100;
    const homework = (weeklyLessons.lessons.filter(l => l.homework).length / 7) * 100;
    const mistakeReduction = (weeklyLessons.lessons.filter(l => l.mistakeReduction).length / 7) * 100;
    const respectDiscipline = (weeklyLessons.lessons.filter(l => l.respectDiscipline).length / 7) * 100;

    return { focus, interaction, homework, mistakeReduction, respectDiscipline };
  };

  return {
    lessons: weeklyLessons.lessons,
    updateLesson,
    getProgress,
    getAverages,
  };
}
