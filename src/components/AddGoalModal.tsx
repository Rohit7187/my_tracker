import React, { useState } from 'react';
import { X, Target, Calendar, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Goal, GoalTimeframe, GoalCategory } from '../types';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'startDate' | 'completed'>) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeframe, setTimeframe] = useState<GoalTimeframe>('Daily');
  const [category, setCategory] = useState<GoalCategory>('Fitness');
  const [targetValue, setTargetValue] = useState<number | ''>(10000);
  const [currentValue, setCurrentValue] = useState<number | ''>(0);
  const [unit, setUnit] = useState('steps');
  const [autoSyncType, setAutoSyncType] = useState<'steps' | 'water' | 'activeMins' | 'tasks' | ''>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetValue || Number(targetValue) <= 0) return;

    onAddGoal({
      title: title.trim(),
      description: description.trim() || undefined,
      timeframe,
      category,
      targetValue: Number(targetValue),
      currentValue: Number(currentValue) || 0,
      unit: unit.trim() || 'units',
      streakDays: 0,
      autoSyncType: autoSyncType ? autoSyncType : undefined,
    });

    // Reset & close
    setTitle('');
    setDescription('');
    setTargetValue(10000);
    setCurrentValue(0);
    setUnit('steps');
    setAutoSyncType('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white text-[#111c2d] rounded-3xl p-6 md:p-8 w-full max-w-md card-shadow border border-[#dee8ff] space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#5c5f61] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#111c2d]">Create New Goal</h2>
            <p className="text-xs text-[#5c5f61]">Set targets for Daily, Weekly, Monthly, or Yearly focus.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#424656] mb-1">
              Goal Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Daily Running Target, Read 2 Books"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#424656] mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Build habit by running 5km every morning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            />
          </div>

          {/* Timeframe & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#424656] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0066ff]" /> Timeframe
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as GoalTimeframe)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-xs font-bold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              >
                <option value="Daily">Daily Goal</option>
                <option value="Weekly">Weekly Goal</option>
                <option value="Monthly">Monthly Goal</option>
                <option value="Yearly">Yearly Goal</option>
                <option value="Custom">Custom Target</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#424656] mb-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#0066ff]" /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GoalCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-xs font-bold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              >
                <option value="Fitness">Fitness</option>
                <option value="Hydration">Hydration</option>
                <option value="Tasks">Tasks & Work</option>
                <option value="Learning">Learning & Mindset</option>
                <option value="Mindset">Mindset & Habits</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          {/* Target Value, Current Value & Unit */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-[#424656] mb-1">
                Target *
              </label>
              <input
                type="number"
                required
                min="1"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-sm font-bold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#424656] mb-1">
                Initial
              </label>
              <input
                type="number"
                min="0"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-sm font-bold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#424656] mb-1">
                Unit
              </label>
              <input
                type="text"
                placeholder="steps/ml/mins"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-xs font-bold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>
          </div>

          {/* Auto Sync Selection */}
          <div>
            <label className="block text-xs font-bold text-[#424656] mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" /> Auto-Sync Activity (Optional)
            </label>
            <select
              value={autoSyncType}
              onChange={(e) => setAutoSyncType(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#c2c6d8]/60 bg-[#f9f9ff] text-xs font-semibold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            >
              <option value="">None (Manual progress entry)</option>
              <option value="steps">Sync with Daily Steps logged</option>
              <option value="water">Sync with Water Intake logged (ml)</option>
              <option value="activeMins">Sync with Active Fitness Workout minutes</option>
              <option value="tasks">Sync with Completed Tasks count</option>
            </select>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#0050cb] font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
