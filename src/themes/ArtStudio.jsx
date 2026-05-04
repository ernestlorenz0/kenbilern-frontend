import React from "react";
import painting from "../imgs/painting.jpg";
import PaintBackground from "../svgs/paint-background.svg";
import PaintBackground2 from "../svgs/paint-background2.svg";
import BlobShape1 from "../svgs/blob-shape1.svg";
import BlobShape2 from "../svgs/blob-shape2.svg";
import ShapeRight2 from "../svgs/shape-right2.svg";
import PaintingPng from "../pngs/painting.png";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black flex items-center justify-center overflow-hidden">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Full paint splatter background */}
      <img
        src={PaintBackground}
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blob shapes */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Back blob (purple) */}
        <img
          src={BlobShape1}
          alt="purple blob"
          className="absolute w-[650px] translate-x-2 translate-y-0"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.5))" }}
        />

        {/* Front blob (orange) */}
        <img
          src={BlobShape2}
          alt="orange blob"
          className="w-[750px]"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white font-[BebasNeue] text-6xl text-center leading-snug ml-10">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-white font-[BebasNeue] text-xl text-center mt-2">
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}

/* Table of Contents Slide – Art Studio */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-[#222] flex flex-col items-center justify-center overflow-hidden">
      {/* Background paint strokes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Decorative brush doodles */}
      <div className="absolute top-12 left-24 text-7xl text-orange-400/70 rotate-12">🖌️</div>
      <div className="absolute bottom-20 right-28 text-7xl text-purple-400/70 -rotate-12">🎨</div>
      {/* Title */}
      <h2 className="text-7xl font-bold mb-16 tracking-tight drop-shadow-lg text-[#1f1f1f] font-serif">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-pink-600 transition-colors duration-300 group">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-pink-200 group-hover:border-pink-300 shadow-lg transition-all duration-300
                ${sectionIndex % 4 === 0 ? "bg-pink-500 group-hover:bg-pink-600" : sectionIndex % 4 === 1 ? "bg-purple-500 group-hover:bg-purple-600" : sectionIndex % 4 === 2 ? "bg-blue-500 group-hover:bg-blue-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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
              <div key={actualIndex} className="flex items-center gap-8 text-gray-800 hover:text-pink-600 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-pink-200 group-hover:border-pink-300 shadow-lg transition-all duration-300
                  ${actualIndex % 4 === 0 ? "bg-pink-500 group-hover:bg-pink-600" : actualIndex % 4 === 1 ? "bg-purple-500 group-hover:bg-purple-600" : actualIndex % 4 === 2 ? "bg-blue-500 group-hover:bg-blue-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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

/* ---------------- MAIN SLIDE ---------------- */
export function MainSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-[#222] flex items-center justify-between px-16 overflow-hidden">
      {/* Background paint strokes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Left side: Auto-generated image placeholder for 2nd term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-12">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-pink-500" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/80 backdrop-blur-sm border-4 border-pink-500 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
            <div className="text-pink-600 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-cyan-600 text-xl text-center px-4 font-medium">2nd Term: {title}</span>
          </div>
        )}
      </div>

      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 pl-12">
        <div className="bg-white/80 backdrop-blur-sm border-4 border-pink-500 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-6xl font-bold mb-6 text-pink-600">{title}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-pink-500 to-cyan-500 mb-6 rounded-full"></div>
          {content && (
            <div className="bg-gradient-to-br from-pink-50 to-cyan-50 border-l-4 border-pink-500 p-6 rounded-r-2xl">
              <p className="text-4xl leading-relaxed text-gray-800">{content}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideArtStudio({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

// ImageSlide component for ArtStudio
export function ImageSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white flex items-center justify-between px-16 overflow-hidden">
      {/* Paint splatter background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-red-500 to-pink-600 rounded-full opacity-30 blur-2xl mix-blend-screen"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-30 blur-2xl mix-blend-screen"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full opacity-30 blur-xl mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-gradient-to-br from-green-500 to-teal-600 rounded-full opacity-30 blur-xl mix-blend-screen"></div>
      </div>
      
      {/* Left side: Auto-generated image placeholder for 1st term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-12">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/20" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-black/60 backdrop-blur-sm border-4 border-purple-400 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
            <div className="text-purple-300 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-pink-300 text-xl text-center px-4 font-medium">1st Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 pl-12">
        {title && (
          <h3 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">{title}</h3>
        )}
        <div className="h-[4px] w-40 bg-gradient-to-r from-purple-400 to-pink-400 mb-6 rounded-full"></div>
        {content && (
          <div className="bg-black/40 backdrop-blur-sm border-l-4 border-purple-400 p-6 rounded-r-2xl shadow-lg">
            <p className="text-4xl leading-relaxed text-gray-200">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// MainSlide1 alias for consistency
export const MainSlide1 = MainSlide;

const ArtStudio = { 
  TitleSlide, 
  MainSlide,
  MainSlide1,
  ImageSlide,
  TOCSlide,
  MainSlide2, 
  MainSlide3, 
  MainSlide4,
  EndSlide 
};

export default ArtStudio;

// Main Slide 2
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0e0e0e] text-white overflow-hidden flex flex-col items-center justify-center">
      {/* Layered abstract gradient composition */}
      <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,180,200,0.05),rgba(255,200,150,0.07),rgba(150,220,255,0.05),transparent_80%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,182,193,0.08),transparent_70%),radial-gradient(circle_at_80%_30%,rgba(137,207,240,0.08),transparent_70%)]"></div>

      {/* Decorative geometric shapes */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-[3rem] bg-gradient-to-br from-pink-400/10 to-teal-400/10 rotate-[25deg] blur-[30px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[300px] rounded-[6rem] bg-gradient-to-tr from-teal-300/10 to-purple-300/10 -rotate-[18deg] blur-[40px]"></div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-pink-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="font-[BebasNeue] text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-teal-300">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-pink-500 to-cyan-500 mb-6 rounded-full"></div>
          <p className="font-[Poppins] text-[2.5rem] leading-relaxed text-gray-200/90">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-cyan-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="font-[BebasNeue] text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full"></div>
          <p className="font-[Poppins] text-[2.5rem] leading-relaxed text-gray-200/90">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}



// Main Slide 3
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-start justify-start">
      {/* Right Blob */}
      <img
        src={ShapeRight2}
        alt="right blob"
        className="absolute right-0 top-0 h-full"
      />

      {/* Bottom Paint */}
      <img
        src={PaintBackground2}
        alt="paint background"
        className="absolute bottom-0 w-full"
      />

      {/* Text (now on the left, top-aligned) */}
      <div className="relative z-10 px-12 pt-12 max-w-5xl text-left ml-[50px] mt-[50px]">
        <h2 className="font-[BebasNeue] text-7xl mb-6">{title}</h2>
        <p className="font-[Poppins] text-[2.5rem] leading-relaxed">{content}</p>
      </div>

      <div className="absolute right-0 top-0 h-full">
        <img
          src={PaintingPng}
          alt="right blob"
          className="h-full w-[600px] translate-y-[-100px] translate-x-[-50px]"
        />
      </div>
    </section>
  );
}

// Main Slide 4
export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Paint splatter background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-red-500 to-pink-600 rounded-full opacity-30 blur-2xl mix-blend-screen"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-30 blur-2xl mix-blend-screen"></div>
      </div>

      {/* Left: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-sm border-4 border-pink-500 rounded-2xl shadow-2xl p-10">
          <h2 className="font-[BebasNeue] text-6xl mb-6 text-pink-400">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-pink-500 to-cyan-500 mb-6 rounded-full"></div>
          <p className="font-[Poppins] text-[2.5rem] leading-relaxed text-gray-200">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Right: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-sm border-4 border-cyan-500 rounded-2xl shadow-2xl p-10">
          <h2 className="font-[BebasNeue] text-6xl mb-6 text-cyan-400">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-cyan-500 to-purple-500 mb-6 rounded-full"></div>
          <p className="font-[Poppins] text-[2.5rem] leading-relaxed text-gray-200">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}


// Main Slide 6
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background paint splatter */}
      <img
        src={PaintBackground2}
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Diagonal paint streak */}
      <div className="absolute -rotate-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 w-[1400px] h-[280px] rounded-lg shadow-2xl"></div>

      {/* Overlay blob accents */}
      <img
        src={BlobShape1}
        alt="purple blob"
        className="absolute left-[-100px] bottom-[-80px] w-[400px] opacity-60"
      />
      <img
        src={BlobShape2}
        alt="orange blob"
        className="absolute right-[-120px] top-[-60px] w-[500px] opacity-70"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <h2 className="text-7xl font-bold mb-6 text-white drop-shadow-lg">
          {title}
        </h2>
        <p className="text-4xl leading-relaxed text-white">
          {content}
        </p>
      </div>
    </section>
  );
}


// End Slide
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black flex items-center justify-center overflow-hidden">
      {/* Full paint splatter background */}
      <img
        src={PaintBackground}
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blob shapes */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Back blob (purple) */}
        <img
          src={BlobShape1}
          alt="purple blob"
          className="absolute w-[570px] translate-x-1 translate-y-0"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.5))" }}
        />

        {/* Front blob (orange) */}
        <img
          src={BlobShape2}
          alt="orange blob"
          className="w-[650px]"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white font-[BebasNeue] text-6xl translate-x-5 text-center leading-snug">
            ENDSLIDE
          </h1>
        </div>
      </div>
    </section>
  );
}
