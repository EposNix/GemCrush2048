
export type TileValue = number | null;

export interface TileData {
  id: number;
  value: TileValue;
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
