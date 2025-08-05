
import React from 'react';
import type { TileData } from '../types';
import { TILE_COLORS, BASE_TILE_STYLES } from '../constants';

const TILE_DIMENSION = 'clamp(2rem, 8vw, 3rem)';
const GAP_SIZE = '0.25rem';

interface TileProps {
  tile: TileData;
  row: number;
  col: number;
}

const Tile: React.FC<TileProps> = ({ tile, row, col }) => {
  const { value, isMatched, justSpawned } = tile;
  
  if (value === null) {
    return null;
  }

  const colorClass = value ? TILE_COLORS.get(value) || 'bg-gray-400' : '';
  
  const positionStyle: React.CSSProperties = {
    width: TILE_DIMENSION,
    height: TILE_DIMENSION,
    top: `calc(${row} * ( ${TILE_DIMENSION} + ${GAP_SIZE} ))`,
    left: `calc(${col} * ( ${TILE_DIMENSION} + ${GAP_SIZE} ))`,
    transition: 'top 0.15s ease-out, left 0.15s ease-out',
  };

  let animationClass = '';
  if (isMatched) {
    animationClass = 'animate-tile-pop';
  } else if (justSpawned) {
    animationClass = 'animate-tile-spawn';
  }

  return (
    <div
      className={`absolute ${BASE_TILE_STYLES} ${colorClass} ${animationClass}`}
      style={positionStyle}
    >
      {/* We can add tile.value here for debugging if needed */}
    </div>
  );
};

export default Tile;
