import React, { useState } from 'react';
import { Calendar, Droplets, Activity, Plus, Check, Target, Flame, ChevronRight, Award, Utensils, Coffee, Sun, Apple, Moon } from 'lucide-react';
import { Task, WaterLog, UserSettings, Goal, DayDietPlan } from '../types';
import { WaterShaderCanvas } from './WaterShaderCanvas';
import { ActivityPulse3D } from './ActivityPulse3D';

interface DashboardViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onOpenAddTask: () => void;
  waterLogs: WaterLog[];
  onAddWater: (amountMl: number) => void;
  userSettings: UserSettings;
  todaySteps: number;
  todayActiveMins: number;
  onAddSteps: (steps: number) => void;
  onAddActiveMins: (mins: number) => void;
  goals?: Goal[];
  onOpenGoals?: () => void;
  dietPlan?: DayDietPlan[];
  onToggleMeal?: (day: DayDietPlan['day'], section: 'breakfast' | 'lunch' | 'snack' | 'dinner', mealId: string) => void;
  onOpenDiet?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  onToggleTask,
  onOpenAddTask,
  waterLogs,
  onAddWater,
  userSettings,
  todaySteps,
  todayActiveMins,
  onAddSteps,
  onAddActiveMins,
  goals = [],
  onOpenGoals,
  dietPlan = [],
  onToggleMeal,
  onOpenDiet,
}) => {
  const [showWaterMenu, setShowWaterMenu] = useState(false);

  // Determine current day for diet
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayDietPlan['day'];
  const todayDiet = dietPlan.find((d) => d.day === todayName) || dietPlan[0];

  // Focus tasks (first 4 for dashboard display)
  const focusTasks = tasks.slice(0, 4);
  const remainingCount = tasks.filter((t) => !t.completed).length;

  // Hydration calculation
  const totalWaterMl = waterLogs.reduce((acc, log) => acc + log.amountMl, 0);
  const waterLiters = (totalWaterMl / 1000).toFixed(1);
  const targetLiters = (userSettings.waterGoalMl / 1000).toFixed(1);
  const waterPercent = Math.min(
    Math.round((totalWaterMl / userSettings.waterGoalMl) * 100),
    100
  );

  // Activity calculation
  const stepsPercent = Math.min(
    Math.round((todaySteps / userSettings.stepsGoal) * 100),
    100
  );

  // Goals summary
  const dailyGoals = goals.filter((g) => g.timeframe === 'Daily');
  const weeklyGoals = goals.filter((g) => g.timeframe === 'Weekly');
  const monthlyGoals = goals.filter((g) => g.timeframe === 'Monthly');
  const yearlyGoals = goals.filter((g) => g.timeframe === 'Yearly' || g.timeframe === 'Custom');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      {/* 0. Multi-Timeframe Goals Spotlight Banner (Span 12) */}
      <section className="col-span-1 md:col-span-12 bg-gradient-to-r from-[#002b70] to-[#0066ff] text-white rounded-2xl p-5 md:p-6 card-shadow shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[#ffd700] text-[10px] font-extrabold uppercase tracking-widest border border-white/20">
              Goal Tracking Active
            </span>
            <span className="text-xs text-[#dae1ff] font-semibold">
              Daily • Weekly • Monthly • Yearly Targets
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-[#ffd700]" /> Active Goal Milestones
          </h2>
          <p className="text-xs text-[#dae1ff] max-w-2xl">
            Auto-syncing your step counts, water intake, active workout minutes, and task completions in real-time.
          </p>
        </div>

        {/* Goals Quick Stats Grid */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
            <Flame className="w-4 h-4 text-amber-400 fill-current" />
            <div className="text-left">
              <span className="block text-[10px] text-white/80 uppercase font-bold">Daily</span>
              <span className="text-xs font-black">{dailyGoals.length} Goals</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
            <Award className="w-4 h-4 text-indigo-300" />
            <div className="text-left">
              <span className="block text-[10px] text-white/80 uppercase font-bold">Weekly</span>
              <span className="text-xs font-black">{weeklyGoals.length} Goals</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/15">
            <Target className="w-4 h-4 text-emerald-300" />
            <div className="text-left">
              <span className="block text-[10px] text-white/80 uppercase font-bold">Monthly</span>
              <span className="text-xs font-black">{monthlyGoals.length} Goals</span>
            </div>
          </div>

          {onOpenGoals && (
            <button
              onClick={onOpenGoals}
              className="px-4 py-2.5 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-[#002b70] font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm ml-auto md:ml-0"
            >
              Goal Hub <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>
      {/* 1. Daily Focus (Top Left - Span 7) */}
      <section className="col-span-1 md:col-span-7 bg-white rounded-2xl p-6 card-shadow border border-transparent hover:border-[#dee8ff] transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-bold text-[#111c2d] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0050cb]" /> Daily Focus
            </h2>
            <span className="px-3 py-1 bg-[#dae1ff] text-[#003fa4] rounded-full font-semibold text-[13px]">
              {remainingCount} Left
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {focusTasks.length === 0 ? (
              <p className="text-sm text-[#5c5f61] italic py-4">No tasks remaining. Add a new task!</p>
            ) : (
              focusTasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#f0f3ff] transition-colors cursor-pointer group"
                >
                  <div className="relative flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(task.id)}
                      className="w-6 h-6 rounded-md border-[#c2c6d8] text-[#0050cb] focus:ring-[#0050cb] bg-white transition-all cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`block text-[16px] leading-6 font-medium text-[#111c2d] transition-all ${
                        task.completed ? 'line-through opacity-60' : 'group-hover:text-[#0050cb]'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.subtitle && (
                      <span className="block text-[14px] text-[#424656] mt-0.5">
                        {task.subtitle}
                      </span>
                    )}
                  </div>
                  {task.priority === 'High' && (
                    <span className="px-2.5 py-0.5 bg-[#ffdad6] text-[#93000a] rounded-md font-semibold text-[12px] flex-shrink-0">
                      High
                    </span>
                  )}
                </label>
              ))
            )}
          </div>
        </div>

        <button
          onClick={onOpenAddTask}
          className="mt-6 w-full py-3 rounded-xl bg-[#e7eeff] text-[#0050cb] font-semibold text-[14px] hover:bg-[#dee8ff] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Task
        </button>
      </section>

      {/* 2. Hydration Widget (Top Right - Span 5) */}
      <section className="col-span-1 md:col-span-5 bg-white rounded-2xl p-6 card-shadow border border-transparent hover:border-[#dee8ff] transition-all relative overflow-hidden flex flex-col justify-between min-h-[320px]">
        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#111c2d] flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#0050cb]" /> Hydration
          </h2>
          <span className="text-[28px] font-bold text-[#0050cb]">
            {waterLiters}L <span className="text-[16px] font-normal text-[#424656]">/ {targetLiters}L</span>
          </span>
        </div>

        {/* WebGL Animated Water Canvas Background */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 opacity-80 pointer-events-none rounded-b-2xl overflow-hidden">
          <WaterShaderCanvas waterPercentage={waterPercent} />
        </div>

        {/* Quick Add Controls */}
        <div className="relative z-10 mt-auto flex justify-between items-end pt-8">
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => onAddWater(250)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0050cb] hover:bg-[#f0f3ff] transition-all border border-[#c2c6d8]/40 active:scale-95 cursor-pointer"
              title="Add 250ml water"
            >
              <Plus className="w-5 h-5" />
            </button>
            <span className="text-[12px] font-semibold text-[#424656] bg-white/90 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#c2c6d8]/30 shadow-xs">
              +250ml
            </span>

            {/* Additional Quick Add Amounts dropdown trigger */}
            <button
              onClick={() => setShowWaterMenu(!showWaterMenu)}
              className="text-[11px] font-bold text-[#0050cb] underline hover:text-[#001849] ml-1 bg-white/80 px-2 py-0.5 rounded cursor-pointer"
            >
              {showWaterMenu ? 'Hide' : 'More'}
            </button>

            {showWaterMenu && (
              <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-lg border border-[#dee8ff] p-2 flex gap-1 z-30 animate-fade-in">
                {[100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      onAddWater(amt);
                      setShowWaterMenu(false);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#e7eeff] text-[#0050cb] hover:bg-[#0066ff] hover:text-white transition-colors"
                  >
                    +{amt}ml
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-xs border border-[#c2c6d8]/30">
            <span className="text-[13px] font-semibold text-[#111c2d]">
              {waterPercent}% Daily Goal
            </span>
          </div>
        </div>
      </section>

      {/* 3. Activity Pulse (Bottom - Span 12) */}
      <section className="col-span-1 md:col-span-12 bg-white rounded-2xl p-6 card-shadow border border-transparent hover:border-[#dee8ff] transition-all flex flex-col md:flex-row gap-6 items-center min-h-[350px]">
        <div className="flex-1 flex flex-col justify-center gap-6 w-full md:w-1/3">
          <h2 className="text-[20px] font-bold text-[#111c2d] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0050cb]" /> Activity Pulse
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f0f3ff]">
              <span className="block text-[12px] font-semibold text-[#424656] mb-1">
                Steps Today
              </span>
              <span className="block text-[28px] font-bold text-[#111c2d]">
                {todaySteps.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f0f3ff]">
              <span className="block text-[12px] font-semibold text-[#424656] mb-1">
                Active Minutes
              </span>
              <span className="block text-[28px] font-bold text-[#111c2d]">
                {todayActiveMins}<span className="text-[16px] text-[#424656] font-normal">m</span>
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] font-semibold text-[#424656]">
                Daily Goal Progress
              </span>
              <span className="text-[14px] font-bold text-[#0050cb]">
                {stepsPercent}%
              </span>
            </div>
            {/* Custom Progress Bar */}
            <div className="w-full h-2 bg-[#e7eeff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0066ff] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${stepsPercent}%` }}
              />
            </div>
          </div>

          {/* Quick activity additions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onAddSteps(500)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#f0f3ff] text-[12px] font-semibold text-[#0050cb] hover:bg-[#dee8ff] transition-colors cursor-pointer"
            >
              +500 Steps
            </button>
            <button
              onClick={() => onAddActiveMins(15)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#f0f3ff] text-[12px] font-semibold text-[#0050cb] hover:bg-[#dee8ff] transition-colors cursor-pointer"
            >
              +15 Mins
            </button>
          </div>
        </div>

        {/* 3D Walking Pulse Scene */}
        <div className="w-full md:w-2/3 h-64 md:h-full min-h-[260px] rounded-xl bg-[#f0f3ff] relative overflow-hidden flex items-center justify-center border border-[#c2c6d8]/30">
          <ActivityPulse3D />

          {/* Overlay Status Badge */}
          <div className="absolute z-10 bottom-4 left-4 p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-sm border border-white/40 pointer-events-none flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0066ff] animate-ping" />
            <span className="text-[12px] font-extrabold text-[#111c2d] tracking-wider uppercase">
              Live Activity Status
            </span>
          </div>
        </div>
      </section>

      {/* 4. Today's Diet Plan Spotlight (Span 12) */}
      {todayDiet && (
        <section className="col-span-1 md:col-span-12 bg-white rounded-2xl p-6 card-shadow border border-transparent hover:border-[#dee8ff] transition-all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#f0f4ff] mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest">
                  Nutrition Target
                </span>
                <span className="text-xs text-[#72768a] font-semibold">
                  {todayDiet.day}'s Balanced Meal Plan
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#111c2d] flex items-center gap-2 mt-1">
                <Utensils className="w-5 h-5 text-[#0050cb]" /> Today's Meals ({todayDiet.day})
              </h2>
            </div>

            {onOpenDiet && (
              <button
                onClick={onOpenDiet}
                className="px-4 py-2 rounded-xl bg-[#0050cb] hover:bg-[#003da5] text-white font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                View Full 7-Day Diet <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Breakfast Preview */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-amber-600" /> Breakfast
                </span>
                <span className="text-[10px] text-amber-700 font-bold">
                  {todayDiet.breakfast.filter((m) => m.completed).length}/{todayDiet.breakfast.length}
                </span>
              </div>
              <div className="space-y-1">
                {todayDiet.breakfast.slice(0, 2).map((m) => (
                  <div key={m.id} className="text-xs font-semibold text-[#191c20] flex items-center justify-between gap-1">
                    <span className={`truncate ${m.completed ? 'line-through text-gray-400' : ''}`}>{m.name}</span>
                    {onToggleMeal && (
                      <button
                        onClick={() => onToggleMeal(todayDiet.day, 'breakfast', m.id)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] cursor-pointer ${
                          m.completed ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-amber-300'
                        }`}
                      >
                        {m.completed && '✓'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch Preview */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-emerald-600" /> Lunch
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">
                  {todayDiet.lunch.filter((m) => m.completed).length}/{todayDiet.lunch.length}
                </span>
              </div>
              <div className="space-y-1">
                {todayDiet.lunch.slice(0, 2).map((m) => (
                  <div key={m.id} className="text-xs font-semibold text-[#191c20] flex items-center justify-between gap-1">
                    <span className={`truncate ${m.completed ? 'line-through text-gray-400' : ''}`}>{m.name}</span>
                    {onToggleMeal && (
                      <button
                        onClick={() => onToggleMeal(todayDiet.day, 'lunch', m.id)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] cursor-pointer ${
                          m.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-300'
                        }`}
                      >
                        {m.completed && '✓'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Snack Preview */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-purple-600" /> Evening Snack
                </span>
                <span className="text-[10px] text-purple-700 font-bold">
                  {todayDiet.snack.filter((m) => m.completed).length}/{todayDiet.snack.length}
                </span>
              </div>
              <div className="space-y-1">
                {todayDiet.snack.slice(0, 2).map((m) => (
                  <div key={m.id} className="text-xs font-semibold text-[#191c20] flex items-center justify-between gap-1">
                    <span className={`truncate ${m.completed ? 'line-through text-gray-400' : ''}`}>{m.name}</span>
                    {onToggleMeal && (
                      <button
                        onClick={() => onToggleMeal(todayDiet.day, 'snack', m.id)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] cursor-pointer ${
                          m.completed ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-purple-300'
                        }`}
                      >
                        {m.completed && '✓'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dinner Preview */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-[#0050cb]" /> Dinner
                </span>
                <span className="text-[10px] text-blue-700 font-bold">
                  {todayDiet.dinner.filter((m) => m.completed).length}/{todayDiet.dinner.length}
                </span>
              </div>
              <div className="space-y-1">
                {todayDiet.dinner.slice(0, 0 + 2).map((m) => (
                  <div key={m.id} className="text-xs font-semibold text-[#191c20] flex items-center justify-between gap-1">
                    <span className={`truncate ${m.completed ? 'line-through text-gray-400' : ''}`}>{m.name}</span>
                    {onToggleMeal && (
                      <button
                        onClick={() => onToggleMeal(todayDiet.day, 'dinner', m.id)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] cursor-pointer ${
                          m.completed ? 'bg-[#0050cb] border-[#0050cb] text-white' : 'bg-white border-blue-300'
                        }`}
                      >
                        {m.completed && '✓'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
