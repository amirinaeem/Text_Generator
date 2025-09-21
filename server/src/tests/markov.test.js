// ==================================
// Jest tests: validate chain build and deterministic generation (seeded).
// ==================================


import { MarkovMachine } from '../markov/MarkovMachine.js';


describe('MarkovMachine', () => {
const text = 'the cat in the hat is in the hat';


test('builds chains for order=1', () => {
const mm = new MarkovMachine(text, { order: 1, sentenceStart: false, stopAtPunctuation: false });
expect(mm.chains.size).toBeGreaterThan(0);
// known mapping: 'the' should have ['cat','hat','hat'] (order=1)
const nexts = mm.chains.get('the');
expect(Array.isArray(nexts)).toBe(true);
expect(nexts).toEqual(expect.arrayContaining(['cat', 'hat']));
});


test('deterministic with seed', () => {
const a = new MarkovMachine(text, { order: 2, seed: 'xyz', sentenceStart: false, stopAtPunctuation: false });
const b = new MarkovMachine(text, { order: 2, seed: 'xyz', sentenceStart: false, stopAtPunctuation: false });
expect(a.makeText(10)).toEqual(b.makeText(10));
});


test('empty corpus yields empty output', () => {
const mm = new MarkovMachine('', {});
expect(mm.makeText(10)).toBe('');
});
});