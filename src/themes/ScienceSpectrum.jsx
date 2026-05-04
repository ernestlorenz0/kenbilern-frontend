import React from "react";
import { Atom, Microscope, FlaskConical, Beaker, Brain } from "lucide-react";
import science from "../imgs/science.jpg";  
import science1 from "../imgs/science1.jpg";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

/* Title Slide – Spectrum gradient background with atom motif */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex flex-col items-center justify-center text-white overflow-hidden">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Floating science icons */}
      <div className="absolute top-10 left-12 text-6xl opacity-40">⚛️</div>
      <div className="absolute bottom-14 right-16 text-5xl opacity-40">🧬</div>
      <div className="absolute top-1/3 right-1/4 text-7xl opacity-30">🧪</div>

      {/* Title text */}
      <h1 className="text-8xl font-extrabold font-sans drop-shadow-lg mb-4">
        {title}
      </h1>
      <h2 className="text-2xl font-light opacity-90">{subtitle}</h2>
    </section>
  );
}

/* Table of Contents Slide – Science Spectrum */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0a0a0f] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient spectrum background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-700 to-cyan-500 opacity-40 blur-2xl"></div>

      {/* Orbiting circles */}
      <div className="absolute w-[600px] h-[600px] border border-cyan-400/40 rounded-full animate-pulse"></div>
      <div className="absolute w-[900px] h-[900px] border border-purple-400/30 rounded-full animate-spin-slow"></div>

      {/* Floating geometric accents */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-400/30 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-400/30 rounded-full"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Simplified to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-200 hover:text-cyan-300 transition-colors duration-300 group">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-300
                ${sectionIndex % 3 === 0 ? "bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400" : sectionIndex % 3 === 1 ? "bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400" : "bg-gradient-to-r from-green-400 to-teal-500 group-hover:from-green-300 group-hover:to-teal-400"}`}>
                {sectionIndex + 1}
              </div>
              <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 text-gray-200 hover:text-cyan-300 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-300
                  ${actualIndex % 3 === 0 ? "bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400" : actualIndex % 3 === 1 ? "bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400" : "bg-gradient-to-r from-green-400 to-teal-500 group-hover:from-green-300 group-hover:to-teal-400"}`}>
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Main Slide 1 – Title on top, spectrum underline, content below */
export function MainSlide1({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex items-center justify-between px-24 py-16">
      <Microscope className="absolute bottom-24 right-40 w-32 h-32 text-green-400 opacity-30 rotate-[-8deg]" />
      <FlaskConical className="absolute top-1/3 right-1/4 w-28 h-28 text-blue-400 opacity-30" />
      <Beaker className="absolute bottom-1/3 left-1/4 w-28 h-28 text-yellow-400 opacity-30" />
      <Brain className="absolute top-1/2 left-12 w-32 h-32 text-purple-400 opacity-30 rotate-6" />

      {/* Decorative glowing border */}
      <div className="absolute inset-12 border-4 border-cyan-400 rounded-2xl opacity-30 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />

      {/* Left side: Auto-generated image placeholder for 2nd term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-12">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/10 backdrop-blur-sm border-4 border-cyan-400 rounded-lg flex flex-col items-center justify-center shadow-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <div className="text-cyan-300 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-yellow-300 text-xl text-center px-4 font-medium">2nd Term: {title}</span>
          </div>
        )}
      </div>

      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 pl-12">
        <h2 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">{title}</h2>
        <div className="h-[4px] w-56 bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-400 mb-10"></div>
        {content && (
          <div className="bg-white/10 backdrop-blur-sm border-l-4 border-cyan-400 p-6 rounded-r-lg shadow-lg">
            <p className="text-[2.5rem] leading-relaxed text-gray-100">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* Main Slide 2 – Split layout, left content, right decorative molecule */
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white flex flex-col items-center justify-center px-20 py-16">
      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-cyan-400 rounded-lg shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-cyan-300 drop-shadow-lg">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-56 bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-400 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-100">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-purple-400 rounded-lg shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-purple-300 drop-shadow-lg">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-56 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-400 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-100">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 3 – Dark gradient with glowing science shapes */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2b2b4a] text-white flex flex-col items-center justify-center px-24 py-16 overflow-hidden">
      {/* Faint science icons in background */}
      <Atom className="absolute top-20 left-32 w-28 h-28 text-cyan-400/10" />
      <Beaker className="absolute bottom-28 right-32 w-32 h-32 text-purple-400/10" />
      <Microscope className="absolute top-1/3 right-1/4 w-24 h-24 text-blue-400/10" />
      <FlaskConical className="absolute bottom-1/4 left-1/4 w-28 h-28 text-indigo-400/10" />

      {/* Title */}
      <h2 className="text-7xl font-semibold mb-10 mt-[-200px] tracking-wide text-cyan-200 drop-shadow-lg z-10">
        {title}
      </h2>

      {/* Divider */}
      <div className="w-40 h-[3px] bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-10 z-10"></div>

      {/* Content */}
      <p className="text-[2.8rem] leading-relaxed max-w-5xl text-center text-gray-200 z-10">
        {content}
      </p>
    </section>
  );
}

/* Image Slide – Spectrum border with centered image */
export function ImageSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex items-center justify-between px-16">
      <div className="absolute inset-8 border-[6px] border-transparent rounded-xl bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-border"></div>
      
      {/* Left side: Auto-generated image placeholder for 1st term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-12">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg border-4 border-gray-200" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-400 rounded-lg flex flex-col items-center justify-center shadow-xl">
            <div className="text-purple-600 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-purple-500 text-xl text-center px-4 font-medium">1st Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 pl-12">
        {title && (
          <h3 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{title}</h3>
        )}
        <div className="h-[4px] w-40 bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 mb-6"></div>
        {content && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-400 p-6 rounded-r-lg shadow-lg">
            <p className="text-4xl leading-relaxed text-gray-700">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* Main Slide 4 – Left Image, Right Text with Spectrum Accent */
export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 text-white flex items-center justify-center overflow-hidden">
      {/* Science accents */}
      <div className="absolute top-10 left-10 text-6xl opacity-30">🧬</div>
      <div className="absolute bottom-16 right-16 text-6xl opacity-30">🪐</div>

      {/* Left: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-sm border-4 border-cyan-400 rounded-lg shadow-2xl p-10">
          <h2 className="text-6xl font-bold mb-6 text-cyan-300 drop-shadow-lg">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-400 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-100">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Right: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-sm border-4 border-pink-400 rounded-lg shadow-2xl p-10">
          <h2 className="text-6xl font-bold mb-6 text-pink-300 drop-shadow-lg">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-100">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 5 – Centered Text with Circular Orbit Icons */
export function MainSlide5({ title, content, image }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden font-sans">
      {/* Left Content Section */}
      <div className="w-3/4 h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white flex flex-col justify-center px-28 relative">
        {/* Subtle glowing grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        {/* Cyan accent lines */}
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>

        <div className="relative z-10">
          <h2 className="text-7xl font-mono font-bold mb-10 text-cyan-300 tracking-wide">
            {title}
          </h2>
          <p className="text-[2.7rem] font-light leading-relaxed max-w-4xl text-gray-200">
            {content}
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-1/4 h-full relative border-l border-cyan-500/30 bg-[#0f172a] flex items-center justify-center overflow-hidden">
        <img
            src={science}
            alt="Science Visual"
            className="w-full h-full object-cover opacity-90"
          />

        {/* Subtle glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
      </div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex text-white overflow-hidden">
      {/* Left diagonal gradient content area */}
      <div className="w-2/3 bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-600 transform -skew-x-6 origin-top-left flex items-center justify-center px-24 relative">
        {/* Soft overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-3xl z-10 skew-x-6">
          <h2 className="text-7xl font-bold mb-8 text-cyan-200">{title}</h2>
          <p className="text-[2.7rem] leading-relaxed text-gray-100">{content}</p>
        </div>
      </div>

      {/* Right image area */}
      <div className="w-1/3 relative overflow-hidden">
        <img
          src={science1}
          alt="Science visual"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
        {/* Subtle border accent */}
        <div className="absolute left-0 top-0 w-[6px] h-full bg-cyan-400"></div>
      </div>
    </section>
  );
}



/* End Slide – Dark background with glowing atom */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-indigo-800 to-purple-700 flex flex-col items-center justify-center text-white">
      <div className="absolute top-10 right-20 text-9xl opacity-20">⚛️</div>
      <h2 className="text-6xl font-bold mb-4">{message}</h2>
      <p className="text-2xl opacity-80">The End</p>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideScienceSpectrum({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ScienceSpectrum = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default ScienceSpectrum;
