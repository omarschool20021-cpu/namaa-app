import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ProgressCardProps {
  title: string;
  progress: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function ProgressCard({ title, progress, icon: Icon, iconColor = "text-primary" }: ProgressCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-progress-${title.toLowerCase()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2" data-testid={`text-progress-value-${title.toLowerCase()}`}>
          {progress}%
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
    </Card>
  );
}
