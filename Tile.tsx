
import React from 'react';
import type { TileData, PowerUpType } from '../types';
import { TILE_COLORS, BASE_TILE_STYLES } from '../constants';
import { ColorDrainIcon, ShuffleIcon, ExplosionIcon, EasyMergeIcon } from './PowerUpIcons';

const TILE_DIMENSION = 'clamp(2rem, 8vw, 3rem)';
const GAP_SIZE = '0.25rem';

const PowerUpIconMap: Record<PowerUpType, React.FC> = {
  'COLOR_DRAIN': ColorDrainIcon,
  'BOARD_SHUFFLE': ShuffleIcon,
  'COLOR_EXPLOSION': ExplosionIcon,
  'EASY_MERGE': EasyMergeIcon,
};

interface TileProps {
  tile: TileData;
  row: number;
  col: number;
}

const Tile: React.FC<TileProps> = ({ tile, row, col }) => {
  const { value, isMatched, justSpawned, powerUp } = tile;
  
  if (value === null) {
    return null;
  }

  const IconComponent = powerUp ? PowerUpIconMap[powerUp] : null;
  const colorClass = value ? TILE_COLORS.get(value) || '' : '';
  
  const positionStyle: React.CSSProperties = {
    width: TILE_DIMENSION,
    height: TILE_DIMENSION,
    transform: `translate(calc(${col} * (${TILE_DIMENSION} + ${GAP_SIZE})), calc(${row} * (${TILE_DIMENSION} + ${GAP_SIZE})))`,
    transition: 'transform 0.15s ease-out',
    zIndex: justSpawned ? 10 : 1,
  };

  let animationClass = '';
  if (isMatched) {
    animationClass = 'animate-tile-pop';
  } else if (justSpawned) {
    animationClass = 'animate-tile-spawn';
  }

  return (
    <div
      className="absolute"
      style={positionStyle}
    >
      <div className={`${BASE_TILE_STYLES} ${colorClass} ${animationClass}`}>
        {IconComponent && <IconComponent />}
      </div>
    </div>
  );
};

export default Tile;
