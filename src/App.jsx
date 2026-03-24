import React, { useState } from 'react';
import GeneratorForm from './components/GeneratorForm';
import ImagePreview from './components/ImagePreview';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [promptUsed, setPromptUsed] = useState('');

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const response = await axios.post('http://localhost:8080/api/generate', formData);
      setGeneratedImage(response.data.imageUrl);
      setPromptUsed(response.data.promptUsed);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || 'Error occurred while generating image.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050511] text-white font-sans overflow-hidden relative">
      {/* Starry background effect */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-[10%] left-[20%] blur-[2px] animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-purple-500 rounded-full top-[30%] left-[80%] blur-[3px] animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-[60%] left-[10%] blur-[1px] animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute w-4 h-4 bg-pink-500 rounded-full top-[80%] left-[70%] blur-[4px] animate-pulse"></div>
        <div className="absolute w-2 h-2 bg-indigo-400 rounded-full top-[40%] left-[40%] blur-[2px] animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 py-8 relative z-10 flex flex-col min-h-screen">
        
        {/* Header (Logo) */}
        <header className="flex flex-col items-center justify-center mb-8 shrink-0">
          <div className="text-center group select-none">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]">AI Meme</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] text-7xl md:text-9xl ml-4">Poster</span>
              <br />
              <div className="flex items-center justify-center mt-2">
                <span className="h-1 flex-1 bg-gradient-to-r from-transparent to-blue-400"></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 text-3xl md:text-4xl tracking-[0.2em] font-bold mx-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]">LOGO GENERATOR</span>
                <span className="h-1 flex-1 bg-gradient-to-l from-transparent to-cyan-400"></span>
              </div>
            </h1>
            <p className="mt-8 text-xl md:text-2xl font-bold tracking-widest uppercase">
              <span className="text-teal-400/90 drop-shadow-md">Create.</span>
              <span className="text-white/90 ml-3 drop-shadow-md">Generate.</span>
              <span className="text-orange-300/90 ml-3 drop-shadow-md">Captivate.</span>
            </p>
          </div>
        </header>

        {/* Main Workspace Panels */}
        <main className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px] pb-8">
          
          {/* Left Panel - Form */}
          <section className="flex-[0.8] bg-[#0a0a1f]/80 backdrop-blur-2xl border border-indigo-500/30 rounded-[2rem] p-6 md:p-8 shadow-[0_0_40px_rgba(79,70,229,0.15)] flex flex-col relative overflow-hidden">
            <GeneratorForm onSubmit={handleGenerate} disabled={loading} loading={loading} />
            {error && (
              <div className="mt-6 p-4 bg-red-900/50 backdrop-blur-md border border-red-500/50 rounded-xl text-red-200 text-sm font-medium animate-in slide-in-from-top-4">
                {error}
              </div>
            )}
            
            {/* Footer tags mentioned in design */}
             <div className="mt-auto pt-8 flex gap-6 text-xs font-semibold text-indigo-300/50 justify-center uppercase tracking-widest z-10">
              <span className="hover:text-indigo-300 transition-colors">⬡ Framer Motion</span>
              <span className="hover:text-indigo-300 transition-colors">〰 Tailwind CSS</span>
              <span className="hover:text-indigo-300 transition-colors">❖ Lucide React</span>
            </div>
          </section>

          {/* Right Panel - Preview */}
          <section className="flex-[1.2] bg-[#050514]/90 backdrop-blur-3xl border border-indigo-500/20 rounded-[2rem] p-6 shadow-[0_0_40px_rgba(59,130,246,0.1)] flex flex-col items-center justify-center relative overflow-hidden">
             
             {/* Subtle star/mountain background for the right panel */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A26] to-[#1F0C3B] opacity-40 z-0 pointer-events-none"></div>
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401')] opacity-20 bg-cover bg-center mix-blend-screen pointer-events-none filter contrast-125 saturate-150"></div>
             
             <ImagePreview imageUrl={generatedImage} promptUsed={promptUsed} loading={loading} />
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;
