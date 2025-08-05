
export const BOARD_SIZE = 8;
export const MIN_MATCH_LENGTH = 3;
export const TILE_VALUES_COUNT = 5;
export const CASCADE_SPAWN_COUNT = 0;

export const TILE_COLORS: Map<number, string> = new Map([
  [1, 'bg-rose-500 border-rose-700'],
  [2, 'bg-sky-500 border-sky-700'],
  [3, 'bg-emerald-500 border-emerald-700'],
  [4, 'bg-amber-500 border-amber-700'],
  [5, 'bg-violet-500 border-violet-700'],
]);

export const BASE_TILE_STYLES = 'w-full h-full rounded-lg flex items-center justify-center font-bold text-white text-2xl shadow-lg border-b-4';

export const SLIDE_ANIMATION_DURATION = 150;
export const POP_ANIMATION_DURATION = 300;
export const CASCADE_DELAY = 150;