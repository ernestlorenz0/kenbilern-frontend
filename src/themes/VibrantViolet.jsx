import React from "react";
import violet from "../imgs/violet.jpg";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-violet-500 flex items-center justify-center overflow-hidden">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Blobs */}
      <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] bg-fuchsia-400 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-150px] w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-40"></div>

      {/* Title */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-2xl mb-6">
          {title}
        </h1>
        <h2 className="text-2xl text-purple-100 italic">{subtitle}</h2>
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#2e026d] via-[#6d28d9] to-[#9333ea] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Glowing background orbs */}
      <div className="absolute top-24 left-16 w-72 h-72 rounded-full bg-pink-500/40 blur-3xl"></div>
      <div className="absolute bottom-24 right-20 w-80 h-80 rounded-full bg-indigo-400/40 blur-3xl"></div>

      {/* Geometric accent shapes */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border-4 border-pink-400/50 rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border-4 border-purple-300/50 -rotate-12 rounded-full"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide text-white drop-shadow-[0_0_25px_rgba(255,0,255,0.6)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-16 z-10 max-w-7xl w-full px-12">
        {/* Left Column */}
        <div className="space-y-8">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="group">
              <div className="flex items-start gap-6 text-white hover:text-purple-200 transition-colors duration-300">
                <div 
                  className={`flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full text-white text-3xl font-bold shadow-lg 
                    transition-all duration-300 group-hover:scale-110 ${sectionIndex % 3 === 0 ? 
                    'bg-purple-500 group-hover:bg-purple-400 border-3 border-purple-300 group-hover:border-pink-300' : 
                    sectionIndex % 3 === 1 ? 'bg-pink-500 group-hover:bg-pink-400 border-3 border-pink-300 group-hover:border-purple-300' : 
                    'bg-violet-500 group-hover:bg-violet-400 border-3 border-violet-300 group-hover:border-pink-300'}`}>
                  {sectionIndex + 1}
                </div>
                <span className="text-4xl font-bold text-left leading-tight flex-1 group-hover:translate-x-3 transition-transform duration-300">
                  {section.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="group">
                <div className="flex items-start gap-6 text-white hover:text-purple-200 transition-colors duration-300">
                  <div 
                    className={`flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full text-white text-3xl font-bold shadow-lg 
                      transition-all duration-300 group-hover:scale-110 ${actualIndex % 3 === 0 ? 
                      'bg-purple-500 group-hover:bg-purple-400 border-3 border-purple-300 group-hover:border-pink-300' : 
                      actualIndex % 3 === 1 ? 'bg-pink-500 group-hover:bg-pink-400 border-3 border-pink-300 group-hover:border-purple-300' : 
                      'bg-violet-500 group-hover:bg-violet-400 border-3 border-violet-300 group-hover:border-pink-300'}`}>
                    {actualIndex + 1}
                  </div>
                  <span className="text-4xl font-bold text-left leading-tight flex-1 group-hover:translate-x-3 transition-transform duration-300">
                    {section.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideVibrantViolet({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Content inside a funky tilted card */
export function MainSlide1({ title, content, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-violet-100 flex items-center justify-center overflow-hidden">
      {/* Blob accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-2xl"></div>

      {/* Two-column layout */}
      <div className="relative z-10 w-5/6 h-5/6 flex items-center justify-between">
        {/* Left: auto image or placeholder for 2nd term */}
        <div className="w-1/2 h-full flex items-center justify-center pr-8">
          {autoGeneratedImage ? (
            <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl border-4 border-purple-500 overflow-hidden">
              <img src={autoGeneratedImage} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-4/5 h-4/5 bg-white/80 border-4 border-purple-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center">
              <div className="text-purple-700 text-3xl font-extrabold mb-4">Auto Image Placeholder</div>
              <span className="text-purple-600 text-xl text-center px-4">2nd Term MainSlide</span>
            </div>
          )}
        </div>

        {/* Right: tilted card with text */}
        <div className="w-1/2">
          <div className="relative bg-white p-12 rounded-3xl shadow-2xl border-4 border-purple-500 rotate-[-3deg] max-w-4xl text-center">
            <h2 className="text-6xl font-bold text-purple-700 mb-6">{title}</h2>
            <p className="text-[2.5rem] text-gray-800 leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-purple-900 via-violet-800 to-pink-900 text-white flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-500/20 rounded-full blur-2xl"></div>

      <div className="relative z-10 w-3/4 bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-12 text-center shadow-2xl">
        <h2 className="text-8xl font-bold mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">{title}</h2>
        <p className="text-[2.5rem] leading-relaxed text-purple-100">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
/* Title on left, big flowing blob background */
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-purple-200 to-fuchsia-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Abstract shape background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/40 rounded-[40%_60%_70%_30%] blur-3xl -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-fuchsia-400/30 rounded-[60%_40%_30%_70%] blur-2xl bottom-10 right-10"></div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white p-12 rounded-3xl shadow-2xl border-4 border-purple-500">
          <h2 className="text-6xl font-bold text-purple-800 mb-6">{title || 'Term 1'}</h2>
          <div className="h-2 w-40 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mb-6"></div>
          <p className="text-[2.5rem] text-purple-900 leading-relaxed">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white p-12 rounded-3xl shadow-2xl border-4 border-fuchsia-500">
          <h2 className="text-6xl font-bold text-fuchsia-800 mb-6">{title2 || 'Term 2'}</h2>
          <div className="h-2 w-40 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full mb-6"></div>
          <p className="text-[2.5rem] text-fuchsia-900 leading-relaxed">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
/* Diagonal split background with funky wave */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-fuchsia-500 to-purple-700">
      {/* Wavy gradient overlays */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1920 400" fill="none">
        <path
          d="M0 200 C480 300 960 100 1440 200 C1680 250 1920 150 1920 150 L1920 400 L0 400 Z"
          fill="url(#waveGradient)"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1920" y2="0">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating glowing orbs */}
      <div className="absolute top-32 left-40 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-40 w-64 h-64 bg-purple-500/40 rounded-full blur-2xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-12">
        <h2 className="text-7xl font-extrabold text-white mb-8 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-[2.5rem] text-purple-100 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Subtle moving wave at bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1920 300" fill="none">
        <path
          d="M0 150 C480 250 960 50 1440 150 C1680 200 1920 100 1920 100 L1920 300 L0 300 Z"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>
    </section>
  );
}


/* ---------------- MAIN SLIDE 4 ---------------- */
/* Circular focal layout with layered blobs */
export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-gradient-to-br from-violet-200 to-fuchsia-100 overflow-hidden">
      {/* Blob accents */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-fuchsia-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-400/40 rounded-full blur-3xl"></div>

      {/* Left: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/90 p-12 rounded-3xl shadow-2xl border-4 border-purple-600">
          <h2 className="text-6xl font-extrabold text-purple-700 mb-6">{title || 'Term 1'}</h2>
          <div className="h-2 w-40 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mb-6"></div>
          <p className="text-[2.5rem] text-gray-800 leading-relaxed">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Right: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/90 p-12 rounded-3xl shadow-2xl border-4 border-fuchsia-600">
          <h2 className="text-6xl font-extrabold text-fuchsia-700 mb-6">{title2 || 'Term 2'}</h2>
          <div className="h-2 w-40 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full mb-6"></div>
          <p className="text-[2.5rem] text-gray-800 leading-relaxed">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
/* Vertical split with vibrant gradients */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-900 overflow-hidden flex">
      {/* Left section (image area) */}
      <div className="relative w-[35%] flex items-center justify-center">
        {/* Glowing orb behind image */}
        <div className="absolute w-96 h-96 bg-fuchsia-400/30 blur-3xl rounded-full"></div>

        {/* Placeholder for image */}
        <div className="relative z-10 w-[80%] h-full rounded-3xl overflow-hidden border-4 border-fuchsia-300/50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
          <img src={violet} alt="violet" className="w-full h-full"/>
        </div>
      </div>

      {/* Right text section */}
      <div className="relative w-[65%] flex flex-col justify-center px-24 text-left text-white">
        {/* Decorative glow shapes */}
        <div className="absolute top-24 right-40 w-72 h-72 bg-purple-400/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-24 left-10 w-96 h-96 bg-fuchsia-500/20 blur-2xl rounded-full"></div>

        <h2 className="text-7xl font-extrabold text-fuchsia-100 mb-8 tracking-wide drop-shadow-[0_0_20px_rgba(240,171,252,0.5)]">
          {title}
        </h2>
        <p className="text-[2.5rem] text-purple-100 leading-relaxed max-w-4xl">
          {content}
        </p>

        {/* Bottom accent wave */}
        <svg
          className="absolute bottom-0 right-0 w-full"
          viewBox="0 0 1920 300"
          fill="none"
        >
          <path
            d="M0 200 C480 300 960 100 1440 200 C1680 250 1920 150 1920 150 L1920 300 L0 300 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>
    </section>
  );
}



/* ---------------- MAIN SLIDE 6 ---------------- */
/* Funky zig-zag ribbon background */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-violet-100 flex items-center justify-center overflow-hidden">
      {/* Zig-zag ribbon */}
      <div className="absolute -rotate-6 w-[140%] h-[300px] bg-gradient-to-r from-purple-600 to-fuchsia-500 top-1/3 shadow-2xl"></div>

      {/* Content block */}
      <div className="relative z-10 text-center max-w-4xl px-12">
        <h2 className="text-6xl font-extrabold text-white-800 mb-6">{title}</h2>
        <p className="text-[2.5rem] text-white-900 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}


/* ---------------- IMAGE SLIDE ---------------- */
/* Image with term and definition */
export function ImageSlide({ title, content, autoGeneratedImage, imageUrl, term, definition }) {
  const imageSrc = autoGeneratedImage || imageUrl;
  const displayTitle = term || title;
  const displayContent = definition || content;
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[700px] h-[700px] bg-fuchsia-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-2xl"></div>

      <div className="relative z-10 w-full h-full flex items-center justify-center gap-16 px-16">
        {/* Image container - larger size */}
        <div className="relative w-[750px] h-[750px] rounded-3xl border-[16px] border-purple-600/90 shadow-2xl overflow-hidden bg-white">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Visual representation"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-100">
              <div className="text-center p-8">
                <div className="text-3xl font-extrabold text-purple-800 mb-4">
                  {displayTitle ? displayTitle : 'Image Placeholder'}
                </div>
                {displayContent && (
                  <div className="text-xl text-purple-700 max-w-lg">
                    {displayContent}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Term and definition panel */}
        <div className="w-[600px] space-y-8">
          {displayTitle && (
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-4xl font-extrabold mb-2">{displayTitle}</h3>
            </div>
          )}
          
          {displayContent && (
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100">
              <p className="text-2xl text-gray-800 leading-relaxed">{displayContent}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-purple-700 to-fuchsia-600 flex items-center justify-center overflow-hidden">
      {/* Blob accents */}
      <div className="absolute top-20 left-32 w-80 h-80 bg-fuchsia-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-300/40 rounded-full blur-2xl"></div>

      <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">
        The End
      </h1>
    </section>
  );
}

const VibrantViolet = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  ImageSlide,
  EndSlide,
};
export default VibrantViolet;
