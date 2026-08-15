import React, { useState } from 'react';
import { Quote, championQuotes, getDailyQuote, getRandomQuote } from '../data/quotes';
import { RefreshCw, Sparkles, Trophy, Flame } from 'lucide-react';

interface MotivationalQuoteBannerProps {
  compact?: boolean;
}

export const MotivationalQuoteBanner: React.FC<MotivationalQuoteBannerProps> = ({ compact = false }) => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(() => getDailyQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShuffle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote(currentQuote.id));
      setIsAnimating(false);
    }, 180);
  };

  const isRonaldo = currentQuote.author === 'Cristiano Ronaldo';

  if (compact) {
    return (
      <div className="w-full bg-gradient-to-r from-[#111c2d] to-[#003fa4] text-white rounded-2xl p-3.5 shadow-sm border border-[#0050cb]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs text-white shadow-md flex-shrink-0 ${
              isRonaldo ? 'bg-[#e50914]' : 'bg-[#0080ff]'
            }`}
          >
            {isRonaldo ? 'CR7' : 'VK18'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#dae1ff] flex items-center gap-1">
                <Trophy className="w-3 h-3 text-[#ffd700]" /> {currentQuote.author}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-white font-semibold">
                {currentQuote.category}
              </span>
            </div>
            <p className={`text-xs font-semibold text-white/90 truncate italic transition-opacity duration-200 ${isAnimating ? 'opacity-20' : 'opacity-100'}`}>
              "{currentQuote.quote}"
            </p>
          </div>
        </div>

        <button
          onClick={handleShuffle}
          title="Get another quote"
          className="self-end sm:self-center px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${isAnimating ? 'animate-spin' : ''}`} />
          <span>New Quote</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full bg-gradient-to-r from-[#0b1320] via-[#002b70] to-[#0050cb] text-white rounded-3xl p-5 md:p-6 shadow-md border border-[#0066ff]/40 my-4 group">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#0066ff]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#e50914]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Athlete Avatar Badge */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl p-0.5 shadow-lg flex items-center justify-center font-black text-lg text-white ${
                isRonaldo
                  ? 'bg-gradient-to-tr from-[#900] via-[#e50914] to-[#ff4d4d]'
                  : 'bg-gradient-to-tr from-[#003d99] via-[#0066ff] to-[#00bfff]'
              }`}
            >
              <div className="w-full h-full rounded-[14px] bg-[#0b1320] flex flex-col items-center justify-center border border-white/20">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#dae1ff]">
                  {isRonaldo ? 'CR7' : 'VK18'}
                </span>
                <span className="text-[10px] font-semibold text-white/70">{currentQuote.number}</span>
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#ffd700] text-[#111c2d] rounded-md text-[9px] font-black uppercase tracking-wider shadow-xs flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 fill-current text-[#111c2d]" /> Champion
            </span>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs font-extrabold tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" /> Everyday Champion Motivation
              </span>
              <span className="text-xs font-bold text-[#dae1ff]">• {currentQuote.author} ({currentQuote.role})</span>
            </div>

            <p
              className={`text-base md:text-lg font-bold text-white leading-snug italic transition-all duration-200 ${
                isAnimating ? 'opacity-10 scale-[0.99]' : 'opacity-100 scale-100'
              }`}
            >
              "{currentQuote.quote}"
            </p>

            <div className="text-[11px] text-[#dae1ff]/80 font-medium pt-0.5 flex items-center gap-2">
              <span>Category: <strong className="text-white">{currentQuote.category}</strong></span>
              <span>•</span>
              <span>Daily Mindset Booster for Rohit</span>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
          <button
            onClick={() => {
              const ronaldoQuotes = championQuotes.filter((q) => q.author === 'Cristiano Ronaldo');
              const next = ronaldoQuotes[Math.floor(Math.random() * ronaldoQuotes.length)];
              setCurrentQuote(next);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isRonaldo
                ? 'bg-[#e50914] text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            Cristiano Ronaldo
          </button>

          <button
            onClick={() => {
              const kohliQuotes = championQuotes.filter((q) => q.author === 'Virat Kohli');
              const next = kohliQuotes[Math.floor(Math.random() * kohliQuotes.length)];
              setCurrentQuote(next);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isRonaldo
                ? 'bg-[#0066ff] text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            Virat Kohli
          </button>

          <button
            onClick={handleShuffle}
            title="Random quote"
            className="p-2 bg-white text-[#111c2d] hover:bg-[#e7eeff] rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 text-[#0050cb] ${isAnimating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
