'use client';

import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ReviewSection } from '@/components/ReviewSection';
import { VideoSection } from '@/components/inline/VideoSection';
import { ComparisonSection } from '@/components/inline/ComparisonSection';
import { HowItWorksSection } from '@/components/inline/HowItWorksSection';
import { OrderSection } from '@/components/inline/OrderSection';
import { QuizModal } from '@/components/modals/QuizModal';
import { QuickAnswersModal } from '@/components/modals/QuickAnswersModal';
import { OrderModal } from '@/components/modals/OrderModal';
import { SizingGuideModal } from '@/components/modals/SizingGuideModal';

export default function HybridVersion() {
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quickAnswersModalOpen, setQuickAnswersModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [sizingGuideModalOpen, setSizingGuideModalOpen] = useState(false);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  const scrollToOrderSection = () => {
    orderSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      <Header />
      <Hero onPricingClick={scrollToOrderSection} />

      <section className="bg-gradient-to-b from-[rgba(245,245,245,0.98)] to-[rgba(245,245,245,1)] p-[20px_15px] lg:p-[30px_15px] shadow-[0_-2px_20px_rgba(0,0,0,0.04)] relative z-20">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 max-w-[400px] lg:max-w-[900px] mx-auto mb-[15px]">
          <button
            onClick={() => setQuizModalOpen(true)}
            className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
          >
            Will this work for me?
          </button>
          <button
            onClick={() => setQuickAnswersModalOpen(true)}
            className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,118,110,0.2)] active:translate-y-0"
          >
            Quick Answers
          </button>
          <button
            onClick={() => setSizingGuideModalOpen(true)}
            className="inline-block px-5 lg:px-6 py-3 lg:py-[14px] text-[0.85em] lg:text-base font-bold uppercase tracking-[0.08em] rounded-lg border-[3px] border-[#333] cursor-pointer transition-all duration-250 no-underline min-h-[44px] leading-[1.3] bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] text-[#333] shadow-[0_3px_6px_rgba(0,0,0,0.12)] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] hover:-translate-y-0.5 hover:shadow-[0_5px_10px_rgba(15,118,110,0.25)] active:translate-y-0"
          >
            Find My Size
          </button>
        </div>
      </section>

      <VideoSection />
      <HowItWorksSection />
      <ComparisonSection />
      <ReviewSection />
      <div ref={orderSectionRef}>
        <OrderSection />
      </div>

      <QuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onOpenOrderModal={() => {
          setQuizModalOpen(false);
          setOrderModalOpen(true);
        }}
      />
      <QuickAnswersModal
        isOpen={quickAnswersModalOpen}
        onClose={() => setQuickAnswersModalOpen(false)}
        onOpenOrderModal={() => {
          setQuickAnswersModalOpen(false);
          setOrderModalOpen(true);
        }}
      />
      <OrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
      <SizingGuideModal
        isOpen={sizingGuideModalOpen}
        onClose={() => setSizingGuideModalOpen(false)}
        onGoToOrder={scrollToOrderSection}
      />
    </div>
  );
}
