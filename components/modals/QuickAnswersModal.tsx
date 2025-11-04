'use client';

import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';

interface QuickAnswersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

const faqs = [
  {
    question: '💰 Pricing & Financing',
    answer:
      '$395 — Insurance code L2136 • HSA/FSA eligible\n\n✓ 0% financing — Just $66/month for 6 months\n✓ 30-day money-back guarantee\n✓ Free 2-3 day delivery (ships same day)\n✓ Eligible for insurance reimbursement (code L2136)\n\nThat\'s less than $6/day during your recovery',
  },
  {
    question: '💳 Insurance & HSA/FSA',
    answer:
      'Eligible for insurance reimbursement. Call your insurance (number on card) and ask about coverage for code L2136. We accept FSA/HSA cards directly. Most patients purchase first, then submit our invoice for reimbursement—the quickest way to get reimbursed.',
  },
  {
    question: '📦 Return Policy',
    answer:
      '30-day trial period. Return in good condition for a full refund. Ship to: 6776 Townsend Rd, Lot 199, Jacksonville, FL 32244. Include name used for order. Brace must be free of animal hair and undamaged.',
  },
  {
    question: '🚚 Shipping',
    answer:
      'USA: Free 2-3 day delivery. Ships same day if ordered before 2pm EST. Expedited: $50\nCanada: Standard $20, Expedited $60\nInternational: Worldwide shipping available. Price calculated at checkout (duties may apply).',
  },
];

export function QuickAnswersModal({ isOpen, onClose, onOpenOrderModal }: QuickAnswersModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleOrderClick = () => {
    onClose();
    onOpenOrderModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Answers" showProgress={false}>
      <ModalBody>
        <div className="mt-[10px]">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#e0e0e0] last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="bg-none border-none w-full text-left py-4 text-base font-semibold text-[#333] cursor-pointer flex justify-between items-center transition-colors duration-250 hover:text-[#0f766e]"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-[1.2em] transition-transform duration-250 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-[500px] pb-4' : 'max-h-0 p-0'
                }`}
              >
                <p className="text-[0.95em] leading-[1.6] text-[#666] m-0 whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={() =>
            (window.location.href = 'https://www.freedomleg.com/pages/frequently-asked-questions')
          }
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] order-1"
        >
          View all FAQs
        </button>
        <button
          onClick={handleOrderClick}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] order-2"
        >
          I'm ready to order
        </button>
        <button
          onClick={() => (window.location.href = 'https://www.freedomleg.com/pages/fitting')}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e] order-3"
        >
          Fitting Guide
        </button>
      </ModalFooter>
    </Modal>
  );
}
