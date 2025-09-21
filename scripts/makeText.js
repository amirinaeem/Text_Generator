
// ==================================
// CLI tool to generate text from a file or URL using the shared Markov engine.
// Usage: node scripts/makeText.js file <path> | url <http(s)://...>
// ==================================


import { readFileSync } from 'node:fs';
import fetch from 'node-fetch';
import { htmlToText } from 'html-to-text';
import { MarkovMachine } from '../server/src/markov/MarkovMachine.js';


const [,, mode, source, ...rest] = process.argv;


async function main() {
try {
if (!mode || !source) {
console.error('Usage: node scripts/makeText.js file <path> | url <http(s)://...> [numWords]');
process.exit(1);
}
const numWords = Number(rest[0] ?? 100);


let text;
if (mode === 'file') {
text = readFileSync(source, 'utf8');
} else if (mode === 'url') {
const res = await fetch(source);
if (!res.ok) throw new Error(`Failed to fetch URL (${res.status})`);
const body = await res.text();
text = htmlToText(body, { wordwrap: false });
} else {
throw new Error(`Unknown mode: ${mode}`);
}


const mm = new MarkovMachine(text, { order: 2 });
const out = mm.makeText(numWords);
console.log(out);
} catch (err) {
console.error(`Error: ${err.message}`);
process.exit(1);
}
}


main();