import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GraduationCap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import type { LessonMetrics } from "@shared/schema";
import { useLessons } from "@/hooks/useLessons";

export default function Lessons() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { lessons, updateLesson, getAverages } = useLessons();

  const dayNames = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
  const { focus: averageFocus, interaction: averageInteraction, homework: averageHomework } = getAverages();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-lessons-greeting">
          {t("lessonsGreeting")}, {settings.username}!
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {t("weeklyAverage")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">{t("focus")}</p>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(averageFocus) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-lg font-bold mt-1">{averageFocus.toFixed(1)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">{t("interaction")}</p>
              <p className="text-3xl font-bold text-chart-2">{Math.round(averageInteraction)}%</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">{t("homework")}</p>
              <p className="text-3xl font-bold text-chart-3">{Math.round(averageHomework)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Card key={lesson.date} className="hover-elevate" data-testid={`card-lesson-${dayNames[index]}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className={settings.language === "ar" ? "font-arabic" : ""}>
                  {t(dayNames[index] as any)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(lesson.date), "MMM dd")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">{t("focus")} (1-5)</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => updateLesson(lesson.date, { focus: i + 1 })}
                      className="transition-transform hover:scale-110 active-elevate-2"
                      data-testid={`button-focus-${dayNames[index]}-${i + 1}`}
                    >
                      <Star
                        className={`h-8 w-8 ${i < lesson.focus ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">{t("interaction")}</span>
                  <Switch
                    checked={lesson.interaction}
                    onCheckedChange={(checked) => updateLesson(lesson.date, { interaction: checked })}
                    data-testid={`switch-interaction-${dayNames[index]}`}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">{t("homework")}</span>
                  <Switch
                    checked={lesson.homework}
                    onCheckedChange={(checked) => updateLesson(lesson.date, { homework: checked })}
                    data-testid={`switch-homework-${dayNames[index]}`}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">{t("mistakeReduction")}</span>
                  <Switch
                    checked={lesson.mistakeReduction}
                    onCheckedChange={(checked) => updateLesson(lesson.date, { mistakeReduction: checked })}
                    data-testid={`switch-mistake-${dayNames[index]}`}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">{t("respectDiscipline")}</span>
                  <Switch
                    checked={lesson.respectDiscipline}
                    onCheckedChange={(checked) => updateLesson(lesson.date, { respectDiscipline: checked })}
                    data-testid={`switch-respect-${dayNames[index]}`}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t("notes")}</label>
                <Textarea
                  value={lesson.notes || ""}
                  onChange={(e) => updateLesson(lesson.date, { notes: e.target.value })}
                  placeholder="Add notes..."
                  className="resize-none"
                  rows={2}
                  data-testid={`input-notes-${dayNames[index]}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
