import React from 'react';
import { History as HistoryIcon, Clock } from 'lucide-react';

export default function History({ items, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="glass-panel p-6 lg:mt-0 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <HistoryIcon className="text-slate-400" />
        <h3 className="text-lg font-medium text-slate-100">Recent Checks</h3>
      </div>
      
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => onSelect(item.text)}
            className="p-3 bg-slate-900/30 hover:bg-slate-800 border border-slate-700/30 rounded-lg cursor-pointer transition-colors flex items-start gap-3"
          >
            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${item.result.label.toLowerCase() === 'fake' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-sm truncate">{item.text}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                <Clock size={12} />
                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                <span className="mx-1">•</span>
                <span className={item.result.label.toLowerCase() === 'fake' ? 'text-red-400/70' : 'text-emerald-400/70'}>
                  {(item.result.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
