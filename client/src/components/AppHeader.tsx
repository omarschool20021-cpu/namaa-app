import { Moon, Sun, Languages, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const { settings, updateSettings } = useSettings();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === "light" ? "dark" : "light" });
  };

  const toggleLanguage = () => {
    updateSettings({ language: settings.language === "en" ? "ar" : "en" });
  };

  const t = (key: keyof typeof translations.en) => translations[settings.language][key];

  const navItems = [
    { path: "/", label: t("dashboard") },
    { path: "/tasks", label: t("tasks") },
    { path: "/prayers", label: t("prayers") },
    { path: "/quran", label: t("quran") },
    { path: "/lessons", label: t("lessons") },
    { path: "/weekly", label: t("weeklyOverview") },
    { path: "/motivation", label: t("motivation") },
    { path: "/settings", label: t("settings") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 transition-colors">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {settings.language === "ar" ? "نماء" : "Namaa"}
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  data-testid={`link-nav-${item.path.slice(1) || "dashboard"}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            data-testid="button-toggle-language"
            title={settings.language === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            <Languages className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-toggle-theme"
            title={settings.theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {settings.theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.path}
                  onClick={() => {
                    setLocation(item.path);
                    setMobileMenuOpen(false);
                  }}
                  data-testid={`link-mobile-${item.path.slice(1) || "dashboard"}`}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
