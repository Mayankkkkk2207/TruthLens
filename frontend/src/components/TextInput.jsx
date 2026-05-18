import React from 'react';
import { Send, FileText } from 'lucide-react';

export default function TextInput({ text, setText, onAnalyze, isLoading }) {
  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-blue-400" />
        <h2 className="text-xl font-semibold text-slate-100">Analyze News Article</h2>
      </div>
      <textarea
        className="w-full h-48 p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        placeholder="Paste the news article text here to verify its authenticity..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-slate-400">
          {text.length} characters
        </span>
        <button
          onClick={onAnalyze}
          disabled={isLoading || text.trim().length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-all"
        >
          {isLoading ? (
            <span className="animate-pulse">Analyzing...</span>
          ) : (
            <>
              Analyze <Send size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
