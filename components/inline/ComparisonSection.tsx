'use client';

import { useState, useRef, useEffect } from 'react';

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

export function ComparisonSection() {
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
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    let offset = diff;
    if ((currentTab === 0 && diff > 0) || (currentTab === comparisons.length - 1 && diff < 0)) {
      offset = diff * 0.3;
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

  return (
    <section className="py-12 px-4 bg-white" id="comparison">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">Compare Alternatives</h2>

        <div className="lg:hidden flex gap-2 mb-8 border-b-2 border-[#e0e0e0]">
          {comparisons.map((comp, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(index)}
              className={`flex-1 px-4 py-4 bg-none border-none border-b-[3px] text-base font-semibold cursor-pointer transition-all duration-250 ${
                currentTab === index
                  ? 'text-[#0f766e] border-b-[#0f766e]'
                  : 'text-[#666] border-b-transparent hover:text-[#0f766e]'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {comparisons.map((comp, index) => (
            <div key={index} className="overflow-x-auto">
              <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="p-3 text-left border-b border-[#e0e0e0] text-sm bg-[#f5f5f5] font-bold text-[#333]">
                      Feature
                    </th>
                    <th className="p-3 text-left border-b border-[#e0e0e0] text-sm bg-[#f5f5f5] font-bold text-[#333]">
                      {comp.name}
                    </th>
                    <th className="p-3 text-left border-b border-[#e0e0e0] text-sm bg-[#0f766e] font-bold text-white">
                      Freedom Leg
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {comp.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-3 text-left border-b border-[#e0e0e0] text-sm font-semibold">
                        {row[0]}
                      </td>
                      <td className="p-3 text-left border-b border-[#e0e0e0] text-sm text-[#666]">
                        {row[1]}
                      </td>
                      <td className="p-3 text-left border-b border-[#e0e0e0] text-sm text-[#0f766e] font-semibold bg-[#f0fdfa]">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="lg:hidden relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-lg touch-pan-x px-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                    className="absolute w-[92%] transition-all duration-300 ease-out"
                    style={{
                      transform: `translateX(${translateX}%) scale(${scale})`,
                      opacity: isVisible ? opacity : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                          <tr>
                            <th className="p-4 text-left border-b border-[#e0e0e0] text-base bg-[#f5f5f5] font-bold text-[#333]">
                              Feature
                            </th>
                            <th className="p-4 text-left border-b border-[#e0e0e0] text-base bg-[#f5f5f5] font-bold text-[#333]">
                              {comp.name}
                            </th>
                            <th className="p-4 text-left border-b border-[#e0e0e0] text-base bg-[#f5f5f5] font-bold text-[#333]">
                              Freedom Leg
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {comp.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="p-4 text-left border-b border-[#e0e0e0] text-base font-semibold">
                                {row[0]}
                              </td>
                              <td className="p-4 text-left border-b border-[#e0e0e0] text-base text-[#666]">
                                {row[1]}
                              </td>
                              <td className="p-4 text-left border-b border-[#e0e0e0] text-base text-[#0f766e] font-semibold">
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

          <div className="flex justify-center gap-2 mt-8">
            {comparisons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 ${
                  currentTab === index ? 'bg-[#0f766e] w-8' : 'bg-[#ddd]'
                }`}
                aria-label={`Go to ${comparisons[index].name} comparison`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
