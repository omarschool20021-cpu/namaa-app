import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Heart, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { format, startOfWeek, addDays } from "date-fns";
import { useTasks } from "@/hooks/useTasks";
import { prayerNames } from "@shared/schema";
import type { DailyPrayers, DailyQuran, WeeklyLessons } from "@shared/schema";

export default function WeeklyOverview() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { tasks } = useTasks();

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 6 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Calculate weekly stats
  let completedTasks = 0, totalTasks = 0;
  let totalPrayers = 0, completedPrayers = 0;
  let totalQuranPages = 0, completedQuranPages = 0;
  let lessonDays = 0;

  weekDays.forEach((day) => {
    const dateStr = format(day, "yyyy-MM-dd");

    // Tasks
    const dayTasks = tasks.filter(t => t.dueDate.startsWith(dateStr));
    totalTasks += dayTasks.length;
    completedTasks += dayTasks.filter(t => t.completed).length;

    // Prayers
    const prayersStr = localStorage.getItem(`namaa_prayers_${dateStr}`);
    if (prayersStr) {
      const prayerData: DailyPrayers = JSON.parse(prayersStr);
      totalPrayers += prayerData.prayers.length;
      completedPrayers += prayerData.prayers.filter(p => p.completed).length;
    } else {
      totalPrayers += prayerNames.length;
    }

    // Quran
    const quranStr = localStorage.getItem(`namaa_quran_${dateStr}`);
    if (quranStr) {
      const quranData: DailyQuran = JSON.parse(quranStr);
      totalQuranPages += quranData.pages.length;
      completedQuranPages += quranData.pages.filter(p => p.completed).length;
    } else {
      totalQuranPages += 5;
    }
  });

  // Lessons
  const weekKey = format(weekStart, "yyyy-MM-dd");
  const lessonsStr = localStorage.getItem(`namaa_lessons_${weekKey}`);
  if (lessonsStr) {
    const lessonsData: WeeklyLessons = JSON.parse(lessonsStr);
    lessonDays = lessonsData.lessons.length;
  }

  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const prayerProgress = totalPrayers > 0 ? (completedPrayers / totalPrayers) * 100 : 0;
  const quranProgress = totalQuranPages > 0 ? (completedQuranPages / totalQuranPages) * 100 : 0;
  const lessonProgress = lessonDays > 0 ? (lessonDays / 7) * 100 : 0;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-weekly-greeting">
          {t("weeklyGreeting")}, {settings.username}!
        </h2>
        <p className="text-muted-foreground">
          {format(weekStart, "MMM dd")} - {format(addDays(weekStart, 6), "MMM dd, yyyy")}
        </p>
      </div>

      <Card className="bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t("summary")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t("tasksProgress")}</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-tasks-percentage">
                  {Math.round(taskProgress)}%
                </span>
              </div>
              <Progress value={taskProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedTasks} / {totalTasks} {t("complete").toLowerCase()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-chart-2" />
                  <span className="font-medium">{t("prayersProgress")}</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-prayers-percentage">
                  {Math.round(prayerProgress)}%
                </span>
              </div>
              <Progress value={prayerProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedPrayers} / {totalPrayers} {t("complete").toLowerCase()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-chart-3" />
                  <span className="font-medium">{t("quranProgress")}</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-quran-percentage">
                  {Math.round(quranProgress)}%
                </span>
              </div>
              <Progress value={quranProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedQuranPages} / {totalQuranPages} {t("pagesComplete")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-chart-4" />
                  <span className="font-medium">{t("lessonsProgress")}</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-lessons-percentage">
                  {Math.round(lessonProgress)}%
                </span>
              </div>
              <Progress value={lessonProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {lessonDays} / 7 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("motivation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg leading-relaxed" data-testid="text-weekly-motivation">
              {settings.language === "ar"
                ? "أنت تقوم بعمل رائع! استمر في الجهد والتحسن."
                : "You're doing great! Keep up the effort and improvement."}
            </p>
            {prayerProgress === 100 && (
              <p className="text-primary font-semibold">
                {settings.language === "ar"
                  ? "🏆 أكملت جميع صلواتك هذا الأسبوع!"
                  : "🏆 You completed all prayers this week!"}
              </p>
            )}
            {quranProgress >= 100 && (
              <p className="text-primary font-semibold">
                {settings.language === "ar"
                  ? "🌙 أكملت هدفك الأسبوعي للقرآن!"
                  : "🌙 You hit your weekly Quran goal!"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
