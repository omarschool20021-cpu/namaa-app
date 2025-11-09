import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { toast } = useToast();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];

  const [username, setUsername] = useState(settings.username);

  const saveUsername = () => {
    if (username.trim()) {
      updateSettings({ username: username.trim() });
      toast({
        title: settings.language === "ar" ? "تم الحفظ" : "Saved",
        description: settings.language === "ar"
          ? "تم تحديث اسم المستخدم بنجاح"
          : "Username updated successfully",
      });
    }
  };

  const resetAllData = () => {
    const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith("namaa_"));
    keysToRemove.forEach(key => {
      if (key !== "namaa_settings") {
        localStorage.removeItem(key);
      }
    });
    toast({
      title: settings.language === "ar" ? "تم إعادة التعيين" : "Reset Complete",
      description: settings.language === "ar"
        ? "تم حذف جميع البيانات بنجاح"
        : "All data has been deleted successfully",
      variant: "destructive",
    });
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-settings-greeting">
          {t("settingsGreeting")}, {settings.username}!
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            {t("username")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="username">{t("username")}</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveUsername()}
                data-testid="input-username"
              />
              <Button onClick={saveUsername} data-testid="button-save-username">
                {t("save")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("language")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{t("language")}</p>
              <p className="text-sm text-muted-foreground">
                {settings.language === "ar" ? "اختر لغتك المفضلة" : "Choose your preferred language"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={settings.language === "en" ? "default" : "outline"}
                onClick={() => updateSettings({ language: "en" })}
                data-testid="button-language-en"
              >
                English
              </Button>
              <Button
                variant={settings.language === "ar" ? "default" : "outline"}
                onClick={() => updateSettings({ language: "ar" })}
                className="font-arabic"
                data-testid="button-language-ar"
              >
                العربية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("theme")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{t("theme")}</p>
              <p className="text-sm text-muted-foreground">
                {settings.language === "ar" ? "اختر مظهر التطبيق" : "Choose app appearance"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={settings.theme === "light" ? "default" : "outline"}
                onClick={() => updateSettings({ theme: "light" })}
                data-testid="button-theme-light"
              >
                {t("light")}
              </Button>
              <Button
                variant={settings.theme === "dark" ? "default" : "outline"}
                onClick={() => updateSettings({ theme: "dark" })}
                data-testid="button-theme-dark"
              >
                {t("dark")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("fontSize")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{t("fontSize")}</p>
              <p className="text-sm text-muted-foreground">
                {settings.language === "ar" ? "اضبط حجم الخط" : "Adjust text size"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={settings.fontSize === "small" ? "default" : "outline"}
                size="sm"
                onClick={() => updateSettings({ fontSize: "small" })}
                data-testid="button-fontsize-small"
              >
                {t("small")}
              </Button>
              <Button
                variant={settings.fontSize === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => updateSettings({ fontSize: "medium" })}
                data-testid="button-fontsize-medium"
              >
                Medium
              </Button>
              <Button
                variant={settings.fontSize === "large" ? "default" : "outline"}
                size="sm"
                onClick={() => updateSettings({ fontSize: "large" })}
                data-testid="button-fontsize-large"
              >
                {t("large")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("notifications")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{t("notifications")}</p>
              <p className="text-sm text-muted-foreground">
                {settings.language === "ar"
                  ? "تفعيل إشعارات التذكير"
                  : "Enable reminder notifications"}
              </p>
            </div>
            <Switch
              checked={settings.notificationsEnabled}
              onCheckedChange={(checked) => updateSettings({ notificationsEnabled: checked })}
              data-testid="switch-notifications"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {t("resetData")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full" data-testid="button-reset-data">
                {t("resetData")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("resetData")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("resetConfirm")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="button-cancel-reset">{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllData} data-testid="button-confirm-reset">
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
