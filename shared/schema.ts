import { z } from "zod";

// Task schemas
export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Task title is required"),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(), // ISO date string
  createdAt: z.string(),
});

export const insertTaskSchema = taskSchema.omit({ id: true, createdAt: true });

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;

// Prayer schemas
export const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const prayerSchema = z.object({
  name: z.enum(prayerNames),
  completed: z.boolean(),
  date: z.string(), // ISO date string
});

export type Prayer = z.infer<typeof prayerSchema>;

export const dailyPrayersSchema = z.object({
  date: z.string(),
  prayers: z.array(prayerSchema),
});

export type DailyPrayers = z.infer<typeof dailyPrayersSchema>;

// Quran tracker schemas
export const quranPageSchema = z.object({
  pageNumber: z.number().min(1).max(5),
  completed: z.boolean(),
  date: z.string(),
});

export type QuranPage = z.infer<typeof quranPageSchema>;

export const dailyQuranSchema = z.object({
  date: z.string(),
  pages: z.array(quranPageSchema),
});

export type DailyQuran = z.infer<typeof dailyQuranSchema>;

// Lessons tracker schemas
export const lessonMetricsSchema = z.object({
  date: z.string(),
  focus: z.number().min(1).max(5), // 1-5 stars
  interaction: z.boolean(),
  homework: z.boolean(),
  mistakeReduction: z.boolean(),
  respectDiscipline: z.boolean(),
  notes: z.string().optional(),
});

export type LessonMetrics = z.infer<typeof lessonMetricsSchema>;

export const weeklyLessonsSchema = z.object({
  weekStart: z.string(), // ISO date string for Saturday
  lessons: z.array(lessonMetricsSchema),
});

export type WeeklyLessons = z.infer<typeof weeklyLessonsSchema>;

// Reminder/Alarm schemas
export const reminderSchema = z.object({
  id: z.string(),
  type: z.enum(["task", "prayer", "lesson", "custom"]),
  title: z.string(),
  time: z.string(), // HH:mm format
  enabled: z.boolean(),
  repeat: z.enum(["none", "daily", "weekly"]),
  days: z.array(z.number().min(0).max(6)).optional(), // 0=Sunday, 6=Saturday
  relatedId: z.string().optional(), // ID of related task/prayer/lesson
  createdAt: z.string(),
});

export const insertReminderSchema = reminderSchema.omit({ id: true, createdAt: true });

export type Reminder = z.infer<typeof reminderSchema>;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

// Motivational quote schemas
export const quoteSchema = z.object({
  id: z.string(),
  textEn: z.string(),
  textAr: z.string(),
  category: z.enum(["faith", "productivity", "football"]),
  isCustom: z.boolean(),
});

export const insertQuoteSchema = quoteSchema.omit({ id: true });

export type Quote = z.infer<typeof quoteSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

// User settings schemas
export const userSettingsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  language: z.enum(["en", "ar"]),
  theme: z.enum(["light", "dark"]),
  fontSize: z.enum(["small", "medium", "large"]),
  notificationsEnabled: z.boolean(),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;

// Daily intention schema
export const dailyIntentionSchema = z.object({
  date: z.string(),
  intention: z.string(),
});

export type DailyIntention = z.infer<typeof dailyIntentionSchema>;

// Progress summary for dashboard
export interface ProgressSummary {
  tasks: number;
  prayers: number;
  quran: number;
  lessons: number;
}
