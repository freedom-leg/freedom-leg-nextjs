'use client';

import { useState, useRef, useEffect } from 'react';

const reviews = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Lee_Partyka.jpg',
    quote:
      'This is the best thing ever if you have to have a no weight bearing restrictions like I have for eight weeks. This should be a standard offering after surgery, even my orthopedic doctor was impressed',
    author: 'Lee Partyka — Bunion surgery',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Jeff_higgins.jpg',
    quote:
      'Freedom Leg Rocks! I am 4 weeks non-weight bearing following Achilles surgery last week. I use the Freedom Leg to get up and down stairs at home and use it for walks of up to a mile each day. I am very pleased with the product, it is well engineered, the components are very good and highly adjustable.',
    author: 'Jeff Higgins — Achilles surgery',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/image-2.png',
    quote:
      'The Freedom Leg has helped me stay on my job as a gymnastics coach. That would have been impossible with crutches and my knee couldn\'t take the pressure of a knee walker or iWalkfree.',
    author: 'Patty Steele — Knee surgery',
  },
];

export function ReviewSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'horizontal' | 'vertical' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < reviews.length - 1) {
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

    if (swipeDirection === null && (Math.abs(diffX) > 5 || Math.abs(diffY) > 5)) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setSwipeDirection('horizontal');
      } else {
        setSwipeDirection('vertical');
      }
    }

    if (swipeDirection === 'horizontal') {
      e.preventDefault();
      e.stopPropagation();

      let offset = diffX;
      if ((currentSlide === 0 && diffX > 0) || (currentSlide === reviews.length - 1 && diffX < 0)) {
        offset = diffX * 0.3;
      }

      setDragOffset(offset);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();

    if (swipeDirection === 'horizontal') {
      const threshold = 50;

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset < 0 && currentSlide < reviews.length - 1) {
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
    <section className="py-[30px_15px_20px] lg:py-[40px_20px_30px] bg-[rgba(245,245,245,0.5)]">
      <a
        href="https://www.freedomleg.com/products/freedom-leg-brace#judgeme_product_reviews"
        className="block text-center text-[0.9em] text-[#333] mb-[15px] cursor-pointer transition-colors duration-250 no-underline hover:text-[#0f766e] pt-5"
      >
        ⭐⭐⭐⭐⭐ 4.8/5 · 200+ reviews
      </a>

      <div className="lg:hidden px-[15px]">
        <div className="relative">
          <div
            ref={containerRef}
            className="relative overflow-visible rounded-lg"
            style={{ touchAction: isDragging ? 'none' : 'pan-y' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center">
              {reviews.map((review, index) => {
                const offset = index - currentSlide;
                const isActive = index === currentSlide;
                const isVisible = Math.abs(offset) <= 1;

                let translateX = offset * 100;
                if (isDragging) {
                  const containerWidth = containerRef.current?.offsetWidth || 0;
                  translateX += (dragOffset / containerWidth) * 100;
                }

                const scale = isActive ? 1 : 0.85;
                const opacity = isActive ? 1 : 0.4;

                return (
                  <div
                    key={index}
                    className="absolute w-[90%] transition-all duration-300 ease-out max-h-[80vh] overflow-y-auto"
                    style={{
                      top: '50%',
                      transform: `translateX(${translateX}%) translateY(-50%) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <div className="bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] border-2 border-[#e0e0e0] rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                      <img
                        src={review.image}
                        alt="Customer review"
                        className="w-full h-[350px] object-cover object-center rounded-md mb-[15px]"
                      />
                      <div className="text-[#0f766e] text-[1.1em] mb-3">⭐⭐⭐⭐⭐</div>
                      <p className="text-base leading-[1.6] text-[#333] mb-[15px] italic">
                        {review.quote}
                      </p>
                      <div className="text-[0.9em] text-[#666] font-semibold">{review.author}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative w-full" style={{ minHeight: 'min(715px, 80vh)' }} />
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 ${
                  currentSlide === index ? 'bg-[#0f766e] w-8' : 'bg-[#ddd]'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-5 max-w-[1200px] mx-auto px-5">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] border-2 border-[#e0e0e0] rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          >
            <img
              src={review.image}
              alt="Customer review"
              className="w-full h-[450px] object-cover object-center rounded-md mb-[15px]"
            />
            <div className="text-[#0f766e] text-[1.1em] mb-3">⭐⭐⭐⭐⭐</div>
            <p className="text-base leading-[1.6] text-[#333] mb-[15px] italic">{review.quote}</p>
            <div className="text-[0.9em] text-[#666] font-semibold">{review.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
