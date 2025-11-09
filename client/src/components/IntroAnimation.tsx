import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 animate-fade-in-scale">
      <div className="text-center space-y-6 animate-fade-in-scale">
        <div className="relative">
          <div className="absolute inset-0 animate-shimmer" />
          <Sparkles className="w-24 h-24 mx-auto text-primary animate-pulse" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-2">
            نماء
          </h1>
          <p className="text-xl text-muted-foreground">Namaa</p>
          <p className="text-sm text-muted-foreground mt-2">Faith & Productivity Tracker</p>
        </div>
      </div>
    </div>
  );
}
