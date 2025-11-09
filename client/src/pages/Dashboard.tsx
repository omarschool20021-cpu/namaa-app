import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCard } from "@/components/ProgressCard";
import { ReminderDialog } from "@/components/ReminderDialog";
import { CheckSquare, Heart, BookOpen, GraduationCap, Clock, Bell } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { quranicVerses, productivityTips } from "@/lib/quotes";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { usePrayers } from "@/hooks/usePrayers";
import { useQuran } from "@/hooks/useQuran";
import { useLessons } from "@/hooks/useLessons";
import { useReminders } from "@/hooks/useReminders";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Dashboard() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];

  const { getProgress: getTasksProgress } = useTasks();
  const { getProgress: getPrayersProgress } = usePrayers();
  const { getDailyProgress: getQuranProgress } = useQuran();
  const { getProgress: getLessonsProgress } = useLessons();
  const { getUpcomingReminders } = useReminders();

  const upcomingReminders = getUpcomingReminders();

  const [greeting, setGreeting] = useState("");
  const today = format(new Date(), "yyyy-MM-dd");
  const [intention, setIntention] = useLocalStorage(`namaa_intention_${today}`, "");
  const [verse] = useState(() => quranicVerses[Math.floor(Math.random() * quranicVerses.length)]);
  const [tip] = useState(() => productivityTips[Math.floor(Math.random() * productivityTips.length)]);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingKey: "goodMorning" | "goodAfternoon" | "goodEvening" = "goodMorning";
    
    if (hour >= 12 && hour < 17) {
      greetingKey = "goodAfternoon";
    } else if (hour >= 17) {
      greetingKey = "goodEvening";
    }
    
    setGreeting(`${t(greetingKey)}, ${settings.username}!`);
  }, [settings.username, settings.language]);

  const progress = {
    tasks: getTasksProgress(),
    prayers: getPrayersProgress(),
    quran: getQuranProgress(),
    lessons: getLessonsProgress(),
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      {/* Header with date and greeting */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground" data-testid="text-current-date">
          {format(new Date(), settings.language === "ar" ? "EEEE، dd MMMM yyyy" : "EEEE, MMMM dd, yyyy")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" data-testid="text-greeting">
          {greeting}
        </h2>
      </div>

      {/* Daily Intention & Reminders */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={`md:col-span-2 ${settings.language === "ar" ? "font-arabic" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {t("dailyIntention")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder={t("intentionPlaceholder")}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="resize-none min-h-[100px]"
              data-testid="input-daily-intention"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="h-4 w-4 text-chart-2" />
              {t("upcomingReminders")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingReminders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-upcoming-reminders">
                {settings.language === "ar" ? "لا توجد تذكيرات" : "No reminders"}
              </p>
            ) : (
              upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="text-sm p-2 rounded-lg bg-muted/50" data-testid={`text-upcoming-reminder-${reminder.id}`}>
                  <p className="font-medium truncate">{reminder.title}</p>
                  <p className="text-xs text-muted-foreground">{reminder.time}</p>
                </div>
              ))
            )}
            <ReminderDialog />
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div>
        <h3 className="text-xl font-semibold mb-4">{t("progress")}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProgressCard title={t("tasksProgress")} progress={progress.tasks} icon={CheckSquare} />
          <ProgressCard title={t("prayersProgress")} progress={progress.prayers} icon={Heart} iconColor="text-chart-2" />
          <ProgressCard title={t("quranProgress")} progress={progress.quran} icon={BookOpen} iconColor="text-chart-3" />
          <ProgressCard title={t("lessonsProgress")} progress={progress.lessons} icon={GraduationCap} iconColor="text-chart-4" />
        </div>
      </div>

      {/* Inspirational Content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={`${settings.language === "ar" ? "font-arabic" : ""} bg-gradient-to-br from-card to-primary/5`}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{t("quranicVerse")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-medium leading-relaxed" data-testid="text-quranic-verse">
              {settings.language === "ar" ? verse.textAr : verse.textEn}
            </p>
            <p className="text-sm text-muted-foreground">{verse.reference}</p>
          </CardContent>
        </Card>

        <Card className={settings.language === "ar" ? "font-arabic" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {t("productivityTip")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed" data-testid="text-productivity-tip">
              {settings.language === "ar" ? tip.textAr : tip.textEn}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
