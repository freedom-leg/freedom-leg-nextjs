'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector('.site-header');
      if (header && !header.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="bg-white px-5 py-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex justify-between items-center relative site-header">
      <img
        src="https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom_Leg_Logo_1-10-13.png"
        alt="Freedom Leg"
        className="h-[56px] lg:h-[64px] w-auto max-w-[250px] object-contain"
      />
      <button
        className="lg:hidden block bg-none border-none cursor-pointer p-[5px] z-[1001]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span
          className={`block w-[25px] h-[2px] bg-[#333] relative transition-all duration-250 ${
            isMenuOpen ? 'bg-transparent' : ''
          }
            before:content-[''] before:block before:w-[25px] before:h-[2px] before:bg-[#333] before:absolute before:transition-transform before:duration-250 ${
              isMenuOpen ? 'before:rotate-45 before:top-0' : 'before:top-[-8px]'
            }
            after:content-[''] after:block after:w-[25px] after:h-[2px] after:bg-[#333] after:absolute after:transition-transform after:duration-250 ${
              isMenuOpen ? 'after:-rotate-45 after:top-0' : 'after:top-[8px]'
            }`}
        />
      </button>
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } lg:flex absolute lg:static top-full left-0 right-0 bg-white flex-col lg:flex-row gap-0 lg:gap-5 items-stretch lg:items-center shadow-[0_4px_8px_rgba(0,0,0,0.1)] lg:shadow-none z-[1000]`}
      >
        <a
          href="https://www.freedomleg.com/blogs/news"
          className="text-[#333] no-underline text-[0.95em] font-medium transition-colors duration-250 p-[15px_20px] lg:p-0 border-b border-[#e0e0e0] lg:border-b-0 hover:text-[#0f766e] hover:bg-[#f5f5f5] lg:hover:bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        >
          Blog
        </a>
        <a
          href="https://www.freedomleg.com/pages/frequently-asked-questions"
          className="text-[#333] no-underline text-[0.95em] font-medium transition-colors duration-250 p-[15px_20px] lg:p-0 border-b border-[#e0e0e0] lg:border-b-0 hover:text-[#0f766e] hover:bg-[#f5f5f5] lg:hover:bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        >
          FAQ
        </a>
        <a
          href="https://www.freedomleg.com/pages/fitting"
          className="text-[#333] no-underline text-[0.95em] font-medium transition-colors duration-250 p-[15px_20px] lg:p-0 border-b border-[#e0e0e0] lg:border-b-0 hover:text-[#0f766e] hover:bg-[#f5f5f5] lg:hover:bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        >
          Fitting Guide
        </a>
        <a
          href="https://www.freedomleg.com/products/freedom-leg-brace#judgeme_product_reviews"
          className="text-[#333] no-underline text-[0.95em] font-medium transition-colors duration-250 p-[15px_20px] lg:p-0 border-b border-[#e0e0e0] lg:border-b-0 hover:text-[#0f766e] hover:bg-[#f5f5f5] lg:hover:bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        >
          Reviews
        </a>
      </nav>
    </header>
  );
}
