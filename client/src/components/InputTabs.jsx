// ==================================
// InputTabs: Tabbed panel for Text, URLs, and File uploads.
// Styled with pill-style tab buttons and clean inputs.
// ==================================

import { useState } from 'react';

export default function InputTabs({ text, setText, urls, setUrls, files, setFiles }) {
  const [tab, setTab] = useState('text');

  const tabs = [
    { key: 'text', label: 'Paste Text' },
    { key: 'urls', label: 'URLs' },
    { key: 'files', label: 'Files' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${tab === t.key
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab contents */}
      {tab === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste source text</label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[160px]"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste any text here..."
          />
        </div>
      )}

      {tab === 'urls' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">One URL per line</label>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
            value={urls.join('\n')}
            onChange={e => setUrls(e.target.value.split(/\n+/).map(s => s.trim()).filter(Boolean))}
            placeholder="https://example.com/sample.txt"
          />
        </div>
      )}

      {tab === 'files' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload .txt files</label>
          <input
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100"
            type="file" accept=".txt" multiple
            onChange={e => setFiles(Array.from(e.target.files))}
          />
          {files?.length ? (
            <p className="text-sm text-gray-600 mt-2">{files.length} file(s) selected.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
