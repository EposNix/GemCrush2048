
import React from 'react';

const baseStyle: React.CSSProperties = {
  width: '60%',
  height: '60%',
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
};

export const ColorDrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={baseStyle} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" />
  </svg>
);
export const ShuffleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={baseStyle} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.69a8.25 8.25 0 00-11.664 0l-3.181 3.183" />
  </svg>
);
export const ExplosionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={baseStyle} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25m2.25-2.25L17.25 14.25M12 19.5l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25L9.75 14.25m2.25 2.25L12 17.25m0 0l2.25 2.25M12 4.5l2.25 2.25m0 0l2.25-2.25M14.25 6.75L12 9.75m2.25-3L12 4.5m0 0L9.75 6.75m0 0L7.5 4.5M9.75 6.75L12 9.75M4.5 12l2.25-2.25m0 0l2.25 2.25M6.75 9.75L9 12m-2.25 0L4.5 12" />
    </svg>
);
export const EasyMergeIcon = () => (
    <span className="font-extrabold text-2xl" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>2x</span>
);
