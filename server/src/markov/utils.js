// ==================================
// Utility helpers: RNG with optional seed, pick random from array.
// ==================================


import seedrandom from 'seedrandom';


export function makeRng(seed) {
return seed ? seedrandom(seed) : Math.random;
}


export function choice(arr, rng = Math.random) {
if (!arr || arr.length === 0) return null;
const idx = Math.floor(rng() * arr.length);
return arr[idx];
}