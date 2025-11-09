import { useLocalStorage } from "./useLocalStorage";
import type { Reminder } from "@shared/schema";
import { useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";

export function useReminders() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("namaa_reminders", []);
  const { settings } = useSettings();

  const addReminder = (reminder: Omit<Reminder, "id" | "createdAt">) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setReminders([...reminders, newReminder]);
    return newReminder;
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  // Check and trigger reminders
  useEffect(() => {
    if (!settings.notificationsEnabled) return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay();

      reminders.forEach(reminder => {
        if (!reminder.enabled) return;

        const shouldTrigger = reminder.time === currentTime && (
          reminder.repeat === "daily" ||
          (reminder.repeat === "weekly" && reminder.days?.includes(currentDay)) ||
          reminder.repeat === "none"
        );

        if (shouldTrigger) {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("نماء - Namaa Reminder", {
              body: reminder.title,
              icon: "/favicon.png",
              tag: reminder.id,
            });
          }

          // If non-repeating, disable after triggering
          if (reminder.repeat === "none") {
            updateReminder(reminder.id, { enabled: false });
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders, settings.notificationsEnabled]);

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    return reminders
      .filter(r => r.enabled && r.time > currentTime)
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 3);
  };

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleReminder,
    requestNotificationPermission,
    getUpcomingReminders,
  };
}
