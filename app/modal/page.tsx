'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { ReviewSection } from '@/components/ReviewSection';
import { StickyFooter } from '@/components/StickyFooter';
import { QuizModal } from '@/components/modals/QuizModal';
import { VideoModal } from '@/components/modals/VideoModal';
import { ComparisonModal } from '@/components/modals/ComparisonModal';
import { HowItWorksModal } from '@/components/modals/HowItWorksModal';
import { QuickAnswersModal } from '@/components/modals/QuickAnswersModal';
import { OrderModal } from '@/components/modals/OrderModal';

export default function ModalVersion() {
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [quickAnswersModalOpen, setQuickAnswersModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onPricingClick={() => setOrderModalOpen(true)} />
      <CTASection
        onOpenQuiz={() => setQuizModalOpen(true)}
        onOpenComparison={() => setComparisonModalOpen(true)}
        onOpenVideo={() => setVideoModalOpen(true)}
        onOpenHowItWorks={() => setHowItWorksModalOpen(true)}
      />
      <ReviewSection />
      <StickyFooter
        onOpenQuickAnswers={() => setQuickAnswersModalOpen(true)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />
      <QuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />
      <ComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />
      <HowItWorksModal isOpen={howItWorksModalOpen} onClose={() => setHowItWorksModalOpen(false)} />
      <QuickAnswersModal
        isOpen={quickAnswersModalOpen}
        onClose={() => setQuickAnswersModalOpen(false)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
      />
      <OrderModal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} />
    </div>
  );
}
