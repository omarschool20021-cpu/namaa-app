import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Flag } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task } from "@shared/schema";
import { useTasks } from "@/hooks/useTasks";

export default function Tasks() {
  const { settings } = useSettings();
  const t = (key: keyof typeof translations.en) => translations[settings.language][key];
  const { tasks, addTask: addTaskToStore, toggleTask, deleteTask } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"today" | "week">("today");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    addTaskToStore({
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
      dueDate: new Date().toISOString(),
    });

    setNewTaskTitle("");
  };

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-chart-2/10 text-chart-2",
    high: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 animate-fade-in-scale">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-tasks-greeting">
          {t("tasksGreeting")}, {settings.username}!
        </h2>
      </div>

      <Card className={settings.language === "ar" ? "font-arabic" : ""}>
        <CardHeader>
          <CardTitle>{t("addTask")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder={t("taskTitle")}
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
              data-testid="input-task-title"
            />
            <Select value={newTaskPriority} onValueChange={(value: "low" | "medium" | "high") => setNewTaskPriority(value)}>
              <SelectTrigger className="w-full sm:w-32" data-testid="select-task-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t("low")}</SelectItem>
                <SelectItem value="medium">{t("medium")}</SelectItem>
                <SelectItem value="high">{t("high")}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} data-testid="button-add-task">
              <Plus className="h-4 w-4 mr-2" />
              {t("add")}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("today")}
              data-testid="button-filter-today"
            >
              {t("today")}
            </Button>
            <Button
              variant={filter === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("week")}
              data-testid="button-filter-week"
            >
              {t("thisWeek")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground" data-testid="text-no-tasks">
              {t("noTasks")}
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              className={`transition-all hover-elevate ${task.completed ? "opacity-60" : ""}`}
              data-testid={`card-task-${task.id}`}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="animate-check-bounce"
                  data-testid={`checkbox-task-${task.id}`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`${task.completed ? "line-through text-muted-foreground" : ""} truncate`}>
                    {task.title}
                  </p>
                </div>
                <Badge className={priorityColors[task.priority]} data-testid={`badge-priority-${task.id}`}>
                  <Flag className="h-3 w-3 mr-1" />
                  {t(task.priority)}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  data-testid={`button-delete-task-${task.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
