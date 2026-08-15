import React, { useState, useRef } from 'react';
import { X, User, Droplet, Activity, RotateCcw, Upload, Trash2, Globe, Sun, Moon, Palette, Download, ShieldCheck, Database, FileText } from 'lucide-react';
import { UserSettings, ThemeMode } from '../types';
import { COMMON_TIMEZONES } from '../utils/timezone';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSettings: UserSettings;
  onSaveSettings: (newSettings: UserSettings) => void;
  onResetData: () => void;
  onExportData?: () => void;
  onImportData?: (file: File) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userSettings,
  onSaveSettings,
  onResetData,
  onExportData,
  onImportData,
}) => {
  const [userName, setUserName] = useState(userSettings.userName);
  const [password, setPassword] = useState(userSettings.password || '');
  const [avatarUrl, setAvatarUrl] = useState(userSettings.avatarUrl || '');
  const [timeZone, setTimeZone] = useState(userSettings.timeZone || 'Asia/Kolkata');
  const [theme, setTheme] = useState<ThemeMode>(userSettings.theme || 'soft');
  const [waterGoalMl, setWaterGoalMl] = useState(userSettings.waterGoalMl);
  const [stepsGoal, setStepsGoal] = useState(userSettings.stepsGoal);
  const [activeMinutesGoal, setActiveMinutesGoal] = useState(userSettings.activeMinutesGoal);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const jsonImportRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please select a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...userSettings,
      userName: userName.trim() || 'Rohit',
      password: password.trim() || undefined,
      avatarUrl: avatarUrl.trim(),
      timeZone: timeZone,
      theme: theme,
      waterGoalMl: Number(waterGoalMl) || 2500,
      stepsGoal: Number(stepsGoal) || 10000,
      activeMinutesGoal: Number(activeMinutesGoal) || 60,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg card-shadow border border-[#dee8ff] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#111c2d] flex items-center gap-2">
            Dashboard Settings
          </h3>
          <button
            onClick={onClose}
            className="text-[#5c5f61] hover:text-[#111c2d] p-1 rounded-lg hover:bg-[#f0f3ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Section */}
          <div className="p-4 rounded-xl bg-[#f0f3ff] space-y-3">
            <h4 className="text-sm font-bold text-[#0050cb] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Profile Info
            </h4>

            {/* Profile Avatar Upload / Remove */}
            <div className="flex items-center gap-4 py-1">
              <div className="w-14 h-14 rounded-full bg-[#0066ff] text-white font-extrabold text-xl flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-[#0066ff]/20">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <span>{userName.charAt(0) || 'R'}</span>
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="block text-xs font-bold text-[#111c2d]">Profile Picture</span>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-[#0066ff] hover:bg-[#0050cb] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Add / Upload Photo
                  </button>

                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setAvatarUrl('')}
                      className="px-3 py-1.5 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Profile Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. rohit123"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm font-semibold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0050cb]" /> Time Zone
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm font-semibold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff] cursor-pointer"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Theme Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#0050cb]" /> Display Color Theme
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTheme('white')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'white' || theme === 'light'
                      ? 'bg-white border-[#0066ff] ring-2 ring-[#0066ff]/20 text-[#111c2d] font-bold shadow-sm'
                      : 'bg-white border-[#c2c6d8]/60 text-[#424656] hover:border-[#0066ff]/50'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span className="text-xs">Pure White</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('black')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'black' || theme === 'dark'
                      ? 'bg-[#0f172a] border-[#0066ff] ring-2 ring-[#0066ff]/40 text-white font-bold shadow-sm'
                      : 'bg-[#0f172a] border-[#1e293b] text-slate-300 hover:border-[#0066ff]/50'
                  }`}
                >
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs">Pitch Black</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('soft')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    theme === 'soft'
                      ? 'bg-[#e7eeff] border-[#0066ff] ring-2 ring-[#0066ff]/20 text-[#0050cb] font-bold shadow-sm'
                      : 'bg-[#f0f3ff] border-[#c2c6d8]/60 text-[#424656] hover:border-[#0066ff]/50'
                  }`}
                >
                  <Palette className="w-5 h-5 text-[#0066ff]" />
                  <span className="text-xs">Soft Indigo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="p-4 rounded-xl bg-[#f0f3ff] space-y-3">
            <h4 className="text-sm font-bold text-[#0050cb] uppercase tracking-wider flex items-center gap-2">
              <Droplet className="w-4 h-4" /> Daily Target Goals
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Water Goal (ml)
                </label>
                <input
                  type="number"
                  step="100"
                  min="500"
                  max="6000"
                  value={waterGoalMl}
                  onChange={(e) => setWaterGoalMl(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Steps Target
                </label>
                <input
                  type="number"
                  step="500"
                  min="1000"
                  max="50000"
                  value={stepsGoal}
                  onChange={(e) => setStepsGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Active Mins Target
                </label>
                <input
                  type="number"
                  step="5"
                  min="10"
                  max="300"
                  value={activeMinutesGoal}
                  onChange={(e) => setActiveMinutesGoal(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#c2c6d8]/60 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>
            </div>
          </div>

          {/* Open Internet & Data Backup Section */}
          <div className="p-4 rounded-xl bg-[#e7eeff]/60 border border-[#dee8ff] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0050cb] uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Data Portability & Backup
              </h4>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                <ShieldCheck className="w-3 h-3" /> 100% Private Local Storage
              </span>
            </div>

            <p className="text-xs text-[#424656]">
              All your tasks, workouts, water logs, and goal targets are safely stored in your browser. Export a JSON backup to transfer your data to any other device or publish safely.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {onExportData && (
                <button
                  type="button"
                  onClick={onExportData}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#dee8ff] text-[#0050cb] border border-[#dee8ff] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#0066ff]" /> Export Backup (JSON)
                </button>
              )}

              {onImportData && (
                <>
                  <input
                    type="file"
                    ref={jsonImportRef}
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onImportData(file);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => jsonImportRef.current?.click()}
                    className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#dee8ff] text-[#0050cb] border border-[#dee8ff] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#0066ff]" /> Restore Backup
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#ba1a1a]">Reset All Data</span>
              <span className="block text-xs text-[#93000a]">Restore initial prototype tasks, steps & water logs.</span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset all tracked data to default initial state?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ba1a1a] text-white hover:bg-[#93000a] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#5c5f61] hover:bg-[#f0f3ff] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0066ff] hover:bg-[#0050cb] text-white shadow-sm transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
