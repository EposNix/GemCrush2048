
import React, { useState, useEffect, useCallback } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import ComboCounter from './components/ComboCounter';
import PowerUpTray from './components/PowerUpTray';
import ActivePowerUpDisplay from './components/ActivePowerUpDisplay';
import type { Direction, Effect } from './types';

const App: React.FC = () => {
  const [effects, setEffects] = useState<Effect[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  const handleMatch = useCallback((points: number, center: { r: number; c: number } | null) => {
    if (center) {
      const newEffect: Effect = {
        id: Date.now() + Math.random(),
        type: 'floating-score',
        text: `+${points}`,
        pos: center
      };
      setEffects(prev => [...prev, newEffect]);
    }
    if (points >= 150) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  }, []);
  
  const { board, score, comboCount, isGameOver, processMove, resetGame, collectedPowerUps, activePowerUps, isProcessing, activatePowerUp } = useGameLogic({ onMatch: handleMatch });
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    let direction: Direction | null = null;
    switch (e.key) {
      case 'ArrowUp': direction = 'up'; break;
      case 'ArrowDown': direction = 'down'; break;
      case 'ArrowLeft': direction = 'left'; break;
      case 'ArrowRight': direction = 'right'; break;
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
    const minSwipeDistance = 40;

    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > minSwipeDistance) processMove(dx > 0 ? 'right' : 'left');
    } else {
      if (Math.abs(dy) > minSwipeDistance) processMove(dy > 0 ? 'down' : 'up');
    }
    setTouchStart(null);
  };
  
  const handleEffectComplete = (id: number) => {
    setEffects(prev => prev.filter(effect => effect.id !== id));
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center p-4 transition-transform duration-75 ${isShaking ? 'animate-screen-shake' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <header className="text-center">
          <h1
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-violet-400"
            style={{ textShadow: '0 0 15px rgba(167, 139, 250, 0.4), 0 0 5px rgba(147, 197, 253, 0.3)' }}
          >
            Gem Crush 2048
          </h1>
          <p className="text-gray-300 mt-2 text-lg">Swipe to move. Match 3 or more to score!</p>
        </header>

        <div className="flex justify-between items-start w-full px-2 gap-4">
            <div className="bg-black/20 backdrop-blur-sm p-3 px-5 rounded-lg shadow-lg border border-white/10">
                <span className="text-gray-400 text-sm font-semibold tracking-wider">SCORE</span>
                <p className="text-3xl font-bold text-white">{score}</p>
            </div>
            <ActivePowerUpDisplay activePowerUps={activePowerUps} />
             <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-bold text-white shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 self-center"
            >
              New Game
            </button>
        </div>

        <div className="relative">
           <ComboCounter count={comboCount} />
          {isGameOver && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20">
              <h2 className="text-5xl font-bold text-red-500" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.7)' }}>Game Over</h2>
              <p className="text-2xl mt-4 text-white">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="mt-8 px-8 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-bold text-white shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          )}
          <GameBoard board={board} effects={effects} onEffectComplete={handleEffectComplete} />
        </div>
        <PowerUpTray 
            collected={collectedPowerUps}
            active={activePowerUps}
            onActivate={activatePowerUp}
            isDisabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default App;