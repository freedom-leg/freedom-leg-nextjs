'use client';

import { useState, useEffect } from 'react';

interface StickyFooterProps {
  onOpenQuickAnswers: () => void;
  onOpenOrderModal: () => void;
}

export function StickyFooter({ onOpenQuickAnswers, onOpenOrderModal }: StickyFooterProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[998] bg-[rgba(255,255,255,0.95)] backdrop-blur-[16px] border-t border-[rgba(0,0,0,0.08)] p-[8px_10px] lg:p-[10px_20px] flex items-center justify-center lg:justify-between gap-[6px] lg:gap-[10px] shadow-[0_-2px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
        isHidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="hidden lg:block text-[1em] font-semibold text-[#333] flex-shrink-0">
        Have questions?
      </div>
      <div className="flex gap-[5px] lg:gap-2 flex-shrink-0">
        <button
          onClick={onOpenQuickAnswers}
          className="bg-[rgba(255,255,255,0.98)] text-[#333] border-2 border-[#e0e0e0] px-[10px] lg:px-4 py-2 lg:py-[10px] rounded-md font-bold text-[0.75em] lg:text-[0.85em] cursor-pointer transition-all duration-250 whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(15,118,110,0.2)]"
        >
          Quick Answers
        </button>
        <button
          onClick={() => window.location.href = 'https://www.freedomleg.com/pages/fitting'}
          className="bg-[rgba(255,255,255,0.98)] text-[#333] border-2 border-[#e0e0e0] px-[10px] lg:px-4 py-2 lg:py-[10px] rounded-md font-bold text-[0.75em] lg:text-[0.85em] cursor-pointer transition-all duration-250 whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(15,118,110,0.2)]"
        >
          Fitting Help
        </button>
        <button
          onClick={onOpenOrderModal}
          className="bg-[rgba(255,255,255,0.98)] text-[#333] border-2 border-[#e0e0e0] px-[10px] lg:px-4 py-2 lg:py-[10px] rounded-md font-bold text-[0.75em] lg:text-[0.85em] cursor-pointer transition-all duration-250 whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(15,118,110,0.2)]"
        >
          Find My Size
        </button>
      </div>
    </div>
  );
}
