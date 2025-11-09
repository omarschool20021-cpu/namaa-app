import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { useReminders } from "@/hooks/useReminders";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Bell, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReminderDialog() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { reminders, addReminder, deleteReminder, toggleReminder, requestNotificationPermission } = useReminders();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [type, setType] = useState<"task" | "prayer" | "lesson" | "custom">("custom");
  const [repeat, setRepeat] = useState<"none" | "daily" | "weekly">("daily");

  const handleAdd = async () => {
    if (!title.trim()) return;

    await requestNotificationPermission();

    addReminder({
      title,
      time,
      type,
      repeat,
      enabled: true,
      days: repeat === "weekly" ? [0, 1, 2, 3, 4, 5, 6] : undefined,
    });

    setTitle("");
    setTime("09:00");
    setType("custom");
    setRepeat("daily");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="button-open-reminders">
          <Bell className="h-4 w-4 mr-2" />
          {t("reminders")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("reminders")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-title">{t("reminderTitle")}</Label>
                <Input
                  id="reminder-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={settings.language === "ar" ? "مثال: وقت الصلاة" : "e.g., Prayer time"}
                  data-testid="input-reminder-title"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reminder-time">{t("reminderTime")}</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    data-testid="input-reminder-time"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-type">{t("reminderType")}</Label>
                  <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger id="reminder-type" data-testid="select-reminder-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="task">{t("task")}</SelectItem>
                      <SelectItem value="prayer">{t("prayer")}</SelectItem>
                      <SelectItem value="lesson">{t("lesson")}</SelectItem>
                      <SelectItem value="custom">{t("custom")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-repeat">{t("repeat")}</Label>
                <Select value={repeat} onValueChange={(v: any) => setRepeat(v)}>
                  <SelectTrigger id="reminder-repeat" data-testid="select-reminder-repeat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("none")}</SelectItem>
                    <SelectItem value="daily">{t("daily")}</SelectItem>
                    <SelectItem value="weekly">{t("weekly")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAdd} className="w-full" data-testid="button-add-reminder">
                <Plus className="h-4 w-4 mr-2" />
                {t("addReminder")}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {reminders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8" data-testid="text-no-reminders">
                {settings.language === "ar" ? "لا توجد تذكيرات" : "No reminders yet"}
              </p>
            ) : (
              reminders.map((reminder) => (
                <Card key={reminder.id} data-testid={`card-reminder-${reminder.id}`}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                      data-testid={`switch-reminder-${reminder.id}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {reminder.time} · {t(reminder.repeat)} · {t(reminder.type)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteReminder(reminder.id)}
                      data-testid={`button-delete-reminder-${reminder.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
