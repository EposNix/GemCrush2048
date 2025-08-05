import React, { useState, useEffect, useCallback } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import type { Direction, Effect } from './types';

const App: React.FC = () => {
  const [effects, setEffects] = useState<Effect[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  const handleMatch = useCallback((count: number, center: { r: number; c: number } | null) => {
    if (center) {
      const newEffect: Effect = {
        id: Date.now() + Math.random(),
        type: 'floating-score',
        text: `+${count * 10}`,
        pos: center
      };
      setEffects(prev => [...prev, newEffect]);
    }
    if (count >= 8) { // Trigger screen shake for large matches
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 250);
    }
  }, []);
  
  const { board, score, isGameOver, processMove, resetGame } = useGameLogic({ onMatch: handleMatch });
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    let direction: Direction | null = null;
    switch (e.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
    if (direction) {
      processMove(direction);
    }
  }, [processMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || e.changedTouches.length === 0) return;
    const [startX, startY] = touchStart;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - startX;
    const dy = endY - startY;
    const minSwipeDistance = 40;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > minSwipeDistance) {
        processMove(dx > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(dy) > minSwipeDistance) {
        processMove(dy > 0 ? 'down' : 'up');
      }
    }
    setTouchStart(null);
  };
  
  const handleEffectComplete = (id: number) => {
    setEffects(prev => prev.filter(effect => effect.id !== id));
  };

  return (
    <div
      className={`w-full min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4 transition-transform duration-75 ${isShaking ? 'animate-screen-shake' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500">
            Gem Crush 2048
          </h1>
          <p className="text-gray-400 mt-2">Swipe to move. Match 3 or more to score!</p>
        </header>

        <div className="flex justify-between w-full max-w-lg px-4">
            <div className="bg-gray-700 p-3 rounded-lg shadow-md">
                <span className="text-gray-400 text-sm font-semibold">SCORE</span>
                <p className="text-2xl font-bold">{score}</p>
            </div>
             <button
              onClick={resetGame}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-white shadow-lg transition-transform transform hover:scale-105"
            >
              New Game
            </button>
        </div>

        <div className="relative">
          {isGameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg z-20">
              <h2 className="text-4xl font-bold text-red-500">Game Over</h2>
              <p className="text-xl mt-2">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-white"
              >
                Play Again
              </button>
            </div>
          )}
          <GameBoard board={board} effects={effects} onEffectComplete={handleEffectComplete} />
        </div>
      </div>
    </div>
  );
};

export default App;