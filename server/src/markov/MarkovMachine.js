// ==================================
// MarkovMachine: builds Markov chains and generates random text.
//
// This class implements a Markov chain–based text generator.
// It takes an input corpus (the source text), breaks it into tokens (words),
// and constructs a mapping of "state → possible next states" (the chains).
//
// Features:
// - Supports variable n-gram order (1 = unigram, 2 = bigram, etc).
// - Optionally restricts starting words to sentence beginnings (capitalized).
// - Optionally stops generation when encountering punctuation (.!?).
// - Can use a deterministic seed for reproducible text generation.
// - Provides `makeText(numWords)` to emit up to N words of random output,
//   based on the statistical distribution of the source text.
//
// Example:
//   const mm = new MarkovMachine("the cat in the hat", { order: 2 });
//   mm.makeText(20);
//   → "the cat in the hat is in the hat ..."
// ==================================


export class MarkovMachine {
  constructor(text, { order = 1, sentenceStart = false, stopAtPunctuation = false, seed = null } = {}) {
    this.words = text.split(/\s+/).filter(Boolean);
    this.order = order;
    this.sentenceStart = sentenceStart;
    this.stopAtPunctuation = stopAtPunctuation;
    this.seed = seed;
    this.chains = this.makeChains();
  }

  makeChains() {
    const chains = new Map();
    for (let i = 0; i <= this.words.length - this.order; i++) {
      const key = this.words.slice(i, i + this.order).join(" ");
      const next = this.words[i + this.order] || null;
      if (!chains.has(key)) chains.set(key, []);
      chains.get(key).push(next);
    }
    return chains;
  }

  choice(arr) {
    if (!arr.length) return null;
    if (this.seed != null) {
      // simple seeded RNG (LCG)
      let x = Math.abs(
        Array.from(this.seed.toString()).reduce((a, c) => a + c.charCodeAt(0), 0)
      );
      x = (x * 1664525 + 1013904223) % 4294967296;
      return arr[x % arr.length];
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 100) {
    if (this.words.length === 0) return "";

    // pick a starting key
    let keys = Array.from(this.chains.keys());
    if (this.sentenceStart) {
      keys = keys.filter(k => /^[A-Z]/.test(k.split(" ")[0]));
    }
    if (keys.length === 0) keys = Array.from(this.chains.keys());

    let key = this.choice(keys);
    let output = key.split(" ");

    while (output.length < numWords) {
      const nextWords = this.chains.get(key);
      if (!nextWords) break;

      const next = this.choice(nextWords);
      if (next === null) break;

      output.push(next);

      if (this.stopAtPunctuation && /[.!?]$/.test(next)) break;

      key = output.slice(output.length - this.order).join(" ");
    }

    return output.join(" ");
  }
}
