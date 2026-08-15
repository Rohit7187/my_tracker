import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, UserPlus, Check, Trash2, Edit3, Shield, Users } from 'lucide-react';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: UserProfile[];
  activeProfileId: string;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (profileData: {
    userName: string;
    password?: string;
    roleTag: string;
    avatarUrl: string;
    waterGoalMl: number;
    stepsGoal: number;
    activeMinutesGoal: number;
  }) => void;
  onDeleteProfile: (profileId: string) => void;
}

const AVATAR_PRESETS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAmn_hYlRbFDNCvLOECqWeylGzSay9hNaCEu_yqbXWvqiuTItRXEdvXYonSmxG_suOBUqOZ4V4e6g5EBMpuhguNsqXOz4F8gMaswjyOGsA0UU42L7zC7AGAouR63iZ7Fe_LTrNo7CPQnSgvVzTJYc-0cdV3dNbcnTePrZwUEjK-5EJwlMaOb5PRxjl4dB0ljbQCgFs4zsXr5uOqmeRYhmMKETmem8y2r_2rsTRSC-KTIkS3C5reWV6lhQ',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [roleTag, setRoleTag] = useState('Personal');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [waterGoalMl, setWaterGoalMl] = useState(2500);
  const [stepsGoal, setStepsGoal] = useState(10000);
  const [activeMinutesGoal, setActiveMinutesGoal] = useState(60);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    onCreateProfile({
      userName: userName.trim(),
      password: password.trim() || undefined,
      roleTag: roleTag.trim() || 'User',
      avatarUrl,
      waterGoalMl: Number(waterGoalMl) || 2500,
      stepsGoal: Number(stepsGoal) || 10000,
      activeMinutesGoal: Number(activeMinutesGoal) || 60,
    });

    setUserName('');
    setPassword('');
    setRoleTag('Personal');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl card-shadow border border-[#dee8ff] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0050cb]" />
            <h3 className="text-xl font-bold text-[#111c2d]">Switch or Manage Profiles</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#5c5f61] hover:text-[#111c2d] p-1 rounded-lg hover:bg-[#f0f3ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCreating ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#5c5f61] uppercase">Active Profiles ({profiles.length})</span>
              <button
                onClick={() => setIsCreating(true)}
                className="px-3 py-1.5 rounded-xl bg-[#0066ff] text-white text-xs font-bold hover:bg-[#0050cb] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-4 h-4" /> Add Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profiles.map((profile) => {
                const isActive = profile.id === activeProfileId;
                return (
                  <div
                    key={profile.id}
                    onClick={() => {
                      onSelectProfile(profile.id);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative flex items-center gap-3 ${
                      isActive
                        ? 'border-[#0066ff] bg-[#e7eeff]/60 shadow-sm ring-1 ring-[#0066ff]'
                        : 'border-[#dee8ff] bg-white hover:bg-[#f0f3ff] hover:border-[#0066ff]/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0066ff] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={profile.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{profile.userName.charAt(0) || 'U'}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#111c2d] text-base truncate">
                          {profile.userName}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#0066ff] flex-shrink-0" />
                        )}
                      </div>
                      <span className="block text-xs font-semibold text-[#5c5f61]">
                        {profile.roleTag}
                      </span>
                      <span className="block text-[11px] text-[#4b5a70] mt-0.5">
                        Target: {(profile.waterGoalMl / 1000).toFixed(1)}L • {profile.stepsGoal.toLocaleString()} steps
                      </span>
                    </div>

                    {profiles.length > 1 && !isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete profile "${profile.userName}"?`)) {
                            onDeleteProfile(profile.id);
                          }
                        }}
                        className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]/60 rounded-lg transition-colors"
                        title="Delete profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Create Profile Form */
          <form onSubmit={handleCreateSubmit} className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-[#f0f3ff]">
              <h4 className="text-base font-bold text-[#0050cb]">Create New Profile</h4>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-xs font-semibold text-[#5c5f61] hover:text-[#111c2d]"
              >
                Back to Profiles
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="e.g. rohit123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-sm font-semibold text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#424656] mb-1">
                  Role / Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Personal"
                  value={roleTag}
                  onChange={(e) => setRoleTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f0f3ff] border border-[#c2c6d8]/50 text-sm text-[#111c2d] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#424656] mb-1.5">
                Choose Avatar
              </label>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {AVATAR_PRESETS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(url)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      avatarUrl === url ? 'border-[#0066ff] ring-2 ring-[#0066ff]/30 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Goals */}
            <div className="p-3 rounded-xl bg-[#f0f3ff] space-y-3">
              <span className="block text-xs font-bold text-[#0050cb] uppercase tracking-wider">
                Profile Goals & Targets
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#424656] mb-1">Water Goal (ml)</label>
                  <input
                    type="number"
                    step="100"
                    value={waterGoalMl}
                    onChange={(e) => setWaterGoalMl(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white text-xs border border-[#c2c6d8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#424656] mb-1">Steps Goal</label>
                  <input
                    type="number"
                    step="500"
                    value={stepsGoal}
                    onChange={(e) => setStepsGoal(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white text-xs border border-[#c2c6d8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#424656] mb-1">Active Mins</label>
                  <input
                    type="number"
                    step="5"
                    value={activeMinutesGoal}
                    onChange={(e) => setActiveMinutesGoal(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white text-xs border border-[#c2c6d8]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5c5f61] hover:bg-[#f0f3ff]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0066ff] text-white hover:bg-[#0050cb]"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
