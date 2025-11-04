'use client';

import { useState, useEffect } from 'react';
import { PricingBadge } from './PricingBadge';

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Hand-Holding-Photo.jpg',
    title: 'Keep on Living. Ditch the Crutches.',
    subtitle: '100% non-weightbearing support for your injured leg',
    zoomClass: 'zoom-1',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Lifting-up.jpg',
    title: 'Walk Hands-Free During Recovery',
    subtitle: 'Takes 100% of weight off your injured leg',
    zoomClass: 'zoom-2',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking-Daughter-587818.jpg',
    title: 'Regain Your Freedom',
    subtitle: 'Crutch-free mobility with full weight support',
    zoomClass: 'zoom-3',
  },
];

interface HeroProps {
  onPricingClick?: () => void;
}

export function Hero({ onPricingClick }: HeroProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-[800ms] ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } ${index === currentSlide ? slide.zoomClass : ''}`}
            style={{ backgroundImage: `url(${slide.image})`, willChange: 'transform' }}
          />
        ))}
      </div>
      <PricingBadge onClick={onPricingClick} />
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 px-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-[800ms] absolute ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="text-[2.5em] sm:text-[3em] lg:text-[3.75em] font-bold mb-4 leading-[1.1] drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-[1.25em] sm:text-[1.5em] lg:text-[1.75em] font-normal leading-[1.5] drop-shadow-md">
              {slide.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
