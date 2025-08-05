import React from 'react';
import type { Board, Effect } from '../types';
import Tile from './Tile';
import FloatingText from './FloatingText';
import { BOARD_SIZE } from '../constants';

const TILE_DIMENSION = 'clamp(2rem, 8vw, 3rem)';
const GAP_SIZE = '0.25rem';

const BackgroundGrid: React.FC = () => (
  <div className={`grid grid-cols-${BOARD_SIZE} gap-[${GAP_SIZE}]`}>
    {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => (
      <div
        key={i}
        className="bg-gray-700 rounded-md"
        style={{ width: TILE_DIMENSION, height: TILE_DIMENSION }}
      />
    ))}
  </div>
);

interface GameBoardProps {
    board: Board;
    effects: Effect[];
    onEffectComplete: (id: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, effects, onEffectComplete }) => {
  return (
    <div className={`relative bg-gray-900/50 p-2 rounded-lg shadow-2xl`}>
      <BackgroundGrid />
      <div className="absolute inset-0 p-2">
        {board.flatMap((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={tile.value !== null ? tile.id : `${rowIndex}-${colIndex}`}
              tile={tile}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
        {effects.map(effect => {
            if(effect.type === 'floating-score') {
                return (
                    <FloatingText 
                        key={effect.id}
                        text={effect.text}
                        row={effect.pos.r}
                        col={effect.pos.c}
                        onComplete={() => onEffectComplete(effect.id)}
                    />
                )
            }
            return null;
        })}
      </div>
    </div>
  );
};

export default GameBoard;
