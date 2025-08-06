
import React from 'react';
import type { PowerUpType, ActivePowerUps } from '../types';
import { ColorDrainIcon, ShuffleIcon, ExplosionIcon, EasyMergeIcon } from './PowerUpIcons';

interface PowerUpTrayProps {
  collected: Map<PowerUpType, number>;
  active: ActivePowerUps;
  onActivate: (type: PowerUpType) => void;
  isDisabled: boolean;
}

const POWERUP_DEFINITIONS: Record<PowerUpType, { name: string; icon: React.FC; description: string; }> = {
    'COLOR_DRAIN': { name: 'Color Drain', icon: ColorDrainIcon, description: 'Fewer colors for 5 swipes.' },
    'BOARD_SHUFFLE': { name: 'Shuffle', icon: ShuffleIcon, description: 'Shuffle all tiles on the board.' },
    'COLOR_EXPLOSION': { name: 'Color Bomb', icon: ExplosionIcon, description: 'Next match clears all tiles of that color.' },
    'EASY_MERGE': { name: 'Easy Merge', icon: EasyMergeIcon, description: 'Match 2 tiles for 5 swipes.' }
};

const PowerUpButton: React.FC<{ type: PowerUpType; count: number; isActive: boolean; onClick: () => void; isDisabled: boolean; }> = 
({ type, count, isActive, onClick, isDisabled }) => {
    const { name, icon: Icon, description } = POWERUP_DEFINITIONS[type];
    
    const baseClasses = 'relative flex flex-col items-center justify-center w-20 h-20 rounded-lg shadow-lg border transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4';
    const activeClasses = isActive ? 'bg-green-500/50 border-green-400 ring-green-500/50' : 'bg-indigo-500/80 border-indigo-400/50 ring-purple-500/50';
    const disabledClasses = isDisabled || isActive ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600';

    return (
        <button
            onClick={onClick}
            disabled={isDisabled || isActive}
            className={`${baseClasses} ${activeClasses} ${disabledClasses}`}
            title={`${name}: ${description}`}
            aria-label={`Activate ${name} power-up, ${count} available`}
        >
            <div className="w-10 h-10 flex items-center justify-center text-white"><Icon /></div>
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-slate-800">{count}</span>
            {isActive && <div className="absolute inset-0 bg-black/50 rounded-lg animate-pulse"></div>}
        </button>
    );
};

const PowerUpTray: React.FC<PowerUpTrayProps> = ({ collected, active, onActivate, isDisabled }) => {
    const powerUpsToShow = Object.keys(POWERUP_DEFINITIONS) as PowerUpType[];

    const hasCollectedPowerups = Array.from(collected.values()).some(count => count > 0);

    return (
        <div className="w-full max-w-md mt-4">
            <div className="flex justify-center items-center gap-4 p-2 bg-black/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 min-h-[104px]">
                {powerUpsToShow.map(type => {
                    const count = collected.get(type) || 0;
                    if (count === 0) return null;

                    const isActive = (type === 'COLOR_DRAIN' && active.colorDrain > 0) ||
                                     (type === 'EASY_MERGE' && active.easyMerge > 0) ||
                                     (type === 'COLOR_EXPLOSION' && active.colorExplosion);

                    return (
                        <PowerUpButton 
                            key={type}
                            type={type}
                            count={count}
                            isActive={isActive}
                            onClick={() => onActivate(type)}
                            isDisabled={isDisabled}
                        />
                    );
                })}
                 {!hasCollectedPowerups && (
                    <p className="text-gray-400 p-4 text-center">Match gems with icons to collect power-ups!</p>
                )}
            </div>
        </div>
    );
};

export default PowerUpTray;
