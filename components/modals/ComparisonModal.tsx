'use client';

import { useState, useRef, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

const comparisons = [
  {
    name: 'Crutches',
    rows: [
      ['Hands Free', 'No', 'Yes'],
      ['Stairs', 'Difficult', 'Easy'],
      ['Learning Curve', 'Moderate', 'Minimal'],
      ['Upper Body Strain', 'High', 'None'],
      ['Indoor Use', 'Good', 'Excellent'],
      ['Outdoor Use', 'Limited', 'All terrain'],
    ],
  },
  {
    name: 'Knee Walker',
    rows: [
      ['Hands Free', 'Yes', 'Yes'],
      ['Stairs', 'Impossible', 'Easy'],
      ['Portability', 'Bulky', 'Compact'],
      ['Tight Spaces', 'Difficult', 'Easy'],
      ['Indoor Use', 'Good', 'Excellent'],
      ['Outdoor Use', 'Limited', 'All terrain'],
    ],
  },
  {
    name: 'iWalk',
    rows: [
      ['Hands Free', 'Yes', 'Yes'],
      ['Stairs', 'Moderate', 'Easy'],
      ['Knee Pressure', 'High', 'Low'],
      ['Balance', 'High', 'Moderate'],
      ['Weight Dist.', 'Knee only', 'Thigh'],
      ['Comfort', 'Painful', 'Comfortable'],
    ],
  },
];

export function ComparisonModal({ isOpen, onClose, onOpenOrderModal }: ComparisonModalProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTab = () => {
    if (currentTab < comparisons.length - 1) {
      setCurrentTab((prev) => prev + 1);
    }
  };

  const prevTab = () => {
    if (currentTab > 0) {
      setCurrentTab((prev) => prev - 1);
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

    // Apply resistance at boundaries
    let offset = diff;
    if ((currentTab === 0 && diff > 0) || (currentTab === comparisons.length - 1 && diff < 0)) {
      offset = diff * 0.3; // Rubber band effect
    }

    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0 && currentTab < comparisons.length - 1) {
        nextTab();
      } else if (dragOffset > 0 && currentTab > 0) {
        prevTab();
      }
    }

    setDragOffset(0);
  };

  useEffect(() => {
    setDragOffset(0);
  }, [currentTab]);

  const handleOrderClick = () => {
    onClose();
    onOpenOrderModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Compare">
      <ModalBody>
        <div className="flex gap-2 mb-5 border-b-2 border-[#e0e0e0]">
          {comparisons.map((comp, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`flex-1 px-2 py-3 bg-none border-none border-b-[3px] text-[0.9em] font-semibold cursor-pointer transition-all duration-250 ${
                currentTab === index
                  ? 'text-[#0f766e] border-b-[#0f766e]'
                  : 'text-[#666] border-b-transparent hover:text-[#0f766e]'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-visible px-4 lg:px-0"
            style={{ touchAction: 'none' }}
          >
            <div className="flex items-start justify-center relative">
              {comparisons.map((comp, index) => {
                const offset = index - currentTab;
                const isActive = index === currentTab;
                const isVisible = Math.abs(offset) <= 1;

                let translateX = offset * 100;
                if (isDragging) {
                  const containerWidth = containerRef.current?.offsetWidth || 0;
                  translateX += (dragOffset / containerWidth) * 100;
                }

                const scale = isActive ? 1 : 0.75;
                const opacity = isActive ? 1 : 0.2;

                return (
                  <div
                    key={index}
                    className="absolute w-[92%] lg:w-[96%] transition-all duration-300 ease-out"
                    style={{
                      transform: `translateX(${translateX}%) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div>
                      <table className="w-full border-collapse mb-5 shadow-lg rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                              Feature
                            </th>
                            <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                              {comp.name}
                            </th>
                            <th className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] bg-[#f5f5f5] font-bold text-[#333]">
                              Freedom Leg
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {comp.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] font-semibold">
                                {row[0]}
                              </td>
                              <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] text-[#666]">
                                {row[1]}
                              </td>
                              <td className="p-3 text-left border-b border-[#e0e0e0] text-[0.9em] text-[#0f766e] font-semibold">
                                {row[2]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative w-full" style={{ minHeight: '450px' }} />
          </div>

          <button
            onClick={prevTab}
            disabled={currentTab === 0}
            className="hidden lg:flex absolute left-0 top-[200px] -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
            aria-label="Previous comparison"
          >
            ❮
          </button>
          <button
            onClick={nextTab}
            disabled={currentTab === comparisons.length - 1}
            className="hidden lg:flex absolute right-0 top-[200px] -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#0f766e] hover:text-white hover:border-[#0f766e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.9)] disabled:hover:text-[#333] disabled:hover:border-[#e0e0e0] z-10"
            aria-label="Next comparison"
          >
            ❯
          </button>
        </div>

        <div className="flex justify-center gap-2 my-5">
          {comparisons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-250 border-none ${
                currentTab === index ? 'bg-[#0f766e] w-6 rounded' : 'bg-[#ddd] w-2'
              }`}
              aria-label={`Go to ${comparisons[index].name} comparison`}
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          onClick={handleOrderClick}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(15,118,110,0.95)] hover:text-white hover:border-[#0f766e]"
        >
          Find my size
        </button>
      </ModalFooter>
    </Modal>
  );
}
