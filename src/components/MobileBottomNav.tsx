import React from 'react';
import { LayoutDashboard, Target, Utensils, Calendar, Activity, Droplets, Bell, TrendingUp } from 'lucide-react';
import { TabType } from '../types';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Today', icon: LayoutDashboard },
    { id: 'diet' as TabType, label: 'Diet', icon: Utensils },
    { id: 'goals' as TabType, label: 'Goals', icon: Target },
    { id: 'tasks' as TabType, label: 'Tasks', icon: Calendar },
    { id: 'fitness' as TabType, label: 'Fitness', icon: Activity },
    { id: 'hydration' as TabType, label: 'Water', icon: Droplets },
    { id: 'reminders' as TabType, label: 'Alarms', icon: Bell },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-2 pt-1.5 bg-white/95 backdrop-blur-md shadow-lg rounded-t-2xl z-50 border-t border-[#dee8ff]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-[#0066ff] text-white font-semibold shadow-xs'
                : 'text-[#424656] hover:text-[#0050cb]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

