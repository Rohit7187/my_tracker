import React from 'react';
import { LayoutDashboard, Target, Utensils, Calendar, Activity, Droplets, TrendingUp, Bell, Users, ChevronDown } from 'lucide-react';
import { TabType, UserProfile } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeProfile: UserProfile;
  onOpenProfileSwitcher: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeProfile,
  onOpenProfileSwitcher,
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'goals' as TabType, label: 'Goals & Targets', icon: Target },
    { id: 'diet' as TabType, label: 'Weekly Diet Plan', icon: Utensils },
    { id: 'tasks' as TabType, label: 'Daily Tasks', icon: Calendar },
    { id: 'fitness' as TabType, label: 'Fitness', icon: Activity },
    { id: 'hydration' as TabType, label: 'Hydration', icon: Droplets },
    { id: 'reminders' as TabType, label: 'Alarms & Alerts', icon: Bell },
    { id: 'analytics' as TabType, label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 flex-col p-5 gap-4 bg-[#f0f3ff] z-40 border-r border-[#dee8ff]">
      {/* App Branding */}
      <div className="flex items-center gap-3 px-2 pt-2 mb-2">
        <div className="w-9 h-9 rounded-xl bg-[#0066ff] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
          PT
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[18px] leading-5 text-[#0050cb] tracking-tight">
            Personal Tracker
          </span>
          <span className="text-[11px] font-semibold text-[#5c5f61]">
            Multi-User Dashboard
          </span>
        </div>
      </div>

      {/* Active Profile Card Button */}
      <button
        onClick={onOpenProfileSwitcher}
        className="w-full p-3 rounded-2xl bg-white hover:bg-[#e7eeff] border border-[#dee8ff] transition-all cursor-pointer flex items-center justify-between shadow-xs group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0066ff] text-white font-bold flex items-center justify-center flex-shrink-0 ring-2 ring-[#0066ff]/20">
            {activeProfile.avatarUrl ? (
              <img
                className="w-full h-full object-cover"
                alt={activeProfile.userName}
                src={activeProfile.avatarUrl}
              />
            ) : (
              <span className="text-base uppercase">{activeProfile.userName.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-bold text-[14px] text-[#111c2d] truncate">
              {activeProfile.userName}
            </span>
            <span className="text-[11px] font-semibold text-[#0050cb]">
              {activeProfile.roleTag}
            </span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-[#5c5f61] group-hover:text-[#0050cb] flex-shrink-0" />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5 w-full mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left w-full font-medium text-[15px] ${
                isActive
                  ? 'text-[#0050cb] font-bold bg-[#0066ff]/10 shadow-xs'
                  : 'text-[#424656] hover:bg-[#dee8ff] hover:text-[#0050cb]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0050cb]' : 'text-[#5c5f61]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Switch Profiles Footer Button */}
      <div className="mt-auto pt-4 border-t border-[#dee8ff]">
        <button
          onClick={onOpenProfileSwitcher}
          className="w-full py-2.5 px-3 rounded-xl bg-[#e7eeff] hover:bg-[#dee8ff] text-[#0050cb] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Users className="w-4 h-4" /> Switch Profile
        </button>
      </div>
    </aside>
  );
};

