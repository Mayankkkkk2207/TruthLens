import React from 'react';
import { Cpu } from 'lucide-react';

export default function ModelComparison({ models }) {
  if (!models) return null;

  // Format probabilities for display
  const rfProb = (models.random_forest * 100).toFixed(1);
  const bertProb = (models.bert.score * 100).toFixed(1);
  
  // Convert scores to fake probabilities if they aren't already
  const isBertFake = models.bert.label.includes('1') || models.bert.label.toLowerCase().includes('fake');
  const bertFakeProb = isBertFake ? bertProb : (100 - parseFloat(bertProb)).toFixed(1);

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="text-indigo-400" />
        <h3 className="text-lg font-medium text-slate-100">Model Diagnostics</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <div className="text-sm text-slate-400 mb-1">HuggingFace DistilBERT</div>
          <div className="flex justify-between items-end">
            <span className="text-xl font-bold text-slate-200">{bertFakeProb}%</span>
            <span className="text-xs text-slate-500">Fake Probability</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${bertFakeProb}%` }}></div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <div className="text-sm text-slate-400 mb-1">Random Forest (TF-IDF)</div>
          <div className="flex justify-between items-end">
            <span className="text-xl font-bold text-slate-200">{rfProb}%</span>
            <span className="text-xs text-slate-500">Fake Probability</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rfProb}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
