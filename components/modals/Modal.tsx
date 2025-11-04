'use client';

import { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  progressStep?: 'Explore' | 'Learn' | 'Compare' | 'Order';
  title?: string;
  showProgress?: boolean;
}

export function Modal({ isOpen, onClose, children, progressStep, title, showProgress = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = ['Explore', 'Learn', 'Compare', 'Order'];

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[999] flex items-center justify-center transition-opacity duration-400 overflow-y-auto p-4 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-[rgba(255,255,255,0.80)] backdrop-blur-[6px] rounded-lg border border-[rgba(255,255,255,0.5)] w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[800px] max-h-[90vh] overflow-y-auto relative shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-400 my-auto ${
          isOpen ? 'translate-y-0' : '-translate-y-5'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-[15px] lg:p-5 lg:px-[22px] border-b border-[#ddd] flex justify-between items-center">
          {showProgress && progressStep && (
            <div className="flex justify-center gap-[10px] text-[0.85em] text-[#666]">
              {steps.map((step, index) => (
                <span key={step}>
                  <span className={step === progressStep ? 'text-[#0f766e] font-bold' : ''}>
                    {step}
                  </span>
                  {index < steps.length - 1 && <span className="mx-[5px]">→</span>}
                </span>
              ))}
            </div>
          )}
          {title && !showProgress && (
            <h2 className="m-0 text-[1.3em]">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="bg-none border-none text-[1.5em] cursor-pointer text-[#666] p-[5px_10px] leading-none hover:text-[#333]"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return <div className={`p-[20px_15px] lg:p-[35px_22px] ${className}`}>{children}</div>;
}

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="p-[20px_22px] border-t border-[#ddd] flex flex-col lg:flex-row gap-[10px] lg:justify-between">
      {children}
    </div>
  );
}
