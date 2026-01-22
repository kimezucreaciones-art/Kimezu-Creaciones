import React from 'react';

interface SectionSeparatorProps {
  icon?: 'star' | 'flower' | 'diamond';
  className?: string;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({ icon = 'star', className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center gap-4 py-4 md:py-12 opacity-60 ${className}`}>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-kimezu-card to-transparent"></div>
      <div className="text-kimezu-pink animate-pulse">
        {icon === 'star' && <span className="text-xl">✦</span>}
        {icon === 'flower' && <span className="text-xl">❀</span>}
        {icon === 'diamond' && <span className="text-xl">❖</span>}
      </div>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-kimezu-card to-transparent"></div>
    </div>
  );
};