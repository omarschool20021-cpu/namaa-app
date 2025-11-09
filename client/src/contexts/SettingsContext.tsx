import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { UserSettings } from "@shared/schema";

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  username: "Omar",
  language: "en",
  theme: "light",
  fontSize: "medium",
  notificationsEnabled: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const stored = localStorage.getItem("namaa_settings");
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("namaa_settings", JSON.stringify(settings));
    
    // Apply theme
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Apply direction
    document.documentElement.dir = settings.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = settings.language;
    
    // Apply font size
    const fontSize = {
      small: "14px",
      medium: "16px",
      large: "18px",
    }[settings.fontSize];
    document.documentElement.style.fontSize = fontSize;
  }, [settings]);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
