import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isFake = result.label.toLowerCase() === 'fake';
  const confidencePercent = (result.confidence * 100).toFixed(1);

  return (
    <div className={`glass-panel p-6 mb-6 relative overflow-hidden transition-all duration-500 ${isFake ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${isFake ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
      
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            {isFake ? (
              <><AlertTriangle className="text-red-400" size={28} /> <span className="text-red-400">Fake News Detected</span></>
            ) : (
              <><ShieldCheck className="text-emerald-400" size={28} /> <span className="text-emerald-400">Authentic News</span></>
            )}
          </h2>
          <p className="text-slate-400 mt-2">
            Our AI model analyzed the linguistic patterns and determined this article is likely {result.label.toLowerCase()}.
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-bold text-slate-100">{confidencePercent}%</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider mt-1">Confidence Score</div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isFake ? 'bg-red-500' : 'bg-emerald-500'}`}
            style={{ width: `${confidencePercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
