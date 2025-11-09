import { useLocalStorage } from "./useLocalStorage";
import type { Task } from "@shared/schema";
import { format } from "date-fns";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("namaa_tasks", []);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTodayTasks = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    return tasks.filter(task => task.dueDate.startsWith(today));
  };

  const getProgress = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayTasks = tasks.filter(task => task.dueDate.startsWith(today));
    if (todayTasks.length === 0) return 0;
    const completed = todayTasks.filter(t => t.completed).length;
    return Math.round((completed / todayTasks.length) * 100);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTodayTasks,
    getProgress,
  };
}
