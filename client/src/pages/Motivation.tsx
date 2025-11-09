import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { defaultQuotes } from "@/lib/quotes";
import type { Quote } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Motivation() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const stored = localStorage.getItem("namaa_custom_quotes");
    if (stored) {
      const custom = JSON.parse(stored);
      return [...defaultQuotes.map((q, i) => ({ ...q, id: `default-${i}` })), ...custom];
    }
    return defaultQuotes.map((q, i) => ({ ...q, id: `default-${i}` }));
  });

  const [currentQuote, setCurrentQuote] = useState<Quote>(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuoteEn, setNewQuoteEn] = useState("");
  const [newQuoteAr, setNewQuoteAr] = useState("");
  const [newQuoteCategory, setNewQuoteCategory] = useState<"faith" | "productivity" | "football">("faith");

  const refreshQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  const addCustomQuote = () => {
    if (!newQuoteEn.trim() || !newQuoteAr.trim()) return;

    const newQuote: Quote = {
      id: `custom-${Date.now()}`,
      textEn: newQuoteEn,
      textAr: newQuoteAr,
      category: newQuoteCategory,
      isCustom: true,
    };

    const customQuotes = [...quotes.filter(q => q.isCustom), newQuote];
    localStorage.setItem("namaa_custom_quotes", JSON.stringify(customQuotes));

    setQuotes([...quotes, newQuote]);
    setCurrentQuote(newQuote);
    setNewQuoteEn("");
    setNewQuoteAr("");
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-motivation-greeting">
          {t("motivationGreeting")}, {settings.username}!
        </h2>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 via-card to-chart-3/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t("motivationalQuote")}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshQuote}
              data-testid="button-refresh-quote"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <blockquote className={`text-2xl md:text-3xl font-medium leading-relaxed text-center py-8 ${
            settings.language === "ar" ? "font-arabic" : ""
          }`} data-testid="text-current-quote">
            "{settings.language === "ar" ? currentQuote.textAr : currentQuote.textEn}"
          </blockquote>
          <div className="text-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              currentQuote.category === "faith"
                ? "bg-primary/10 text-primary"
                : currentQuote.category === "productivity"
                ? "bg-chart-2/10 text-chart-2"
                : "bg-chart-4/10 text-chart-4"
            }`}>
              {t(currentQuote.category as any)}
            </span>
          </div>
        </CardContent>
      </Card>

      {!showAddForm ? (
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full"
          variant="outline"
          data-testid="button-show-add-quote"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addCustomQuote")}
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("addCustomQuote")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote-en">{t("quoteEn")}</Label>
              <Input
                id="quote-en"
                value={newQuoteEn}
                onChange={(e) => setNewQuoteEn(e.target.value)}
                placeholder="Enter quote in English..."
                data-testid="input-quote-en"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-ar" className="font-arabic">{t("quoteAr")}</Label>
              <Input
                id="quote-ar"
                value={newQuoteAr}
                onChange={(e) => setNewQuoteAr(e.target.value)}
                placeholder="أدخل الاقتباس بالعربية..."
                className="font-arabic"
                dir="rtl"
                data-testid="input-quote-ar"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t("category")}</Label>
              <Select value={newQuoteCategory} onValueChange={(value: "faith" | "productivity" | "football") => setNewQuoteCategory(value)}>
                <SelectTrigger id="category" data-testid="select-quote-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faith">{t("faith")}</SelectItem>
                  <SelectItem value="productivity">{t("productivity")}</SelectItem>
                  <SelectItem value="football">{t("football")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={addCustomQuote} className="flex-1" data-testid="button-save-quote">
                {t("save")}
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1"
                data-testid="button-cancel-quote"
              >
                {t("cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
