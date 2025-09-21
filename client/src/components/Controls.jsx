// ==================================
// Controls: Parameter sliders, number inputs, and toggles.
// Styled as a modern settings panel with cards.
// ==================================

export default function Controls({
  order, setOrder,
  numWords, setNumWords,
  seed, setSeed,
  sentenceStart, setSentenceStart,
  stopAtPunctuation, setStopAtPunctuation
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 grid md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">n-gram order</label>
        <input
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          type="number" min={1} max={3} value={order}
          onChange={e => setOrder(+e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max words</label>
        <input
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          type="number" min={1} max={1000} value={numWords}
          onChange={e => setNumWords(+e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Seed (optional)</label>
        <input
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. alice" value={seed}
          onChange={e => setSeed(e.target.value)}
        />
      </div>

      <div className="md:col-span-3 flex flex-wrap items-center gap-6 mt-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={sentenceStart}
            onChange={e => setSentenceStart(e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">Start on sentence/capital</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={stopAtPunctuation}
            onChange={e => setStopAtPunctuation(e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">Stop at punctuation</span>
        </label>
      </div>
    </div>
  );
}
