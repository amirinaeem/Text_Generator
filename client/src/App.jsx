// ==================================
// Main page: wires inputs, controls, API call, and output together.
// ==================================


import { useState } from 'react';
import Header from './components/Header.jsx';
import Controls from './components/Controls.jsx';
import InputTabs from './components/InputTabs.jsx';
import Output from './components/Output.jsx';
import Footer from './components/Footer.jsx';
import { generateFrom } from './api.js';


export default function App() {
const [order, setOrder] = useState(2);
const [numWords, setNumWords] = useState(120);
const [seed, setSeed] = useState('');
const [sentenceStart, setSentenceStart] = useState(true);
const [stopAtPunctuation, setStopAtPunctuation] = useState(true);


const [text, setText] = useState('');
const [urls, setUrls] = useState([]);
const [files, setFiles] = useState([]);


const [output, setOutput] = useState('');
const [loading, setLoading] = useState(false);
const [err, setErr] = useState('');


async function onGenerate() {
setLoading(true); setErr(''); setOutput('');
try {
const res = await generateFrom({ text, urls, files, order, numWords, sentenceStart, stopAtPunctuation, seed });
if (!res.ok) throw new Error(res.error || 'Failed');
setOutput(res.data.output);
} catch (e) {
setErr(e.message);
} finally {
setLoading(false);
}
}


function clearAll() {
setText(''); setUrls([]); setFiles([]); setOutput(''); setErr('');
}


return (
<div className="max-w-5xl mx-auto">
<Header />


<main className="px-6 grid gap-6">
<div className="card">
<Controls {...{ order, setOrder, numWords, setNumWords, seed, setSeed, sentenceStart, setSentenceStart, stopAtPunctuation, setStopAtPunctuation }} />
<div className="flex gap-3 mt-5">
<button className="btn bg-indigo-600 text-white" onClick={onGenerate} disabled={loading}>
{loading ? 'Generating…' : 'Generate'}
</button>
<button className="btn bg-white border" onClick={clearAll}>Clear</button>
</div>
</div>


<InputTabs {...{ text, setText, urls, setUrls, files, setFiles }} />


{err ? (
<div className="card border border-red-200 bg-red-50 text-red-700">{err}</div>
) : null}


<Output text={output} />
</main>


<Footer />
</div>
);
}