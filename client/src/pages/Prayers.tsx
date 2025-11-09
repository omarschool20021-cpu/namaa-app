import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Heart, Trophy } from "lucide-react";
import { prayerNames } from "@shared/schema";
import { usePrayers } from "@/hooks/usePrayers";

export default function Prayers() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { prayers, togglePrayer, getProgress } = usePrayers();

  const completedCount = prayers.filter(p => p.completed).length;
  const progress = getProgress();
  const allComplete = completedCount === prayerNames.length;

  const prayerTranslations: Record<string, { en: string; ar: string }> = {
    Fajr: { en: "Fajr", ar: "الفجر" },
    Dhuhr: { en: "Dhuhr", ar: "الظهر" },
    Asr: { en: "Asr", ar: "العصر" },
    Maghrib: { en: "Maghrib", ar: "المغرب" },
    Isha: { en: "Isha", ar: "العشاء" },
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-prayers-greeting">
          {t("prayersGreeting")}, {settings.username}!
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            {t("progress")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" data-testid="text-prayer-progress">
              {Math.round(progress)}%
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {completedCount} / {prayerNames.length} {settings.language === "ar" ? "صلوات" : "prayers"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {prayers.map((prayer) => (
          <Card
            key={prayer.name}
            className={`hover-elevate transition-all ${
              prayer.completed ? "bg-primary/5 border-primary/20" : ""
            }`}
            data-testid={`card-prayer-${prayer.name.toLowerCase()}`}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className={settings.language === "ar" ? "font-arabic text-xl font-semibold" : "text-lg font-semibold"}>
                {settings.language === "ar"
                  ? prayerTranslations[prayer.name].ar
                  : prayerTranslations[prayer.name].en}
              </div>
              <Checkbox
                checked={prayer.completed}
                onCheckedChange={() => togglePrayer(prayer.name)}
                className="mx-auto scale-150 animate-check-bounce"
                data-testid={`checkbox-prayer-${prayer.name.toLowerCase()}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {allComplete && (
        <Card className="bg-gradient-to-r from-primary/10 to-chart-2/10 border-primary/30 animate-fade-in-scale">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-primary" />
            <p className="text-xl font-bold" data-testid="text-prayers-complete">
              {t("perfectPrayers")}
            </p>
          </CardContent>
        </Card>
      )}

      {!allComplete && completedCount > 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-lg text-muted-foreground" data-testid="text-prayers-encouragement">
              {t("keepGoing")}!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
