import React, { useState } from 'react';
import { getDailyQuote, Quote, getRandomQuote } from '../data/quotes';
import { Sparkles, Trophy, X, RefreshCw, ArrowRight, Flame } from 'lucide-react';

interface OpeningQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const OpeningQuoteModal: React.FC<OpeningQuoteModalProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  const [quote, setQuote] = useState<Quote>(() => getDailyQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const isRonaldo = quote.author === 'Cristiano Ronaldo';

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setQuote(getRandomQuote(quote.id));
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative bg-gradient-to-b from-[#0b1320] via-[#002b70] to-[#0b1320] text-white rounded-3xl p-6 md:p-8 w-full max-w-lg card-shadow border-2 border-[#0066ff] space-y-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/40 text-[#ffd700] text-xs font-black uppercase tracking-widest mx-auto">
          <Sparkles className="w-3.5 h-3.5" /> Everyday Champion Quote
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Rise & Shine, {userName}!
          </h2>
          <p className="text-xs md:text-sm text-[#dae1ff] mt-1">
            Today's motivational mindset to fuel your goals.
          </p>
        </div>

        {/* Quote Card Box */}
        <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider ${
                  isRonaldo ? 'bg-[#e50914] text-white' : 'bg-[#0080ff] text-white'
                }`}
              >
                {isRonaldo ? 'CR7' : 'VK18'}
              </span>
              <span className="text-xs font-bold text-white/80">{quote.author}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#ffd700] flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current text-[#ffd700]" /> {quote.category}
            </span>
          </div>

          <p
            className={`text-lg md:text-xl font-extrabold text-white leading-relaxed italic transition-all duration-200 ${
              isAnimating ? 'opacity-10 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            "{quote.quote}"
          </p>

          <p className="text-xs text-[#dae1ff]/80 font-medium">
            — {quote.role}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
            Another Quote
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0050cb] text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Let's Win Today <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
