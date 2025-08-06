
import React from 'react';
import type { ActivePowerUps } from '../types';

interface ActivePowerUpDisplayProps {
  activePowerUps: ActivePowerUps;
}

const ActivePowerUpDisplay: React.FC<ActivePowerUpDisplayProps> = ({ activePowerUps }) => {
  const effects: string[] = [];
  if (activePowerUps.easyMerge > 0) {
    effects.push(`Easy Merge: ${activePowerUps.easyMerge} swipes`);
  }
  if (activePowerUps.colorDrain > 0) {
    effects.push(`Color Drain: ${activePowerUps.colorDrain} swipes`);
  }
  if (activePowerUps.colorExplosion) {
    effects.push('Color Bomb: Next Match!');
  }

  if (effects.length === 0) {
    return null;
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm p-3 px-5 rounded-lg shadow-lg border border-white/10 text-center">
        <span className="text-gray-400 text-sm font-semibold tracking-wider">ACTIVE EFFECTS</span>
        {effects.map(text => (
            <p key={text} className="text-lg font-bold text-green-300 animate-pulse">{text}</p>
        ))}
    </div>
  );
};

export default ActivePowerUpDisplay;
