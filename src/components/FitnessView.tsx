import React, { useState } from 'react';
import { FitnessLog, UserSettings } from '../types';
import { Activity, Flame, Footprints, Clock, Plus, Dumbbell, Zap } from 'lucide-react';

interface FitnessViewProps {
  logs: FitnessLog[];
  todaySteps: number;
  todayActiveMins: number;
  userSettings: UserSettings;
  onAddFitnessLog: (log: Omit<FitnessLog, 'id' | 'timestamp' | 'timeString'>) => void;
  onAddSteps: (steps: number) => void;
  onAddActiveMins: (mins: number) => void;
}

export const FitnessView: React.FC<FitnessViewProps> = ({
  logs,
  todaySteps,
  todayActiveMins,
  userSettings,
  onAddFitnessLog,
  onAddSteps,
  onAddActiveMins,
}) => {
  const [workoutType, setWorkoutType] = useState<FitnessLog['type']>('Walking');
  const [duration, setDuration] = useState<number>(30);
  const [stepsAdded, setStepsAdded] = useState<number>(3000);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(150);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalCalories = logs.reduce((acc, l) => acc + l.caloriesBurned, 0) + Math.round(todaySteps * 0.04);

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFitnessLog({
      type: workoutType,
      durationMinutes: Number(duration),
      stepsAdded: Number(stepsAdded),
      caloriesBurned: Number(caloriesBurned),
    });
    setShowAddForm(false);
  };

  const workoutOptions: FitnessLog['type'][] = ['Walking', 'Running', 'Cycling', 'Meditation', 'Strength', 'Yoga'];

  return (
    <div className="space-y-6 w-full">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#5c5f61]">Steps Today</span>
            <Footprints className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-3xl font-extrabold text-[#111c2d]">
            {todaySteps.toLocaleString()}
          </div>
          <p className="text-xs text-[#4b5a70] mt-1">
            Goal: {userSettings.stepsGoal.toLocaleString()} steps ({Math.min(100, Math.round((todaySteps / userSettings.stepsGoal) * 100))}%)
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onAddSteps(1000)}
              className="px-3 py-1.5 rounded-lg bg-[#e7eeff] text-[#0050cb] text-xs font-semibold hover:bg-[#dee8ff] cursor-pointer"
            >
              +1,000 Steps
            </button>
            <button
              onClick={() => onAddSteps(2500)}
              className="px-3 py-1.5 rounded-lg bg-[#e7eeff] text-[#0050cb] text-xs font-semibold hover:bg-[#dee8ff] cursor-pointer"
            >
              +2,500 Steps
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#5c5f61]">Active Minutes</span>
            <Clock className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-3xl font-extrabold text-[#111c2d]">
            {todayActiveMins} <span className="text-lg font-normal text-[#424656]">mins</span>
          </div>
          <p className="text-xs text-[#4b5a70] mt-1">
            Target: {userSettings.activeMinutesGoal} mins ({Math.min(100, Math.round((todayActiveMins / userSettings.activeMinutesGoal) * 100))}%)
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onAddActiveMins(15)}
              className="px-3 py-1.5 rounded-lg bg-[#e7eeff] text-[#0050cb] text-xs font-semibold hover:bg-[#dee8ff] cursor-pointer"
            >
              +15 Mins
            </button>
            <button
              onClick={() => onAddActiveMins(30)}
              className="px-3 py-1.5 rounded-lg bg-[#e7eeff] text-[#0050cb] text-xs font-semibold hover:bg-[#dee8ff] cursor-pointer"
            >
              +30 Mins
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#5c5f61]">Calories Burned</span>
            <Flame className="w-5 h-5 text-[#0050cb]" />
          </div>
          <div className="text-3xl font-extrabold text-[#111c2d]">
            {totalCalories} <span className="text-lg font-normal text-[#424656]">kcal</span>
          </div>
          <p className="text-xs text-[#4b5a70] mt-1">
            Calculated from active workouts and step movement
          </p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#dae1ff] text-[#003fa4] text-xs font-semibold">
              Active Burn Mode
            </span>
          </div>
        </div>
      </div>

      {/* Log Workout Button & Modal / Inline Card */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#111c2d] flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-[#0050cb]" /> Activity & Workout Logs
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-[#0066ff] text-white rounded-xl text-sm font-semibold hover:bg-[#0050cb] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Log Workout
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddWorkout} className="mb-6 p-4 rounded-xl bg-[#f0f3ff] space-y-4 animate-fade-in">
            <h4 className="text-sm font-bold text-[#0050cb]">Log New Exercise Session</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">Exercise Type</label>
                <select
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value as FitnessLog['type'])}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/50 text-sm text-[#111c2d]"
                >
                  {workoutOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  min="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/50 text-sm text-[#111c2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">Steps Added</label>
                <input
                  type="number"
                  min="0"
                  value={stepsAdded}
                  onChange={(e) => setStepsAdded(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/50 text-sm text-[#111c2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">Est. Calories</label>
                <input
                  type="number"
                  min="0"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/50 text-sm text-[#111c2d]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#5c5f61] hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#0066ff] text-white hover:bg-[#0050cb]"
              >
                Save Activity
              </button>
            </div>
          </form>
        )}

        {/* Logs Table */}
        {logs.length === 0 ? (
          <p className="text-sm text-[#5c5f61] py-6 text-center italic">No workouts logged today yet.</p>
        ) : (
          <div className="divide-y divide-[#f0f3ff]">
            {logs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e7eeff] text-[#0050cb] flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-[#111c2d] text-base">{log.type} Session</span>
                    <span className="block text-xs text-[#5c5f61]">{log.timeString}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-right">
                    <span className="block font-bold text-[#111c2d]">{log.durationMinutes} mins</span>
                    <span className="block text-xs text-[#5c5f61]">Duration</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-[#0050cb]">+{log.stepsAdded.toLocaleString()}</span>
                    <span className="block text-xs text-[#5c5f61]">Steps</span>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="block font-bold text-[#111c2d]">{log.caloriesBurned} kcal</span>
                    <span className="block text-xs text-[#5c5f61]">Burned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
