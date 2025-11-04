'use client';

import { useState, useRef, useEffect } from 'react';
import { Modal, ModalFooter } from './Modal';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

const videos = [
  {
    videoId: 'rM1DegIynKM',
    tagline: 'See What Doctors Are Saying',
  },
  {
    videoId: 'ZKAAO9KCbYU',
    tagline: 'Christy Regains Her Freedom',
  },
  {
    videoId: 'TrF_XIClYBc',
    tagline: "Bode's Recovery",
  },
];

export function VideoModal({ isOpen, onClose, onOpenOrderModal }: VideoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOrderClick = () => {
    onClose();
    onOpenOrderModal();
  };

  const nextSlide = () => {
    if (currentSlide < videos.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    let offset = diff;
    if ((currentSlide === 0 && diff > 0) || (currentSlide === videos.length - 1 && diff < 0)) {
      offset = diff * 0.3;
    }

    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0 && currentSlide < videos.length - 1) {
        nextSlide();
      } else if (dragOffset > 0 && currentSlide > 0) {
        prevSlide();
      }
    }

    setDragOffset(0);
  };

  useEffect(() => {
    setDragOffset(0);
  }, [currentSlide]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Learn">
      <div className="p-0">
        <h2 className="px-[22px] pt-5 pb-[15px] m-0 text-[1.4em]">Patient Stories</h2>
        <div
          ref={containerRef}
          className="relative overflow-visible mt-4 pt-8"
          style={{ touchAction: 'none' }}
        >
          <div className="flex items-center justify-center relative min-h-[300px] lg:min-h-[400px]">
            {videos.map((video, index) => {
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
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    opacity: isVisible ? opacity : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    zIndex: isActive ? 2 : 1,
                    top: '0',
                  }}
                >
                  <div className="relative w-full aspect-video overflow-hidden m-0 rounded-lg shadow-lg">
                    {isOpen && isActive && (
                      <iframe
                        src={`https://youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=1`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-none"
                      />
                    )}
                    {/* Transparent overlay to capture touch events for swiping */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        pointerEvents: isActive ? 'auto' : 'none',
                        background: 'transparent',
                      }}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onClick={(e) => {
                        // Allow clicks to pass through to iframe controls if not dragging
                        if (Math.abs(dragOffset) < 5) {
                          e.currentTarget.style.pointerEvents = 'none';
                          setTimeout(() => {
                            if (e.currentTarget) {
                              e.currentTarget.style.pointerEvents = 'auto';
                            }
                          }, 0);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="hidden lg:flex absolute left-2 top-[calc(50%-16px)] -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
            aria-label="Previous video"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === videos.length - 1}
            className="hidden lg:flex absolute right-2 top-[calc(50%-16px)] -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
            aria-label="Next video"
          >
            ❯
          </button>
        </div>
        <div className="text-center mt-6 px-[22px]">
          <div className="text-[1.1em] font-semibold text-[#333]">
            {videos[currentSlide].tagline}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4 pb-5">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer transition-all duration-250 ${
                currentSlide === index ? 'bg-[#0f766e]' : 'bg-[#ddd]'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={handleOrderClick}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e]"
        >
          I'm ready to order
        </button>
      </ModalFooter>
    </Modal>
  );
}
