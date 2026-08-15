import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Flame, Award, Calendar, RefreshCw, Trash2, Share2, Sparkles } from 'lucide-react';
import { Goal, GoalTimeframe, GoalCategory } from '../types';

interface GoalsViewProps {
  goals: Goal[];
  onAddGoalClick: () => void;
  onUpdateGoalProgress: (goalId: string, addedValue: number) => void;
  onToggleGoalComplete: (goalId: string) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  onAddGoalClick,
  onUpdateGoalProgress,
  onToggleGoalComplete,
  onDeleteGoal,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [logInputValues, setLogInputValues] = useState<{ [key: string]: number }>({});
  const [showShareModal, setShowShareModal] = useState(false);

  // Filter logic
  const filteredGoals = goals.filter((g) => {
    const matchTime = activeTimeframe === 'All' || g.timeframe === activeTimeframe;
    const matchCat = activeCategory === 'All' || g.category === activeCategory;
    return matchTime && matchCat;
  });

  // Goal metrics
  const totalGoalsCount = goals.length;
  const completedGoalsCount = goals.filter((g) => g.completed || g.currentValue >= g.targetValue).length;
  const overallCompletionRate = totalGoalsCount > 0 ? Math.round((completedGoalsCount / totalGoalsCount) * 100) : 0;

  const handleQuickAdd = (goalId: string) => {
    const val = logInputValues[goalId] || 1;
    onUpdateGoalProgress(goalId, val);
    setLogInputValues((prev) => ({ ...prev, [goalId]: 0 }));
  };

  const timeframeCounts = {
    All: goals.length,
    Daily: goals.filter((g) => g.timeframe === 'Daily').length,
    Weekly: goals.filter((g) => g.timeframe === 'Weekly').length,
    Monthly: goals.filter((g) => g.timeframe === 'Monthly').length,
    Yearly: goals.filter((g) => g.timeframe === 'Yearly' || g.timeframe === 'Custom').length,
  };

  const getCategoryBadgeColor = (cat: GoalCategory) => {
    switch (cat) {
      case 'Fitness': return 'bg-[#0066ff]/10 text-[#0066ff] border-[#0066ff]/20';
      case 'Hydration': return 'bg-[#0080ff]/10 text-[#0080ff] border-[#0080ff]/20';
      case 'Tasks': return 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20';
      case 'Learning': return 'bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/20';
      case 'Mindset': return 'bg-[#10b981]/10 text-[#059669] border-[#10b981]/20';
      default: return 'bg-[#64748b]/10 text-[#475569] border-[#64748b]/20';
    }
  };

  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* Top Banner Stats Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#002b70] via-[#0050cb] to-[#0066ff] text-white rounded-3xl p-6 md:p-8 card-shadow shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-extrabold uppercase tracking-widest border border-white/20">
            <Target className="w-3.5 h-3.5 text-[#ffd700]" /> Multi-Timeframe Goal Hub
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Goal Progression & Milestones
          </h2>
          <p className="text-xs md:text-sm text-[#dae1ff] max-w-xl">
            Track daily, weekly, monthly, and yearly achievements with automated activity syncing and streak tracking.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 z-10 self-stretch md:self-auto">
          <button
            onClick={() => setShowShareModal(true)}
            className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20"
          >
            <Share2 className="w-4 h-4 text-[#ffd700]" /> Share Goals Summary
          </button>

          <button
            onClick={onAddGoalClick}
            className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-[#ffd700] hover:bg-[#e6c200] text-[#002b70] font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Goal
          </button>
        </div>
      </div>

      {/* Progress Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#5c5f61] block">Total Goals</span>
            <span className="text-xl font-extrabold text-[#111c2d]">{totalGoalsCount} Targets</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#5c5f61] block">Achieved</span>
            <span className="text-xl font-extrabold text-[#111c2d]">{completedGoalsCount} Completed</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#5c5f61] block">Completion Rate</span>
            <span className="text-xl font-extrabold text-[#111c2d]">{overallCompletionRate}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-shadow border border-[#dee8ff] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#5c5f61] block">Timeframes</span>
            <span className="text-xl font-extrabold text-[#111c2d]">4 Tiers</span>
          </div>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#dee8ff] card-shadow">
        {/* Timeframe Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Daily', 'Weekly', 'Monthly', 'Yearly'] as const).map((tf) => {
            const count = timeframeCounts[tf];
            const isActive = activeTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0066ff] text-white shadow-xs'
                    : 'bg-[#f0f3ff] text-[#424656] hover:bg-[#dee8ff] hover:text-[#0050cb]'
                }`}
              >
                <span>{tf === 'Yearly' ? 'Yearly & Long-Term' : tf}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-[#dee8ff] text-[#0050cb]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Fitness', 'Hydration', 'Tasks', 'Learning', 'Mindset'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#0050cb] text-white font-bold'
                  : 'bg-[#f0f3ff] text-[#5c5f61] hover:text-[#0050cb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-[#dee8ff] p-8 space-y-3">
            <Target className="w-12 h-12 text-[#0066ff]/40 mx-auto" />
            <h3 className="text-lg font-bold text-[#111c2d]">No Goals Found in this View</h3>
            <p className="text-xs text-[#5c5f61]">Try changing your filters or add a new goal.</p>
            <button
              onClick={onAddGoalClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066ff] text-white text-xs font-bold rounded-xl hover:bg-[#0050cb] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Goal
            </button>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const isCompleted = goal.completed || goal.currentValue >= goal.targetValue;
            const percent = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);

            return (
              <div
                key={goal.id}
                className={`relative bg-white rounded-2xl p-5 card-shadow border transition-all space-y-4 ${
                  isCompleted
                    ? 'border-emerald-500/40 bg-emerald-50/20'
                    : 'border-[#dee8ff] hover:border-[#0066ff]/50'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0050cb]/10 text-[#0050cb] text-[10px] font-black uppercase tracking-wider">
                        {goal.timeframe}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryBadgeColor(goal.category)}`}>
                        {goal.category}
                      </span>
                      {goal.autoSyncType && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Auto Sync
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#111c2d] truncate">
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className="text-xs text-[#5c5f61] line-clamp-2">{goal.description}</p>
                    )}
                  </div>

                  {/* Complete Checkbox & Delete */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => onToggleGoalComplete(goal.id)}
                      title={isCompleted ? 'Mark incomplete' : 'Mark as completed'}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-[#f0f3ff] text-[#5c5f61] hover:bg-[#dee8ff] hover:text-[#0050cb]'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      title="Delete goal"
                      className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar & Numerical Counter */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111c2d]">
                    <span>
                      {goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()} {goal.unit}
                    </span>
                    <span className={isCompleted ? 'text-emerald-600' : 'text-[#0050cb]'}>
                      {percent}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[#f0f3ff] overflow-hidden p-0.5 border border-[#dee8ff]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#0066ff] to-[#0050cb]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Footer Controls: Quick Log Progress Input & Streak */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#f0f3ff]">
                  {/* Streak / Target indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5c5f61]">
                    <Flame className="w-4 h-4 text-amber-500 fill-current" />
                    <span>{goal.streakDays || 0}-day streak</span>
                  </div>

                  {/* Quick Increment Form */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="+val"
                      value={logInputValues[goal.id] || ''}
                      onChange={(e) =>
                        setLogInputValues({
                          ...logInputValues,
                          [goal.id]: Number(e.target.value),
                        })
                      }
                      className="w-20 px-2.5 py-1 rounded-lg border border-[#c2c6d8]/60 bg-[#f9f9ff] text-xs font-bold text-[#111c2d] focus:outline-none focus:ring-1 focus:ring-[#0066ff]"
                    />
                    <button
                      onClick={() => handleQuickAdd(goal.id)}
                      className="px-3 py-1 rounded-lg bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Log
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Share / Export Report Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white text-[#111c2d] rounded-3xl p-6 md:p-8 w-full max-w-lg card-shadow border border-[#dee8ff] space-y-6 text-center">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#5c5f61] flex items-center justify-center cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066ff]/10 text-[#0066ff] text-xs font-extrabold uppercase tracking-widest mx-auto">
              <Sparkles className="w-3.5 h-3.5" /> Open Internet Goal Summary Report
            </div>

            <h3 className="text-xl font-extrabold text-[#111c2d]">
              Personal Progress Report
            </h3>

            <div className="p-4 bg-[#f0f3ff] rounded-2xl text-left font-mono text-xs text-[#111c2d] space-y-2 border border-[#dee8ff] overflow-x-auto">
              <p className="font-bold text-[#0050cb]">🏆 Daily & Periodical Goal Report</p>
              <p>----------------------------------------</p>
              <p>🎯 Total Active Goals: {totalGoalsCount}</p>
              <p>✅ Completed Goals: {completedGoalsCount} ({overallCompletionRate}%)</p>
              <p>📅 Daily Goals Active: {timeframeCounts.Daily}</p>
              <p>🗓️ Weekly Goals Active: {timeframeCounts.Weekly}</p>
              <p>📆 Monthly Goals Active: {timeframeCounts.Monthly}</p>
              <p>🚀 Long-Term / Yearly: {timeframeCounts.Yearly}</p>
              <p>----------------------------------------</p>
              <p className="italic text-[#5c5f61]">Generated via Personal Tracker App</p>
            </div>

            <p className="text-xs text-[#5c5f61]">
              You can copy this summary or take a screenshot to share with your coach, friends, or social media!
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `🏆 Goal Report:\n- Total Goals: ${totalGoalsCount}\n- Achieved: ${completedGoalsCount} (${overallCompletionRate}%)\n- Daily Targets: ${timeframeCounts.Daily}\n- Weekly Targets: ${timeframeCounts.Weekly}\n- Monthly Targets: ${timeframeCounts.Monthly}\nKeep winning!`
                );
                alert('Copied summary to clipboard!');
              }}
              className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Copy Text Summary to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
