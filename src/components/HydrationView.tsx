import React, { useState } from 'react';
import { WaterLog, UserSettings } from '../types';
import { Droplets, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { WaterShaderCanvas } from './WaterShaderCanvas';

interface HydrationViewProps {
  logs: WaterLog[];
  userSettings: UserSettings;
  onAddWater: (amountMl: number) => void;
  onDeleteWaterLog: (id: string) => void;
}

export const HydrationView: React.FC<HydrationViewProps> = ({
  logs,
  userSettings,
  onAddWater,
  onDeleteWaterLog,
}) => {
  const [customMl, setCustomMl] = useState<number>(300);

  const totalWaterMl = logs.reduce((acc, l) => acc + l.amountMl, 0);
  const targetMl = userSettings.waterGoalMl;
  const progressPercent = Math.min(100, Math.round((totalWaterMl / targetMl) * 100));
  const remainingMl = Math.max(0, targetMl - totalWaterMl);

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMl > 0) {
      onAddWater(customMl);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-[#0050cb]">
            <Droplets className="w-6 h-6" />
            <h2 className="text-xl font-bold text-[#111c2d]">Daily Water Intake</h2>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-[#0050cb]">
              {(totalWaterMl / 1000).toFixed(2)}L
            </span>
            <span className="text-lg text-[#5c5f61]">
              / {(targetMl / 1000).toFixed(1)}L Daily Target
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-[#424656] mb-1.5">
              <span>Goal Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-[#e7eeff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0066ff] rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-[#5c5f61] mt-2">
              {remainingMl > 0
                ? `You need ${(remainingMl / 1000).toFixed(2)}L more water to hit today's hydration target!`
                : '🎉 Congratulations! You met your daily hydration goal!'}
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[150, 250, 350, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => onAddWater(amt)}
                className="px-4 py-2 rounded-xl bg-[#e7eeff] text-[#0050cb] font-bold text-sm hover:bg-[#0066ff] hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                +{amt}ml
              </button>
            ))}
          </div>
        </div>

        {/* Animated Shader Card */}
        <div className="md:col-span-5 h-64 rounded-xl bg-[#f0f3ff] relative overflow-hidden flex flex-col justify-end p-4 border border-[#c2c6d8]/30">
          <div className="absolute inset-0">
            <WaterShaderCanvas waterPercentage={progressPercent} />
          </div>
          <div className="relative z-10 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-white/50 shadow-xs">
            <span className="block text-xs font-bold text-[#111c2d]">Hydration Status</span>
            <span className="block text-xs text-[#424656]">
              {logs.length} intake entries recorded today
            </span>
          </div>
        </div>
      </div>

      {/* Custom Log & History */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Custom Amount Form */}
        <div className="md:col-span-4 bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <h3 className="text-base font-bold text-[#111c2d] mb-4">Log Custom Amount</h3>
          <form onSubmit={handleCustomAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1">
                Volume in Milliliters (ml)
              </label>
              <input
                type="number"
                step="50"
                min="50"
                max="2000"
                value={customMl}
                onChange={(e) => setCustomMl(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f0f3ff] text-sm font-semibold text-[#111c2d] border border-transparent focus:border-[#0066ff] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0050cb] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Water
            </button>
          </form>
        </div>

        {/* History Log List */}
        <div className="md:col-span-8 bg-white p-6 rounded-2xl card-shadow border border-[#dee8ff]">
          <h3 className="text-base font-bold text-[#111c2d] mb-4">Today's Intake Log</h3>
          {logs.length === 0 ? (
            <p className="text-sm text-[#5c5f61] italic py-6 text-center">No water logged today yet.</p>
          ) : (
            <div className="divide-y divide-[#f0f3ff]">
              {logs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0050cb]" />
                    <div>
                      <span className="font-bold text-[#111c2d] text-base">+{log.amountMl} ml</span>
                      <span className="block text-xs text-[#5c5f61]">{log.timeString}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteWaterLog(log.id)}
                    className="text-[#ba1a1a] hover:bg-[#ffdad6]/50 p-2 rounded-lg transition-colors cursor-pointer"
                    title="Remove log entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
