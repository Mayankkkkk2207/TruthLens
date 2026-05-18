import { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye } from 'lucide-react';

import TextInput from './components/TextInput';
import ResultCard from './components/ResultCard';
import ModelComparison from './components/ModelComparison';
import History from './components/History';

function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('truthlens_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/predict', { text });
      const data = response.data;
      setResult(data);

      const newItem = { text, result: data, timestamp: new Date().toISOString() };
      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('truthlens_history', JSON.stringify(newHistory));

    } catch (err) {
      console.error(err);
      setError("Failed to connect to the analysis server. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0a0f1c] text-slate-200 selection:bg-blue-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Eye className="text-blue-400 w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4 tracking-tight">
            TruthLens
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Advanced AI-powered fake news detection utilizing state-of-the-art NLP and DistilBERT fine-tuning to verify article authenticity.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <TextInput
              text={text}
              setText={setText}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />

            {error && (
              <div className="p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-start gap-3">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                <ResultCard result={result} />
                <ModelComparison models={result.all_models} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <History items={history} onSelect={setText} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
