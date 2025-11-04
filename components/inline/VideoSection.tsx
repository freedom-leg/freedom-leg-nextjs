'use client';

import { useState, useRef, useEffect } from 'react';

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

export function VideoSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

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
    <section className="py-12 px-4 bg-[#f5f5f5]" id="video">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">
          Patient Stories
        </h2>
        <div className="relative">
          <div
            ref={containerRef}
            className="relative overflow-visible rounded-lg touch-pan-x px-4 lg:px-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center">
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
                      top: '50%',
                      transform: `translateX(${translateX}%) translateY(-50%) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                      {isActive && (
                        <iframe
                          src={`https://youtube.com/embed/${video.videoId}?controls=1`}
                          allow="encrypted-media"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full border-none"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative w-full lg:hidden" style={{ minHeight: 'calc(92vw * 0.5625)' }} />
            <div className="relative w-full hidden lg:block" style={{ minHeight: 'min(calc(95vw * 0.5625), 540px)' }} />
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center cursor-pointer text-xl lg:text-2xl text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
              aria-label="Previous video"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === videos.length - 1}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center cursor-pointer text-xl lg:text-2xl text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
              aria-label="Next video"
            >
              ❯
            </button>
          </div>

          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-[#333] mb-2">{videos[currentSlide].tagline}</h3>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 ${
                  currentSlide === index ? 'bg-[#0f766e] w-8' : 'bg-[#ddd]'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
