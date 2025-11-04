'use client';

interface CTASectionProps {
  onOpenQuiz: () => void;
  onOpenComparison: () => void;
  onOpenVideo: () => void;
  onOpenHowItWorks: () => void;
}

export function CTASection({ onOpenQuiz, onOpenComparison, onOpenVideo, onOpenHowItWorks }: CTASectionProps) {
  return (
    <section className="bg-gradient-to-b from-[rgba(245,245,245,0.98)] to-[rgba(245,245,245,1)] p-[20px_15px] lg:p-[30px_15px] shadow-[0_-2px_20px_rgba(0,0,0,0.04)] relative z-20">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 max-w-[400px] lg:max-w-[800px] mx-auto mb-[15px]">
        <button
          onClick={onOpenQuiz}
          className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
        >
          Will this work for me?
        </button>
        <button
          onClick={onOpenComparison}
          className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
        >
          Compare alternatives
        </button>
        <button
          onClick={onOpenVideo}
          className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
        >
          Customer Stories
        </button>
        <button
          onClick={onOpenHowItWorks}
          className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
        >
          How it works
        </button>
      </div>
    </section>
  );
}
