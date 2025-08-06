import React, { useEffect, useRef } from 'react';

const TILE_DIMENSION = 'clamp(2rem, 8vw, 3rem)';
const GAP_SIZE = '0.25rem';

interface FloatingTextProps {
  text: string;
  row: number;
  col: number;
  onComplete: () => void;
}

const FloatingText: React.FC<FloatingTextProps> = ({ text, row, col, onComplete }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const handleAnimationEnd = () => {
      onComplete();
    };
    if (node) {
      node.addEventListener('animationend', handleAnimationEnd);
      return () => {
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [onComplete]);

  const positionStyle: React.CSSProperties = {
    top: `calc(${row} * ( ${TILE_DIMENSION} + ${GAP_SIZE} ))`,
    left: `calc(${col} * ( ${TILE_DIMENSION} + ${GAP_SIZE} ) + (${TILE_DIMENSION} / 2))`,
    transform: 'translateX(-50%)',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  return (
    <div
      ref={ref}
      className="absolute text-3xl font-bold text-yellow-300 pointer-events-none animate-float-up z-30"
      style={positionStyle}
      aria-hidden="true"
    >
      {text}
    </div>
  );
};

export default FloatingText;
