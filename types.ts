
export type TileValue = number | null;

export type PowerUpType = 'COLOR_DRAIN' | 'BOARD_SHUFFLE' | 'COLOR_EXPLOSION' | 'EASY_MERGE';

export interface TileData {
  id: number;
  value: TileValue;
  powerUp?: PowerUpType;
  isMatched?: boolean;
  justSpawned?: boolean;
}

export type Board = TileData[][];

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface FloatingScoreEffect {
  id: number;
  type: 'floating-score';
  text: string;
  pos: { r: number; c: number };
}

export type Effect = FloatingScoreEffect;

export interface ActivePowerUps {
  easyMerge: number;
  colorDrain: number;
  colorExplosion: boolean;
}
