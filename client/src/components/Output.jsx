// ==================================
// Output: Displays generated text with copy button.
// Styled as a result card with modern typography.
// ==================================

export default function Output({ text }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Output</h3>
        <button
          className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => navigator.clipboard.writeText(text || '')}
        >
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-gray-700 min-h-[120px] font-mono text-sm">
        {text || '— no output yet —'}
      </pre>
    </div>
  );
}
