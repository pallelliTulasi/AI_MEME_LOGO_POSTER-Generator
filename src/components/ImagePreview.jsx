import React from 'react';
import { Download, ExternalLink, UploadCloud } from 'lucide-react';

export default function ImagePreview({ imageUrl, promptUsed, loading }) {
  const [imgLoading, setImgLoading] = React.useState(true);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    if (imageUrl) {
      setImgLoading(true);
      setImgError(false);
    }
  }, [imageUrl]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const localUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = localUrl;
      link.download = `creation-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(localUrl);
    } catch (e) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center z-10 relative">
      
      {!imageUrl && !loading ? (
        // Placeholder state mimicking the bottom reference element
        <div className="w-[80%] max-w-lg border-[1px] border-dashed border-indigo-400/50 rounded-2xl bg-indigo-950/40 p-10 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left backdrop-blur-md transition-all hover:bg-indigo-950/60 cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.15)] mt-auto mb-16">
          <div className="w-16 h-16 rounded-full border border-indigo-400/40 flex items-center justify-center bg-indigo-900/50 shrink-0">
             <UploadCloud className="w-7 h-7 text-indigo-200" />
          </div>
          <div>
            <p className="text-indigo-100 text-base md:text-lg font-medium leading-tight">
              Drag an image here or<br/>click to upload an image.
            </p>
          </div>
          <div className="absolute -bottom-16 text-center w-full left-0 right-0">
            <p className="text-indigo-100 tracking-wide font-medium">
              Your masterpiece <span className="text-white font-bold">will appear here</span>
            </p>
          </div>
        </div>
      ) : loading ? (
         // Loading state
         <div className="w-3/4 max-w-sm border border-indigo-500/20 rounded-2xl bg-[#080816]/80 p-12 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-2xl">
           <div className="relative w-24 h-24 mb-6">
             <div className="absolute inset-0 rounded-full border-t-[3px] border-blue-500 animate-[spin_1s_ease-in-out_infinite]"></div>
             <div className="absolute inset-2 rounded-full border-r-[3px] border-purple-500 animate-[spin_2s_linear_infinite_reverse]"></div>
             <div className="absolute inset-4 rounded-full border-b-[3px] border-orange-500 animate-spin"></div>
           </div>
           <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 animate-pulse uppercase tracking-widest">
            Processing Data
           </p>
         </div>
      ) : (
        // Rendered Image state
        <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
           {imgError && (
             <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium text-center">
               Failed to load image. The free AI generation API took too long or was rate-limited.<br/>Please try clicking Generate again!
             </div>
           )}
           <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.2)] max-w-full group bg-black/50 border border-white/10 backdrop-blur-sm">
              {imgLoading && !imgError && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20 p-10 min-h-[300px] min-w-[300px]">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white font-bold animate-pulse text-center">AI is rendering your image...<br/><span className="text-sm font-normal text-indigo-300">This can take up to 30 seconds</span></p>
                 </div>
              )}
              <img 
                src={imageUrl} 
                alt={promptUsed} 
                onLoad={() => setImgLoading(false)}
                onError={() => { setImgLoading(false); setImgError(true); }}
                className={`w-full h-auto object-contain max-h-[60vh] md:max-h-[75vh] transition-transform duration-1000 group-hover:scale-[1.01] ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050514] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 pointer-events-none">
                  <p className="text-white text-sm md:text-base text-center font-medium px-5 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                    {promptUsed}
                  </p>
              </div>
           </div>
           
           {/* Actions below image */}
           <div className="flex gap-4 mt-8">
             <button
               onClick={handleDownload}
               className="flex items-center px-8 py-3 bg-blue-600/90 hover:bg-blue-500 border border-blue-400/50 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
             >
               <Download className="w-5 h-5 mr-3" /> Download HQ
             </button>
             <a 
               href={imageUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center px-8 py-3 bg-[#0a0f25]/80 hover:bg-white/10 border border-indigo-500/30 text-indigo-100 font-bold rounded-xl transition-colors"
             >
               <ExternalLink className="w-5 h-5 mr-3" /> External Link
             </a>
           </div>
        </div>
      )}

    </div>
  );
}
