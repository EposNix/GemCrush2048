
export const BOARD_SIZE = 8;
export const MIN_MATCH_LENGTH = 3;
export const TILE_VALUES_COUNT = 4;
export const CASCADE_SPAWN_COUNT = 5;

// New constants for power-ups
export const POWERUP_SPAWN_CHANCE = 0.05; // 5% chance
export const POWERUP_EFFECT_DURATION = 5; // 5 swipes
export const MIN_TILE_VALUES = 2; // Color drain can't go below this

export const TILE_COLORS: Map<number, string> = new Map([
  [1, 'gem-1'],
  [2, 'gem-2'],
  [3, 'gem-3'],
  [4, 'gem-4'],
  [5, 'gem-5'],
]);

export const BASE_TILE_STYLES = 'w-full h-full rounded-lg flex items-center justify-center font-bold text-white text-2xl gem';

export const SLIDE_ANIMATION_DURATION = 150;
export const POP_ANIMATION_DURATION = 300;
export const CASCADE_DELAY = 150;
