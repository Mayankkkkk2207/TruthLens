import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Globe, RefreshCw, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

export default function LiveNews() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLiveNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/live-news');
      if (response.data.status === 'success') {
        setNews(response.data.articles);
      } else {
        setError("Failed to fetch news stream.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to news server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  return (
    <div className="glass-panel p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="text-blue-400" />
          <h2 className="text-xl font-semibold text-slate-100">Live News Stream CI/CD</h2>
        </div>
        <button 
          onClick={fetchLiveNews} 
          disabled={isLoading}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin text-blue-400' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}

      {isLoading && news.length === 0 ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-lg border border-slate-700/50"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((article, idx) => {
            const isFake = article.analysis.label.toLowerCase() === 'fake';
            const confidence = (article.analysis.confidence * 100).toFixed(0);
            
            return (
              <div key={idx} className="bg-slate-900/40 p-4 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-slate-200 font-medium hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </a>
                    <div className="flex items-center gap-3 mt-3">
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${isFake ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                        {isFake ? <AlertTriangle size={12}/> : <ShieldCheck size={12}/>}
                        {isFake ? 'Likely Fake' : 'Verified Authentic'}
                      </div>
                      <span className="text-xs text-slate-500">{confidence}% Confidence</span>
                    </div>
                  </div>
                  
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            );
          })}
          
          {news.length === 0 && !isLoading && !error && (
            <div className="text-slate-500 text-center py-6">No news available at the moment.</div>
          )}
        </div>
      )}
    </div>
  );
}
