import React, { useState } from 'react';
import { ReminderAlarm, ReminderType } from '../types';
import { Bell, Plus, Trash2, Volume2, Clock, Check, Calendar, Droplets, Activity, Zap } from 'lucide-react';
import { playAlarmChime } from '../utils/sound';

interface RemindersViewProps {
  reminders: ReminderAlarm[];
  onAddReminder: (reminder: Omit<ReminderAlarm, 'id'>) => void;
  onToggleReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
  activeProfileName: string;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  reminders,
  onAddReminder,
  onToggleReminder,
  onDeleteReminder,
  activeProfileName,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [type, setType] = useState<ReminderType>('hydration');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterType, setFilterType] = useState<string>('All');

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length === 1) return; // Keep at least 1 day
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelectAllDays = () => {
    if (selectedDays.length === 7) {
      setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    } else {
      setSelectedDays([...allDays]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddReminder({
      title: title.trim(),
      time,
      days: selectedDays.length === 7 ? ['Daily'] : selectedDays,
      type,
      enabled: true,
      soundEnabled,
    });

    setTitle('');
    setTime('09:00');
    setShowForm(false);
  };

  const getTypeIcon = (reminderType: ReminderType) => {
    switch (reminderType) {
      case 'hydration':
        return <Droplets className="w-5 h-5 text-[#0050cb]" />;
      case 'task':
        return <Calendar className="w-5 h-5 text-[#0050cb]" />;
      case 'workout':
        return <Activity className="w-5 h-5 text-[#0050cb]" />;
      case 'general':
      default:
        return <Bell className="w-5 h-5 text-[#0050cb]" />;
    }
  };

  const getTypeBadgeClass = (reminderType: ReminderType) => {
    switch (reminderType) {
      case 'hydration':
        return 'bg-[#e7eeff] text-[#0050cb]';
      case 'task':
        return 'bg-[#f0f3ff] text-[#4b5a70]';
      case 'workout':
        return 'bg-[#dae1ff] text-[#003fa4]';
      case 'general':
      default:
        return 'bg-[#e0e3e5] text-[#191c1e]';
    }
  };

  const filteredReminders = reminders.filter((r) => {
    if (filterType === 'All') return true;
    return r.type === filterType.toLowerCase();
  });

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-6 h-6 text-[#0050cb]" />
            <h2 className="text-xl font-bold text-[#111c2d]">Alarms & Reminders for {activeProfileName}</h2>
          </div>
          <p className="text-sm text-[#424656]">
            Configure recurring alarms for water intake, focus sessions, and exercise routines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playAlarmChime}
            className="px-3.5 py-2 rounded-xl bg-[#f0f3ff] text-[#0050cb] hover:bg-[#dee8ff] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Test Chime Sound"
          >
            <Volume2 className="w-4 h-4" /> Test Sound
          </button>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2.5 rounded-xl bg-[#0066ff] text-white text-sm font-semibold hover:bg-[#0050cb] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Alarm
          </button>
        </div>
      </div>

      {/* Add Alarm Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff] space-y-4 animate-fade-in">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0f3ff]">
            <h3 className="text-base font-bold text-[#111c2d] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0050cb]" /> Set New Alarm / Reminder
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs font-semibold text-[#5c5f61] hover:text-[#111c2d]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#424656] mb-1">Reminder Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Drink 250ml Water, Afternoon Stretch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f0f3ff] text-sm text-[#111c2d] border border-[#c2c6d8]/50 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1">Alarm Time (24h) *</label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f0f3ff] text-sm font-bold text-[#111c2d] border border-[#c2c6d8]/50 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1">Type / Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ReminderType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#f0f3ff] text-sm text-[#111c2d] border border-[#c2c6d8]/50 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              >
                <option value="hydration">Hydration Reminder</option>
                <option value="task">Focus / Task Alarm</option>
                <option value="workout">Fitness Workout Alarm</option>
                <option value="general">General Notification</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-[#0066ff] focus:ring-[#0066ff]"
                />
                <span className="text-xs font-bold text-[#111c2d] flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-[#0050cb]" /> Play Sound Tone on Alarm
                </span>
              </label>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-[#424656]">Repeat Days</label>
              <button
                type="button"
                onClick={handleSelectAllDays}
                className="text-xs font-bold text-[#0050cb] hover:underline cursor-pointer"
              >
                {selectedDays.length === 7 ? 'Select Weekdays' : 'Select Everyday'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allDays.map((d) => {
                const isSel = selectedDays.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDayToggle(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSel
                        ? 'bg-[#0066ff] text-white shadow-xs'
                        : 'bg-[#f0f3ff] text-[#5c5f61] hover:bg-[#dee8ff]'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5c5f61] hover:bg-[#f0f3ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0066ff] text-white hover:bg-[#0050cb] shadow-sm"
            >
              Save Alarm
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Hydration', 'Task', 'Workout', 'General'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === cat
                ? 'bg-[#0050cb] text-white shadow-xs'
                : 'bg-white text-[#424656] hover:bg-[#f0f3ff] border border-[#dee8ff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reminders List Card */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-[#dee8ff]">
        <h3 className="text-base font-bold text-[#111c2d] mb-4">
          Configured Alarms ({filteredReminders.length})
        </h3>

        {filteredReminders.length === 0 ? (
          <div className="text-center py-10 text-[#5c5f61]">
            <p className="text-sm">No alarms configured in this category.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 px-4 py-2 bg-[#e7eeff] text-[#0050cb] rounded-xl text-xs font-bold hover:bg-[#dee8ff] transition-colors"
            >
              Set First Alarm
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f3ff]">
            {filteredReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f0f3ff] flex items-center justify-center flex-shrink-0">
                    {getTypeIcon(reminder.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-[#111c2d] tracking-tight">
                        {reminder.time}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${getTypeBadgeClass(
                          reminder.type
                        )}`}
                      >
                        {reminder.type}
                      </span>
                    </div>

                    <span className="block font-semibold text-[#111c2d] text-base mt-0.5">
                      {reminder.title}
                    </span>

                    <span className="block text-xs text-[#5c5f61] mt-0.5">
                      Days: {reminder.days.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <button
                    onClick={() => {
                      playAlarmChime();
                      alert(`🔔 Test Trigger Alarm: "${reminder.title}" at ${reminder.time}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#f0f3ff] text-[#0050cb] hover:bg-[#dee8ff] text-xs font-semibold cursor-pointer"
                  >
                    Ring Test
                  </button>

                  {/* Toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reminder.enabled}
                      onChange={() => onToggleReminder(reminder.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#c2c6d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066ff]"></div>
                  </label>

                  <button
                    onClick={() => onDeleteReminder(reminder.id)}
                    className="p-2 text-[#ba1a1a] hover:bg-[#ffdad6]/50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Alarm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
