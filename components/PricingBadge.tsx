'use client';

interface PricingBadgeProps {
  onClick?: () => void;
}

export function PricingBadge({ onClick }: PricingBadgeProps) {
  return (
    <div className="absolute top-4 left-4 z-20 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
      <button
        onClick={onClick}
        className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5 cursor-pointer transition-all duration-300 hover:bg-black/30 hover:scale-105 hover:shadow-lg active:scale-100"
      >
        <div className="flex flex-col items-center gap-2 lg:gap-3 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-md">$395</span>
            <span className="text-white text-sm sm:text-base lg:text-lg drop-shadow-md">or</span>
            <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-md">$66/mo</span>
          </div>
          <div className="w-12 h-[1px] bg-white/40"></div>
          <div className="flex flex-col items-center gap-2 text-white text-xs sm:text-sm lg:text-base font-medium">
            <span className="whitespace-nowrap drop-shadow-md">HSA/FSA Accepted</span>
            <span className="whitespace-nowrap drop-shadow-md">Insurance Eligible</span>
            <span className="whitespace-nowrap drop-shadow-md">30-Day Guarantee</span>
          </div>
        </div>
      </button>
    </div>
  );
}
