import React from 'react';
import { Task, WaterLog, FitnessLog, UserSettings } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, CheckCircle, Flame, Droplets, Award } from 'lucide-react';

interface AnalyticsViewProps {
  tasks: Task[];
  waterLogs: WaterLog[];
  fitnessLogs: FitnessLog[];
  todaySteps: number;
  todayActiveMins: number;
  userSettings: UserSettings;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  tasks,
  waterLogs,
  todaySteps,
  todayActiveMins,
  userSettings,
}) => {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 100;

  const totalWaterMl = waterLogs.reduce((acc, l) => acc + l.amountMl, 0);
  const waterRate = Math.min(100, Math.round((totalWaterMl / userSettings.waterGoalMl) * 100));

  const stepsRate = Math.min(100, Math.round((todaySteps / userSettings.stepsGoal) * 100));

  const wellnessScore = Math.round((taskCompletionRate + waterRate + stepsRate) / 3);

  // Mock weekly historical data for Recharts visualization
  const weeklyTaskData = [
    { day: 'Mon', completed: 4, total: 5 },
    { day: 'Tue', completed: 5, total: 6 },
    { day: 'Wed', completed: 3, total: 4 },
    { day: 'Thu', completed: 6, total: 6 },
    { day: 'Fri', completed: 4, total: 5 },
    { day: 'Sat', completed: 2, total: 3 },
    { day: 'Today', completed: completedTasks, total: tasks.length },
  ];

  const weeklyWaterData = [
    { day: 'Mon', waterLiters: 2.2, target: 2.5 },
    { day: 'Tue', waterLiters: 2.5, target: 2.5 },
    { day: 'Wed', waterLiters: 2.1, target: 2.5 },
    { day: 'Thu', waterLiters: 2.8, target: 2.5 },
    { day: 'Fri', waterLiters: 2.4, target: 2.5 },
    { day: 'Sat', waterLiters: 1.9, target: 2.5 },
    { day: 'Today', waterLiters: Number((totalWaterMl / 1000).toFixed(1)), target: userSettings.waterGoalMl / 1000 },
  ];

  const weeklyActivityData = [
    { day: 'Mon', steps: 8200 },
    { day: 'Tue', steps: 9400 },
    { day: 'Wed', steps: 7100 },
    { day: 'Thu', steps: 10500 },
    { day: 'Fri', steps: 8800 },
    { day: 'Sat', steps: 5200 },
    { day: 'Today', steps: todaySteps },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Wellness Score Header Card */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-[#dae1ff] text-[#003fa4] rounded-full text-xs font-bold uppercase tracking-wider">
            Overview Summary
          </span>
          <h2 className="text-2xl font-extrabold text-[#111c2d]">Overall Wellness Score</h2>
          <p className="text-sm text-[#424656]">
            Calculated from your focus task completions, hydration intake, and step activity.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#f0f3ff] p-4 rounded-2xl border border-[#dee8ff]">
          <div className="w-16 h-16 rounded-full bg-[#0066ff] text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {wellnessScore}%
          </div>
          <div>
            <span className="block text-sm font-bold text-[#111c2d]">
              {wellnessScore >= 80 ? 'Optimal Performance' : wellnessScore >= 50 ? 'Steady Progress' : 'Keep Going!'}
            </span>
            <span className="block text-xs text-[#5c5f61]">Daily Score Average</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5c5f61] uppercase">Task Focus Rate</span>
            <CheckCircle className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-2xl font-bold text-[#111c2d]">{taskCompletionRate}%</div>
          <span className="text-xs text-[#424656]">{completedTasks} of {tasks.length} tasks completed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5c5f61] uppercase">Hydration Target</span>
            <Droplets className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-2xl font-bold text-[#111c2d]">{waterRate}%</div>
          <span className="text-xs text-[#424656]">{(totalWaterMl / 1000).toFixed(1)}L of {(userSettings.waterGoalMl / 1000).toFixed(1)}L</span>
        </div>

        <div className="bg-white p-5 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5c5f61] uppercase">Step Goal Progress</span>
            <Flame className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-2xl font-bold text-[#111c2d]">{stepsRate}%</div>
          <span className="text-xs text-[#424656]">{todaySteps.toLocaleString()} of {userSettings.stepsGoal.toLocaleString()} steps</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Task Completion Chart */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <h3 className="text-base font-bold text-[#111c2d] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0050cb]" /> Weekly Task Completion
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTaskData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3ff" />
                <XAxis dataKey="day" stroke="#5c5f61" fontSize={12} tickLine={false} />
                <YAxis stroke="#5c5f61" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#dee8ff' }}
                />
                <Bar dataKey="completed" fill="#0066ff" radius={[6, 6, 0, 0]} name="Completed Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Water Intake Chart */}
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <h3 className="text-base font-bold text-[#111c2d] mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#0050cb]" /> Weekly Hydration (Liters)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyWaterData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3ff" />
                <XAxis dataKey="day" stroke="#5c5f61" fontSize={12} tickLine={false} />
                <YAxis stroke="#5c5f61" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#dee8ff' }}
                />
                <Line
                  type="monotone"
                  dataKey="waterLiters"
                  stroke="#0066ff"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0066ff' }}
                  name="Intake (L)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#c2c6d8"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                  name="Daily Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
