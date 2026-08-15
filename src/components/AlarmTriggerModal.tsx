import React, { useEffect } from 'react';
import { ReminderAlarm } from '../types';
import { BellRing, CheckCircle2, Clock, Volume2, X } from 'lucide-react';
import { playAlarmChime } from '../utils/sound';

interface AlarmTriggerModalProps {
  alarm: ReminderAlarm | null;
  profileName: string;
  onDismiss: () => void;
  onSnooze: () => void;
}

export const AlarmTriggerModal: React.FC<AlarmTriggerModalProps> = ({
  alarm,
  profileName,
  onDismiss,
  onSnooze,
}) => {
  useEffect(() => {
    if (alarm) {
      if (alarm.soundEnabled) {
        playAlarmChime();
      }
    }
  }, [alarm]);

  if (!alarm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-bounce-short">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm card-shadow border-2 border-[#0066ff] text-center space-y-5 relative overflow-hidden">
        {/* Animated Background Ring */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066ff]/10 rounded-full blur-xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-[#0066ff] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
          <BellRing className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 bg-[#dae1ff] text-[#003fa4] rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
            Alarm Alert • {profileName}
          </span>
          <h3 className="text-2xl font-extrabold text-[#111c2d]">{alarm.title}</h3>
          <p className="text-sm font-semibold text-[#0050cb] mt-1">Scheduled for {alarm.time}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onSnooze}
            className="py-3 px-4 rounded-xl bg-[#f0f3ff] text-[#0050cb] font-bold text-xs hover:bg-[#dee8ff] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-4 h-4" /> Snooze 5m
          </button>

          <button
            onClick={onDismiss}
            className="py-3 px-4 rounded-xl bg-[#0066ff] text-white font-bold text-xs hover:bg-[#0050cb] shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
