'use client';

import { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody } from './Modal';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom_Leg_3_How_it_Works.jpg',
    label: 'How it Works',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_1.png',
    label: 'Adjust and Attach',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_2.png',
    label: 'First Steps',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
    label: 'Regain your Freedom',
  },
];

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'horizontal' | 'vertical' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // Determine swipe direction on first significant movement (lower threshold for faster detection)
    if (swipeDirection === null && (Math.abs(diffX) > 5 || Math.abs(diffY) > 5)) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setSwipeDirection('horizontal');
      } else {
        setSwipeDirection('vertical');
      }
    }

    // Only handle horizontal swipes for carousel navigation
    if (swipeDirection === 'horizontal') {
      e.preventDefault();
      e.stopPropagation();

      // Apply resistance at boundaries
      let offset = diffX;
      if ((currentSlide === 0 && diffX > 0) || (currentSlide === slides.length - 1 && diffX < 0)) {
        offset = diffX * 0.3; // Rubber band effect
      }

      setDragOffset(offset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();

    if (swipeDirection === 'horizontal') {
      const threshold = 50;

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset < 0 && currentSlide < slides.length - 1) {
          nextSlide();
        } else if (dragOffset > 0 && currentSlide > 0) {
          prevSlide();
        }
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setSwipeDirection(null);
  };

  useEffect(() => {
    setDragOffset(0);
  }, [currentSlide]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Learn">
      <ModalBody>
        <div className="relative">
          <div
            ref={containerRef}
            className="relative overflow-visible rounded-lg px-4 lg:px-0"
            style={{ touchAction: isDragging ? 'none' : 'pan-y' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center">
              {slides.map((slide, index) => {
                const offset = index - currentSlide;
                const isActive = index === currentSlide;
                const isVisible = Math.abs(offset) <= 1;

                let translateX = offset * 100;
                if (isDragging) {
                  const containerWidth = containerRef.current?.offsetWidth || 0;
                  translateX += (dragOffset / containerWidth) * 100;
                }

                const scale = isActive ? 1 : 0.75;
                const opacity = isActive ? 1 : 0.3;

                return (
                  <div
                    key={index}
                    className="absolute w-[92%] lg:w-[95%] transition-all duration-300 ease-out"
                    style={{
                      top: '50%',
                      transform: `translateX(${translateX}%) translateY(-50%) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.label}
                      className="w-full h-auto rounded-lg object-contain max-h-[400px]"
                      draggable="false"
                    />
                  </div>
                );
              })}
            </div>
            <div className="relative w-full" style={{ minHeight: '400px' }} />
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>

          <div className="text-center mt-5">
            <div className="text-[1.2em] font-bold text-[#333]">
              {slides[currentSlide].label}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer transition-all duration-250 ${
                  currentSlide === index ? 'bg-[#0f766e]' : 'bg-[#ddd]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
