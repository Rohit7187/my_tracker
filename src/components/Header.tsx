import React, { useState, useEffect } from 'react';
import { Settings, Users, Bell, Clock, Globe, Sparkles, Sun, Moon, Palette } from 'lucide-react';
import { TabType, UserProfile } from '../types';
import { formatTimeWithZone } from '../utils/timezone';

interface HeaderProps {
  activeTab: TabType;
  activeProfile: UserProfile;
  onOpenSettings: () => void;
  onOpenProfileSwitcher: () => void;
  onOpenReminders?: () => void;
  onOpenOpeningQuote?: () => void;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  activeProfile,
  onOpenSettings,
  onOpenProfileSwitcher,
  onOpenReminders,
  onOpenOpeningQuote,
  onToggleTheme,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { timeString, dateString, tzLabel } = formatTimeWithZone(currentTime, activeProfile.timeZone);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'tasks':
        return `Organize task priorities for ${activeProfile.userName}.`;
      case 'fitness':
        return `Track steps and workout sessions for ${activeProfile.userName}.`;
      case 'hydration':
        return `Log hydration and meet the ${activeProfile.waterGoalMl}ml goal.`;
      case 'reminders':
        return `Manage custom recurring alarms and notifications.`;
      case 'analytics':
        return `Wellness and activity analytics overview.`;
      case 'dashboard':
      default:
        return `Here is your summary for today.`;
    }
  };

  const getTitle = () => {
    if (activeTab === 'dashboard') {
      return `${getGreeting()}, ${activeProfile.userName.split(' ')[0]}`;
    }
    switch (activeTab) {
      case 'tasks':
        return 'Daily Tasks & Focus';
      case 'fitness':
        return 'Fitness & Activity';
      case 'hydration':
        return 'Hydration Tracker';
      case 'reminders':
        return 'Alarms & Reminders';
      case 'analytics':
        return 'Personal Analytics';
      default:
        return `${getGreeting()}, ${activeProfile.userName.split(' ')[0]}`;
    }
  };

  const activeAlarmsCount = activeProfile.reminders.filter((r) => r.enabled).length;
  const currentTheme = activeProfile.theme || 'soft';

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 w-full">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* Profile Badge */}
          <button
            onClick={onOpenProfileSwitcher}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e7eeff] hover:bg-[#dee8ff] text-[#0050cb] text-xs font-bold transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Profile: {activeProfile.userName} ({activeProfile.roleTag})</span>
          </button>

          {/* Time Zone Badge */}
          <button
            onClick={onOpenSettings}
            title="Click to change timezone in settings"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#0050cb] text-xs font-bold transition-colors cursor-pointer border border-[#dee8ff]"
          >
            <Globe className="w-3.5 h-3.5 text-[#0050cb]" />
            <Clock className="w-3.5 h-3.5 text-[#0050cb]" />
            <span>{timeString} ({tzLabel}) • {dateString}</span>
          </button>

          {/* Theme Indicator Badge */}
          <button
            onClick={onToggleTheme}
            title="Click to switch theme color"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-[#f0f3ff] text-xs font-bold transition-colors cursor-pointer border border-[#dee8ff]"
          >
            {currentTheme === 'black' || currentTheme === 'dark' ? (
              <span className="flex items-center gap-1 text-slate-200">
                <Moon className="w-3.5 h-3.5 text-indigo-400" /> Pitch Black Theme
              </span>
            ) : currentTheme === 'white' || currentTheme === 'light' ? (
              <span className="flex items-center gap-1 text-slate-800">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Pure White Theme
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#0050cb]">
                <Palette className="w-3.5 h-3.5 text-[#0066ff]" /> Soft Indigo Theme
              </span>
            )}
          </button>
        </div>

        <h1 className="text-[28px] md:text-[38px] font-extrabold text-[#111c2d] tracking-tight leading-none mb-1">
          {getTitle()}
        </h1>
        <p className="text-[14px] md:text-[16px] text-[#424656]">
          {getSubtitle()}
        </p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            title="Switch Theme (Black / White / Soft)"
            className="h-11 px-3 flex items-center justify-center gap-1.5 rounded-2xl bg-[#f0f3ff] hover:bg-[#dee8ff] transition-all text-[#0050cb] cursor-pointer shadow-xs border border-[#dee8ff]"
          >
            {currentTheme === 'black' || currentTheme === 'dark' ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : currentTheme === 'white' || currentTheme === 'light' ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Palette className="w-5 h-5 text-[#0066ff]" />
            )}
            <span className="text-xs font-bold capitalize hidden md:inline">
              {currentTheme === 'black' ? 'Black' : currentTheme === 'white' ? 'White' : 'Soft'}
            </span>
          </button>
        )}

        {onOpenOpeningQuote && (
          <button
            onClick={onOpenOpeningQuote}
            title="Daily Champion Motivation"
            className="h-11 px-3.5 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e50914] to-[#0066ff] text-white hover:opacity-90 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-bold">CR7 & Kohli Quotes</span>
          </button>
        )}

        {onOpenReminders && (
          <button
            onClick={onOpenReminders}
            title="View Alarms"
            className="h-11 px-3.5 flex items-center justify-center gap-2 rounded-2xl bg-white border border-[#dee8ff] hover:bg-[#f0f3ff] transition-all text-[#0050cb] cursor-pointer shadow-xs"
          >
            <Bell className="w-5 h-5 text-[#0050cb]" />
            <span className="text-xs font-bold text-[#111c2d]">{activeAlarmsCount} Active Alarms</span>
          </button>
        )}

        <button
          onClick={onOpenSettings}
          title="Open Settings"
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#f0f3ff] hover:bg-[#dee8ff] transition-all text-[#0050cb] cursor-pointer shadow-xs"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

