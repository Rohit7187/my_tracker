import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  userName: string;
  expectedPassword?: string;
  onUnlock: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  userName,
  expectedPassword,
  onUnlock,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectedPassword || passwordInput.trim() === expectedPassword) {
      setErrorMsg('');
      setPasswordInput('');
      onUnlock();
    } else {
      setErrorMsg('Incorrect password! (Hint: rohit123)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md card-shadow border-2 border-[#0066ff] text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#f0f3ff] text-[#0050cb] flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 bg-[#e7eeff] text-[#0050cb] rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
            Protected Profile Access
          </span>
          <h3 className="text-2xl font-extrabold text-[#111c2d]">Welcome Back, {userName}</h3>
          <p className="text-xs text-[#5c5f61] mt-1">
            Enter your profile password to access your daily tasks, health logs & alarms.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="w-5 h-5 text-[#0050cb] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              required
              autoFocus
              placeholder="Enter password (rohit123)"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setErrorMsg('');
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f0f3ff] text-sm font-bold text-[#111c2d] border border-[#c2c6d8]/60 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 justify-center text-xs font-bold text-[#ba1a1a] bg-[#ffdad6]/60 p-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
