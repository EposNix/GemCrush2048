
import React from 'react';

const COMBO_MESSAGES = [
  '', // 0
  '', // 1
  'Double!', // 2
  'Sweet!', // 3
  'Awesome!', // 4
  'Super!', // 5
  'Unreal!', // 6
  'MONSTER COMBO!', // 7+
];

const animationStyles = `
  @keyframes combo-pop-in {
    0% { transform: scale(0.5) translateY(20px) rotate(-5deg); opacity: 0; }
    60% { transform: scale(1.1) translateY(0) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
  }
  .animate-combo-pop-in {
    animation: combo-pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

interface ComboCounterProps {
  count: number;
}

const ComboCounter: React.FC<ComboCounterProps> = ({ count }) => {
  if (count < 2) {
    return null;
  }

  const message = COMBO_MESSAGES[Math.min(count, COMBO_MESSAGES.length - 1)];

  let colorClass = 'text-sky-300';
  let sizeClass = 'text-5xl';
  if (count >= 7) {
    colorClass = 'text-red-400 animate-pulse';
    sizeClass = 'text-7xl';
  } else if (count >= 5) {
    colorClass = 'text-amber-300';
     sizeClass = 'text-6xl';
  }
  
  const textShadow = '0 3px 6px rgba(0,0,0,0.7)';

  return (
    <>
      <style>{animationStyles}</style>
      <div
        key={count} 
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[150%] z-40 text-center animate-combo-pop-in pointer-events-none`}
        style={{ textShadow }}
        aria-live="polite"
      >
        <p className={`text-3xl font-bold tracking-wider uppercase ${colorClass}`}>
          {message}
        </p>
        <p className={`font-extrabold ${colorClass} ${sizeClass}`}>
          x{count}
        </p>
      </div>
    </>
  );
};

export default ComboCounter;
