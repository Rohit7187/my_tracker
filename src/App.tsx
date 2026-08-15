import React, { useState, useEffect } from 'react';
import {
  TabType,
  Task,
  WaterLog,
  FitnessLog,
  UserSettings,
  PriorityLevel,
  TaskCategory,
  UserProfile,
  ReminderAlarm,
  ThemeMode,
  Goal,
  DayDietPlan,
  MealItem,
} from './types';
import { initialProfiles, initialGoals, initialDietPlan } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { GoalsView } from './components/GoalsView';
import { DietView } from './components/DietView';
import { TasksView } from './components/TasksView';
import { FitnessView } from './components/FitnessView';
import { HydrationView } from './components/HydrationView';
import { AnalyticsView } from './components/AnalyticsView';
import { RemindersView } from './components/RemindersView';
import { AddTaskModal } from './components/AddTaskModal';
import { AddGoalModal } from './components/AddGoalModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal';
import { AlarmTriggerModal } from './components/AlarmTriggerModal';
import { LoginModal } from './components/LoginModal';
import { MotivationalQuoteBanner } from './components/MotivationalQuoteBanner';
import { OpeningQuoteModal } from './components/OpeningQuoteModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Load profiles from localStorage or initial profiles
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('personal_tracker_profiles_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: UserProfile) => ({ ...p, timeZone: p.timeZone || 'Asia/Kolkata' }));
        }
      } catch (err) {
        console.error('Error loading saved profiles:', err);
      }
    }
    return initialProfiles;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const saved = localStorage.getItem('personal_tracker_active_profile_id_v7');
    if (saved && profiles.some((p) => p.id === saved)) {
      return saved;
    }
    return profiles[0]?.id || initialProfiles[0].id;
  });

  // Modal States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(false);
  const [isOpeningQuoteOpen, setIsOpeningQuoteOpen] = useState(true);
  const [triggeredAlarm, setTriggeredAlarm] = useState<ReminderAlarm | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  // Sync Profiles to localStorage
  useEffect(() => {
    localStorage.setItem('personal_tracker_profiles_v7', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('personal_tracker_active_profile_id_v7', activeProfileId);
  }, [activeProfileId]);

  // Find active profile
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Helper to update active profile in state
  const updateActiveProfile = (updater: (prevProfile: UserProfile) => UserProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeProfile.id ? updater(p) : p))
    );
  };

  // Convert activeProfile to UserSettings format for existing modals
  const activeUserSettings: UserSettings = {
    userName: activeProfile.userName,
    password: activeProfile.password,
    avatarUrl: activeProfile.avatarUrl,
    timeZone: activeProfile.timeZone || 'Asia/Kolkata',
    theme: activeProfile.theme || 'soft',
    waterGoalMl: activeProfile.waterGoalMl,
    stepsGoal: activeProfile.stepsGoal,
    activeMinutesGoal: activeProfile.activeMinutesGoal,
  };

  // Sync theme to root element
  useEffect(() => {
    const currentTheme = activeProfile.theme || 'soft';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'black' || currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [activeProfile.theme]);

  const handleToggleTheme = () => {
    const themes: ThemeMode[] = ['black', 'white', 'soft'];
    const currentTheme = activeProfile.theme || 'soft';
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    updateActiveProfile((p) => ({ ...p, theme: nextTheme }));
  };

  // Real-time Alarm Monitor Check
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHH = String(now.getHours()).padStart(2, '0');
      const currentMM = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${currentHH}:${currentMM}`;

      activeProfile.reminders.forEach((r) => {
        if (r.enabled && r.time === timeStr && r.lastTriggered !== timeStr) {
          setTriggeredAlarm(r);
          // Mark triggered time
          updateActiveProfile((p) => ({
            ...p,
            reminders: p.reminders.map((rem) =>
              rem.id === r.id ? { ...rem, lastTriggered: timeStr } : rem
            ),
          }));
        }
      });
    };

    const interval = setInterval(checkAlarms, 10000); // Check every 10 sec
    return () => clearInterval(interval);
  }, [activeProfile, updateActiveProfile]);

  // Profile Management Handlers
  const handleCreateProfile = (profileData: {
    userName: string;
    password?: string;
    roleTag: string;
    avatarUrl: string;
    waterGoalMl: number;
    stepsGoal: number;
    activeMinutesGoal: number;
  }) => {
    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      userName: profileData.userName,
      password: profileData.password,
      roleTag: profileData.roleTag,
      avatarUrl: profileData.avatarUrl,
      waterGoalMl: profileData.waterGoalMl,
      stepsGoal: profileData.stepsGoal,
      activeMinutesGoal: profileData.activeMinutesGoal,
      tasks: [
        {
          id: `t-${Date.now()}-1`,
          title: 'Welcome to your new profile!',
          completed: false,
          category: 'Personal',
          createdAt: new Date().toISOString(),
        },
      ],
      waterLogs: [],
      fitnessLogs: [],
      todaySteps: 0,
      todayActiveMins: 0,
      reminders: [
        {
          id: `rem-${Date.now()}`,
          title: 'Hydration Intake Alert',
          time: '10:00',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'hydration',
          enabled: true,
          soundEnabled: true,
        },
      ],
    };

    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (profiles.length <= 1) return;
    const remaining = profiles.filter((p) => p.id !== profileId);
    setProfiles(remaining);
    if (activeProfileId === profileId) {
      setActiveProfileId(remaining[0].id);
    }
  };

  // Task Handlers
  const handleToggleTask = (taskId: string) => {
    updateActiveProfile((p) => {
      const updatedTasks = p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const completedCount = updatedTasks.filter((t) => t.completed).length;

      // Auto sync tasks goals
      const updatedGoals = (p.goals || initialGoals).map((g) => {
        if (g.autoSyncType === 'tasks') {
          return {
            ...g,
            currentValue: completedCount,
            completed: completedCount >= g.targetValue,
          };
        }
        return g;
      });

      return {
        ...p,
        tasks: updatedTasks,
        goals: updatedGoals,
      };
    });
  };

  const handleDeleteTask = (taskId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      tasks: p.tasks.filter((t) => t.id !== taskId),
    }));
  };

  const handleAddTask = (taskData: {
    title: string;
    subtitle?: string;
    priority?: PriorityLevel;
    category: TaskCategory;
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      subtitle: taskData.subtitle,
      completed: false,
      priority: taskData.priority,
      category: taskData.category,
      createdAt: new Date().toISOString(),
    };
    updateActiveProfile((p) => ({
      ...p,
      tasks: [newTask, ...p.tasks],
    }));
  };

  // Hydration Handlers
  const handleAddWater = (amountMl: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog: WaterLog = {
      id: `w-${Date.now()}`,
      amountMl,
      timestamp: now.toISOString(),
      timeString,
    };
    updateActiveProfile((p) => {
      const updatedWaterLogs = [newLog, ...p.waterLogs];
      const newTotalWater = updatedWaterLogs.reduce((acc, log) => acc + log.amountMl, 0);

      // Auto sync water goals
      const updatedGoals = (p.goals || initialGoals).map((g) => {
        if (g.autoSyncType === 'water') {
          return {
            ...g,
            currentValue: newTotalWater,
            completed: newTotalWater >= g.targetValue,
          };
        }
        return g;
      });

      return {
        ...p,
        waterLogs: updatedWaterLogs,
        goals: updatedGoals,
      };
    });
  };

  const handleDeleteWaterLog = (id: string) => {
    updateActiveProfile((p) => ({
      ...p,
      waterLogs: p.waterLogs.filter((w) => w.id !== id),
    }));
  };

  // Fitness Handlers
  const handleAddFitnessLog = (logData: Omit<FitnessLog, 'id' | 'timestamp' | 'timeString'>) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog: FitnessLog = {
      ...logData,
      id: `f-${Date.now()}`,
      timestamp: now.toISOString(),
      timeString,
    };
    updateActiveProfile((p) => {
      const newSteps = p.todaySteps + logData.stepsAdded;
      const newMins = p.todayActiveMins + logData.durationMinutes;

      // Auto sync step & active mins goals
      const updatedGoals = (p.goals || initialGoals).map((g) => {
        if (g.autoSyncType === 'steps') {
          return { ...g, currentValue: newSteps, completed: newSteps >= g.targetValue };
        }
        if (g.autoSyncType === 'activeMins') {
          return { ...g, currentValue: newMins, completed: newMins >= g.targetValue };
        }
        return g;
      });

      return {
        ...p,
        fitnessLogs: [newLog, ...p.fitnessLogs],
        todaySteps: newSteps,
        todayActiveMins: newMins,
        goals: updatedGoals,
      };
    });
  };

  const handleAddSteps = (steps: number) => {
    updateActiveProfile((p) => {
      const newSteps = p.todaySteps + steps;
      const updatedGoals = (p.goals || initialGoals).map((g) => {
        if (g.autoSyncType === 'steps') {
          return { ...g, currentValue: newSteps, completed: newSteps >= g.targetValue };
        }
        return g;
      });
      return {
        ...p,
        todaySteps: newSteps,
        goals: updatedGoals,
      };
    });
  };

  const handleAddActiveMins = (mins: number) => {
    updateActiveProfile((p) => {
      const newMins = p.todayActiveMins + mins;
      const updatedGoals = (p.goals || initialGoals).map((g) => {
        if (g.autoSyncType === 'activeMins') {
          return { ...g, currentValue: newMins, completed: newMins >= g.targetValue };
        }
        return g;
      });
      return {
        ...p,
        todayActiveMins: newMins,
        goals: updatedGoals,
      };
    });
  };

  // Goal Handlers
  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'startDate' | 'completed'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      startDate: new Date().toISOString(),
      completed: goalData.currentValue >= goalData.targetValue,
    };
    updateActiveProfile((p) => ({
      ...p,
      goals: [newGoal, ...(p.goals || initialGoals)],
    }));
  };

  const handleUpdateGoalProgress = (goalId: string, addedValue: number) => {
    updateActiveProfile((p) => ({
      ...p,
      goals: (p.goals || initialGoals).map((g) => {
        if (g.id !== goalId) return g;
        const newCurrent = Math.max(0, g.currentValue + addedValue);
        return {
          ...g,
          currentValue: newCurrent,
          completed: newCurrent >= g.targetValue,
        };
      }),
    }));
  };

  const handleToggleGoalComplete = (goalId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      goals: (p.goals || initialGoals).map((g) =>
        g.id === goalId ? { ...g, completed: !g.completed } : g
      ),
    }));
  };

  const handleDeleteGoal = (goalId: string) => {
    updateActiveProfile((p) => ({
      ...p,
      goals: (p.goals || initialGoals).filter((g) => g.id !== goalId),
    }));
  };

  // Diet Handlers
  const handleToggleMeal = (
    day: DayDietPlan['day'],
    section: 'breakfast' | 'lunch' | 'snack' | 'dinner',
    mealId: string
  ) => {
    updateActiveProfile((p) => {
      const currentDiet = p.dietPlan || initialDietPlan;
      const updatedDiet = currentDiet.map((d) => {
        if (d.day !== day) return d;
        return {
          ...d,
          [section]: d[section].map((m) =>
            m.id === mealId ? { ...m, completed: !m.completed } : m
          ),
        };
      });
      return { ...p, dietPlan: updatedDiet };
    });
  };

  const handleAddMeal = (
    day: DayDietPlan['day'],
    section: 'breakfast' | 'lunch' | 'snack' | 'dinner',
    mealData: Omit<MealItem, 'id'>
  ) => {
    const newMeal: MealItem = {
      ...mealData,
      id: `meal-${Date.now()}`,
    };
    updateActiveProfile((p) => {
      const currentDiet = p.dietPlan || initialDietPlan;
      const updatedDiet = currentDiet.map((d) => {
        if (d.day !== day) return d;
        return {
          ...d,
          [section]: [...d[section], newMeal],
        };
      });
      return { ...p, dietPlan: updatedDiet };
    });
  };

  const handleDeleteMeal = (
    day: DayDietPlan['day'],
    section: 'breakfast' | 'lunch' | 'snack' | 'dinner',
    mealId: string
  ) => {
    updateActiveProfile((p) => {
      const currentDiet = p.dietPlan || initialDietPlan;
      const updatedDiet = currentDiet.map((d) => {
        if (d.day !== day) return d;
        return {
          ...d,
          [section]: d[section].filter((m) => m.id !== mealId),
        };
      });
      return { ...p, dietPlan: updatedDiet };
    });
  };

  const handleResetDayChecks = (day: DayDietPlan['day']) => {
    updateActiveProfile((p) => {
      const currentDiet = p.dietPlan || initialDietPlan;
      const updatedDiet = currentDiet.map((d) => {
        if (d.day !== day) return d;
        return {
          ...d,
          breakfast: d.breakfast.map((m) => ({ ...m, completed: false })),
          lunch: d.lunch.map((m) => ({ ...m, completed: false })),
          snack: d.snack.map((m) => ({ ...m, completed: false })),
          dinner: d.dinner.map((m) => ({ ...m, completed: false })),
        };
      });
      return { ...p, dietPlan: updatedDiet };
    });
  };

  // Export Data Backup (JSON)
  const handleExportData = () => {
    const backupObj = {
      version: '7.0',
      exportedAt: new Date().toISOString(),
      profiles: profiles,
      activeProfileId: activeProfileId,
    };
    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import Data Backup (JSON)
  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && Array.isArray(parsed.profiles)) {
          setProfiles(parsed.profiles);
          if (parsed.activeProfileId && parsed.profiles.some((p: any) => p.id === parsed.activeProfileId)) {
            setActiveProfileId(parsed.activeProfileId);
          } else {
            setActiveProfileId(parsed.profiles[0].id);
          }
          alert('Data backup successfully restored!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Alarm & Reminder Handlers
  const handleAddReminder = (reminderData: Omit<ReminderAlarm, 'id'>) => {
    const newRem: ReminderAlarm = {
      ...reminderData,
      id: `rem-${Date.now()}`,
    };
    updateActiveProfile((p) => ({
      ...p,
      reminders: [newRem, ...p.reminders],
    }));
  };

  const handleToggleReminder = (id: string) => {
    updateActiveProfile((p) => ({
      ...p,
      reminders: p.reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    }));
  };

  const handleDeleteReminder = (id: string) => {
    updateActiveProfile((p) => ({
      ...p,
      reminders: p.reminders.filter((r) => r.id !== id),
    }));
  };

  // Settings Handler
  const handleSaveSettings = (newSettings: UserSettings) => {
    updateActiveProfile((p) => ({
      ...p,
      userName: newSettings.userName,
      password: newSettings.password,
      avatarUrl: newSettings.avatarUrl,
      timeZone: newSettings.timeZone,
      theme: newSettings.theme,
      waterGoalMl: newSettings.waterGoalMl,
      stepsGoal: newSettings.stepsGoal,
      activeMinutesGoal: newSettings.activeMinutesGoal,
    }));
  };

  const handleResetData = () => {
    setProfiles(initialProfiles);
    setActiveProfileId(initialProfiles[0].id);
    localStorage.clear();
  };

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] min-h-screen flex flex-col antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeProfile={activeProfile}
        onOpenProfileSwitcher={() => setIsProfileSwitcherOpen(true)}
      />

      {/* Main Area */}
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-12 w-full max-w-[1600px] mx-auto min-h-screen pb-24 md:pb-12">
        <Header
          activeTab={activeTab}
          activeProfile={activeProfile}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProfileSwitcher={() => setIsProfileSwitcherOpen(true)}
          onOpenReminders={() => setActiveTab('reminders')}
          onOpenOpeningQuote={() => setIsOpeningQuoteOpen(true)}
          onToggleTheme={handleToggleTheme}
        />

        {/* Cristiano Ronaldo & Virat Kohli Heading Motivational Banner */}
        <MotivationalQuoteBanner />

        {activeTab === 'dashboard' && (
          <DashboardView
            tasks={activeProfile.tasks}
            onToggleTask={handleToggleTask}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
            waterLogs={activeProfile.waterLogs}
            onAddWater={handleAddWater}
            userSettings={activeUserSettings}
            todaySteps={activeProfile.todaySteps}
            todayActiveMins={activeProfile.todayActiveMins}
            onAddSteps={handleAddSteps}
            onAddActiveMins={handleAddActiveMins}
            goals={activeProfile.goals || initialGoals}
            onOpenGoals={() => setActiveTab('goals')}
            dietPlan={activeProfile.dietPlan || initialDietPlan}
            onToggleMeal={handleToggleMeal}
            onOpenDiet={() => setActiveTab('diet')}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsView
            goals={activeProfile.goals || initialGoals}
            onAddGoalClick={() => setIsAddGoalOpen(true)}
            onUpdateGoalProgress={handleUpdateGoalProgress}
            onToggleGoalComplete={handleToggleGoalComplete}
            onDeleteGoal={handleDeleteGoal}
          />
        )}

        {activeTab === 'diet' && (
          <DietView
            dietPlan={activeProfile.dietPlan || initialDietPlan}
            onToggleMeal={handleToggleMeal}
            onAddMeal={handleAddMeal}
            onDeleteMeal={handleDeleteMeal}
            onResetDayChecks={handleResetDayChecks}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView
            tasks={activeProfile.tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
          />
        )}

        {activeTab === 'fitness' && (
          <FitnessView
            logs={activeProfile.fitnessLogs}
            todaySteps={activeProfile.todaySteps}
            todayActiveMins={activeProfile.todayActiveMins}
            userSettings={activeUserSettings}
            onAddFitnessLog={handleAddFitnessLog}
            onAddSteps={handleAddSteps}
            onAddActiveMins={handleAddActiveMins}
          />
        )}

        {activeTab === 'hydration' && (
          <HydrationView
            logs={activeProfile.waterLogs}
            userSettings={activeUserSettings}
            onAddWater={handleAddWater}
            onDeleteWaterLog={handleDeleteWaterLog}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersView
            reminders={activeProfile.reminders}
            onAddReminder={handleAddReminder}
            onToggleReminder={handleToggleReminder}
            onDeleteReminder={handleDeleteReminder}
            activeProfileName={activeProfile.userName}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            tasks={activeProfile.tasks}
            waterLogs={activeProfile.waterLogs}
            fitnessLogs={activeProfile.fitnessLogs}
            todaySteps={activeProfile.todaySteps}
            todayActiveMins={activeProfile.todayActiveMins}
            userSettings={activeUserSettings}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />

      <AddGoalModal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        onAddGoal={handleAddGoal}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userSettings={activeUserSettings}
        onSaveSettings={handleSaveSettings}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      <ProfileSwitcherModal
        isOpen={isProfileSwitcherOpen}
        onClose={() => setIsProfileSwitcherOpen(false)}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={(id) => setActiveProfileId(id)}
        onCreateProfile={handleCreateProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      {/* Alarm Alert Trigger Modal */}
      <AlarmTriggerModal
        alarm={triggeredAlarm}
        profileName={activeProfile.userName}
        onDismiss={() => setTriggeredAlarm(null)}
        onSnooze={() => setTriggeredAlarm(null)}
      />

      {/* Password Authentication / Unlock Modal */}
      <LoginModal
        isOpen={isLocked && Boolean(activeProfile.password)}
        userName={activeProfile.userName}
        expectedPassword={activeProfile.password}
        onUnlock={() => setIsLocked(false)}
      />

      {/* Everyday Opening Motivational Quote Modal */}
      <OpeningQuoteModal
        isOpen={isOpeningQuoteOpen && !isLocked}
        onClose={() => setIsOpeningQuoteOpen(false)}
        userName={activeProfile.userName}
      />
    </div>
  );
}
