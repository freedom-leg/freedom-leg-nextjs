'use client';

import { useState, useRef, useEffect } from 'react';

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom_Leg_3_How_it_Works.jpg',
    label: 'How it Works',
    description: 'The Freedom Leg transfers weight from your injured leg to your healthy leg through a knee pad system.',
    shortDescription: 'Transfers weight from injured leg to healthy leg through knee pad.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_1.png',
    label: 'Adjust and Attach',
    description: 'Simply adjust the brace to your measurements and secure it with the easy-to-use straps.',
    shortDescription: 'Adjust to your size and secure with easy straps.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_2.png',
    label: 'First Steps',
    description: 'Take your first hands-free steps with confidence. The brace provides full weight support.',
    shortDescription: 'Take hands-free steps with full weight support.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
    label: 'Regain your Freedom',
    description: 'Walk freely, climb stairs, and return to your daily activities without crutches.',
    shortDescription: 'Walk freely and return to daily activities.',
  },
];

export function HowItWorksSection() {
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

    // Determine swipe direction on first significant movement
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
    } else if (swipeDirection === 'vertical') {
      // Allow vertical scrolling by resetting drag state
      setIsDragging(false);
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
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
    <section className="py-20 lg:py-16 px-4 bg-[#f5f5f5] mt-16" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 lg:mb-12 text-[#333]">How It Works</h2>

        {/* Mobile and Tablet: Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded-lg px-4"
              style={{ touchAction: swipeDirection === 'horizontal' ? 'none' : 'pan-y' }}
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
                      className="absolute w-[92%] transition-all duration-300 ease-out"
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
                        className="w-full h-auto rounded-lg shadow-lg object-contain max-h-[340px]"
                        draggable="false"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="relative w-full" style={{ minHeight: '304px' }} />
            </div>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-[#333] mb-4">{slides[currentSlide].label}</h3>
              <p className="text-lg text-[#666] leading-relaxed max-w-2xl mx-auto">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="flex justify-center gap-2 mt-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 ${
                    currentSlide === index ? 'bg-[#0f766e] w-8' : 'bg-[#ddd]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Side-by-Side Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {slides.map((slide, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-bold text-[#333] mb-2">{slide.label}</h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {slide.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
