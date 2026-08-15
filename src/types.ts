export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type TaskCategory = 'Work' | 'Fitness' | 'Wellness' | 'Personal';

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  priority?: PriorityLevel;
  category?: TaskCategory;
  createdAt: string;
}

export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: string;
  timeString: string;
}

export interface FitnessLog {
  id: string;
  type: 'Running' | 'Walking' | 'Cycling' | 'Meditation' | 'Strength' | 'Yoga';
  durationMinutes: number;
  stepsAdded: number;
  caloriesBurned: number;
  timestamp: string;
  timeString: string;
}

export type ReminderType = 'hydration' | 'task' | 'workout' | 'general';

export interface ReminderAlarm {
  id: string;
  title: string;
  time: string; // "HH:MM" 24h format
  days: string[]; // e.g. ["Mon", "Wed", "Fri"] or ["Daily"]
  type: ReminderType;
  enabled: boolean;
  soundEnabled: boolean;
  repeatIntervalMinutes?: number; // for recurring hydration reminders, e.g. 120 mins
  lastTriggered?: string;
}

export type ThemeMode = 'light' | 'dark' | 'black' | 'white' | 'soft';

export type GoalTimeframe = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Custom';
export type GoalCategory = 'Fitness' | 'Hydration' | 'Tasks' | 'Learning' | 'Mindset' | 'Custom';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  timeframe: GoalTimeframe;
  category: GoalCategory;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate?: string;
  completed: boolean;
  streakDays?: number;
  autoSyncType?: 'steps' | 'water' | 'activeMins' | 'tasks';
}

export interface MealItem {
  id: string;
  name: string;
  calories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatsGrams?: number;
  notes?: string;
  completed?: boolean;
}

export interface DayDietPlan {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: MealItem[];
  lunch: MealItem[];
  snack: MealItem[];
  dinner: MealItem[];
}

export interface UserProfile {
  id: string;
  userName: string;
  password?: string;
  avatarUrl: string;
  timeZone?: string;
  theme?: ThemeMode;
  roleTag: string; // e.g., "Personal", "Work", "Fitness Focus"
  waterGoalMl: number;
  stepsGoal: number;
  activeMinutesGoal: number;
  tasks: Task[];
  waterLogs: WaterLog[];
  fitnessLogs: FitnessLog[];
  todaySteps: number;
  todayActiveMins: number;
  reminders: ReminderAlarm[];
  goals?: Goal[];
  dietPlan?: DayDietPlan[];
}

export interface UserSettings {
  userName: string;
  password?: string;
  avatarUrl: string;
  timeZone?: string;
  theme?: ThemeMode;
  waterGoalMl: number;
  stepsGoal: number;
  activeMinutesGoal: number;
}

export type TabType = 'dashboard' | 'goals' | 'diet' | 'tasks' | 'fitness' | 'hydration' | 'analytics' | 'reminders';

