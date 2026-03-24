import React, { useState, useRef } from 'react';
import { Type, Image as ImageIcon, Sparkles, RefreshCcw, Info, UploadCloud } from 'lucide-react';

export default function GeneratorForm({ onSubmit, disabled, loading }) {
  const [prompt, setPrompt] = useState('A brilliant galaxy');
  const [generationType, setGenerationType] = useState('Meme');
  const [activeTab, setActiveTab] = useState('Text to Image');
  const [imageFile, setImageFile] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'Text to Image' && !prompt.trim()) return;
    if (activeTab === 'Image to Image' && !imageFile && !prompt.trim()) return;
    
    // We send FormData with imageFile to backend (if backend supports it later)
    // For now we just forward the text prompt/type
    onSubmit({ prompt, generationType });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-6 z-10 relative">
      
      {/* Tabs mimicking standard stable diffusion ui */}
      <div className="flex border-b border-indigo-500/20 mb-2 relative">
        <button 
          type="button"
          onClick={() => setActiveTab('Text to Image')}
          className={`px-8 py-3 font-semibold text-sm flex items-center gap-2 rounded-t-2xl transition-all relative ${activeTab === 'Text to Image' ? 'bg-indigo-600/30 text-white border-t border-l border-r border-indigo-400/50 shadow-[0_-10px_20px_rgba(79,70,229,0.15)] z-10' : 'text-indigo-200/60 hover:text-white hover:bg-white/5 border-b border-indigo-500/20'}`}
        >
          <Type className="w-4 h-4" /> Text to Image
          {activeTab === 'Text to Image' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0a0a1f] scale-x-110"></div>}
        </button>
        <button 
            type="button"
            onClick={() => setActiveTab('Image to Image')}
            className={`px-8 py-3 font-semibold text-sm flex items-center gap-2 rounded-t-2xl transition-all relative ${activeTab === 'Image to Image' ? 'bg-indigo-600/30 text-white border-t border-l border-r border-indigo-400/50 shadow-[0_-10px_20px_rgba(79,70,229,0.15)] z-10' : 'text-indigo-200/60 hover:text-white hover:bg-white/5 border-b border-indigo-500/20'}`}
        >
          <ImageIcon className="w-4 h-4" /> Image to Image
          {activeTab === 'Image to Image' && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0a0a1f] scale-x-110"></div>}
        </button>
      </div>

      {/* Input Area */}
      <div className="relative group rounded-2xl bg-[#080816]/80 border border-indigo-500/40 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col min-h-[160px]">
        {activeTab === 'Text to Image' ? (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={disabled}
            placeholder="Type your prompt here... e.g. 'A futuristic cyberpunk poster'"
            className="w-full h-full flex-1 bg-transparent p-6 text-indigo-100 placeholder-indigo-300/40 focus:outline-none resize-none text-base font-medium z-10"
          />
        ) : (
          <div className="flex flex-col h-full w-full flex-1">
            {!imageFile ? (
              <div 
                className="flex-1 flex flex-col items-center justify-center p-8 border-b border-indigo-500/20 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-indigo-600/20 p-4 rounded-full mb-3">
                  <UploadCloud className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-white text-base font-medium text-center">Click to upload your base image</p>
                <p className="text-indigo-400/70 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
              </div>
            ) : (
               <div className="flex-1 flex items-center justify-between p-6 border-b border-indigo-500/20 bg-indigo-900/20">
                 <div className="flex items-center gap-4">
                    <ImageIcon className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-medium text-sm truncate max-w-[200px]">{imageFile.name}</p>
                      <p className="text-indigo-300 text-xs shadow-sm pl-1 border-l border-green-400 mt-1">Ready for transformation</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => setImageFile(null)} className="text-xs text-white font-bold px-3 py-1.5 bg-red-600/80 hover:bg-red-500 rounded-md transition-colors">REMOVE</button>
               </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {/* Optional modification prompt */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={disabled}
              placeholder="Add an optional text prompt to modify the image..."
              className="w-full bg-black/40 p-4 text-indigo-100 placeholder-indigo-300/40 focus:outline-none resize-none text-sm font-medium z-10 h-24 border-t border-indigo-500/20"
            />
          </div>
        )}
        
        {/* Inner bottom glow line similar to reference */}
        {activeTab === 'Text to Image' ? (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-400 opacity-80" />
        )}
      </div>

      <hr className="border-indigo-500/20" />

      {/* Models / Selectors */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black/20 p-4 rounded-[2rem] border border-white/10 shadow-inner">
        
        <div className="w-full md:w-auto space-y-2 flex-1 px-2">
          <label className="flex items-center text-xs font-bold text-teal-300 uppercase tracking-widest pl-1 mb-2">
            <Sparkles className="w-4 h-4 mr-2 text-teal-400" />
            Output Generator Type
          </label>
          <div className="relative group">
            <select
              value={generationType}
              onChange={(e) => setGenerationType(e.target.value)}
              disabled={disabled}
              className="w-full md:w-64 appearance-none bg-white/10 backdrop-blur-md border border-teal-500/30 hover:border-teal-400/60 rounded-xl pl-10 pr-10 py-3 text-white text-base focus:outline-none focus:ring-1 focus:ring-teal-400 transition-all cursor-pointer font-bold shadow-inner"
            >
              <option value="Meme" className="bg-[#050514]">Meme Generator</option>
              <option value="Logo" className="bg-[#050514]">Logo Generator</option>
              <option value="Poster" className="bg-[#050514]">Poster Generator</option>
            </select>
            
            {/* Custom select aesthetics */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {generationType === 'Meme' && <span className="text-xl">😂</span>}
              {generationType === 'Logo' && <span className="text-xl">✨</span>}
              {generationType === 'Poster' && <span className="text-xl">🎬</span>}
            </div>
            
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-teal-300">
               <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled || (activeTab === 'Text to Image' ? !prompt.trim() : (!imageFile && !prompt.trim()))}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 rounded-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-70 disabled:grayscale-[20%] shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.6)] group mt-4 md:mt-0 text-base tracking-wide self-stretch md:self-end border border-teal-200/20"
        >
          {/* Inner glass highlight */}
          <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none"></div>
          
          <span className="relative z-10 flex items-center">
            {loading ? (
              <>
                <RefreshCcw className="w-5 h-5 mr-3 animate-spin text-white/90" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCcw className="w-5 h-5 mr-3 group-hover:-rotate-180 transition-transform duration-700 text-white/90" />
                Generate {generationType}
              </>
            )}
          </span>
        </button>
      </div>

    </form>
  );
}
