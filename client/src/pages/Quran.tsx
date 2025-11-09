import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Moon } from "lucide-react";
import { useQuran } from "@/hooks/useQuran";

export default function Quran() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { pages, togglePage, getDailyProgress, getWeeklyProgress } = useQuran();

  const completedCount = pages.filter(p => p.completed).length;
  const dailyProgress = getDailyProgress();
  const weeklyProgress = getWeeklyProgress();
  const allComplete = completedCount === 5;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-quran-greeting">
          {t("quranGreeting")}, {settings.username}!
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("dailyPages")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" data-testid="text-daily-progress">
                {Math.round(dailyProgress)}%
              </div>
              <Progress value={dailyProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {completedCount} / 5 {t("pagesComplete")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-chart-3" />
              {t("weeklyProgress")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" data-testid="text-weekly-progress">
                {Math.round(weeklyProgress)}%
              </div>
              <Progress value={weeklyProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((weeklyProgress / 100) * 35)} / 35 {t("pagesComplete")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("page")} 1-5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-5">
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover-elevate ${
                  page.completed ? "bg-primary/5 border-primary/30" : "border-border"
                }`}
                data-testid={`card-quran-page-${page.pageNumber}`}
              >
                <span className="text-lg font-semibold mb-2">
                  {t("page")} {page.pageNumber}
                </span>
                <Checkbox
                  checked={page.completed}
                  onCheckedChange={() => togglePage(page.pageNumber)}
                  className="scale-150 animate-check-bounce"
                  data-testid={`checkbox-quran-page-${page.pageNumber}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {allComplete && (
        <Card className="bg-gradient-to-r from-primary/10 to-chart-3/10 border-primary/30 animate-fade-in-scale">
          <CardContent className="p-6 text-center">
            <Moon className="h-12 w-12 mx-auto mb-3 text-primary" />
            <p className="text-xl font-bold" data-testid="text-quran-complete">
              {t("quranComplete")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
