import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import { MdTranslate } from "react-icons/md";
import SpeechPng from '../pngs/speech.png';
import TalkingPng from '../pngs/talking.png';
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

/* Title Slide – Speech bubble theme */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 text-white flex flex-col items-center justify-center overflow-hidden">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Speech bubble icons */}
      <FaRegCommentDots className="absolute top-12 left-16 text-7xl opacity-30" />
      <MdTranslate className="absolute bottom-20 right-24 text-8xl opacity-20" />
      <PiTextTBold className="absolute top-1/2 left-1/4 text-6xl opacity-30" />

      <h1 className="relative z-10 text-7xl font-bold mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="relative z-10 text-2xl opacity-90">{subtitle}</h2>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#fdfbff] via-[#f5f2fc] to-[#ece8f9] text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-2xl"></div>

      {/* Floating characters */}
      <div className="absolute top-20 left-40 text-6xl font-bold text-indigo-500 opacity-40">
        あ
      </div>
      <div className="absolute bottom-28 right-48 text-6xl font-bold text-pink-500 opacity-40">
        A
      </div>
      <div className="absolute bottom-52 left-64 text-5xl font-bold text-blue-500 opacity-40">
        Ж
      </div>

      {/* Speech bubble icon */}
      <div className="absolute top-16 right-16 text-7xl text-purple-500/50">
        💬
      </div>

      {/* Title */}
      <h2 className="text-6xl font-bold font-sans text-indigo-900 mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 shadow-lg transition-all duration-300
                ${sectionIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : sectionIndex % 4 === 1 ? "bg-red-500 group-hover:bg-red-600" : sectionIndex % 4 === 2 ? "bg-yellow-500 group-hover:bg-yellow-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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
              <div key={actualIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 shadow-lg transition-all duration-300
                  ${actualIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : actualIndex % 4 === 1 ? "bg-red-500 group-hover:bg-red-600" : actualIndex % 4 === 2 ? "bg-yellow-500 group-hover:bg-yellow-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 flex items-center justify-center overflow-hidden">
      {/* Language learning background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Speech bubble decoration */}
      <div className="absolute top-16 right-16 text-7xl text-purple-500/30">💬</div>

      {/* Two-column layout mirroring ClassicClassroom behavior */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
        {/* Left: auto image or placeholder for 2nd term */}
        <div className="w-1/2 h-4/5 flex items-center justify-center px-8">
          {autoGeneratedImage ? (
            <img
              src={autoGeneratedImage}
              alt={title}
              className="w-full h-full object-cover rounded-lg border-4 border-orange-500/60 shadow-2xl"
            />
          ) : (
            <div className="w-full h-full bg-white/60 border-4 border-orange-700/60 rounded-lg flex flex-col items-center justify-center">
              <div className="text-orange-600 text-3xl font-bold mb-4">Auto Image Placeholder</div>
              <span className="text-orange-500 text-xl text-center px-4">2nd Term MainSlide</span>
            </div>
          )}
        </div>

        {/* Right: title and definition */}
        <div className="w-1/2 bg-white/80 border-4 border-indigo-500 rounded-2xl p-10 text-center shadow-2xl mx-8">
          <h2 className="text-7xl md:text-7xl lg:text-8xl font-bold mb-6 text-indigo-900">{title}</h2>
          <p className="text-4xl md:text-4xl lg:text-5xl leading-relaxed text-gray-700">{content}</p>
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideLanguageLab({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const LanguageLab = {
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

export default LanguageLab;
/* Main Slide 2 – Dialogue boxes layout */
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-indigo-900 to-blue-800 text-white">
      {/* Decorative geometric background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl top-[-100px] left-[-150px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-2xl bottom-[-100px] right-[-50px]" />
      </div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-indigo-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-blue-100">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 rounded-full"></div>
          <p className="text-[2.5rem] leading-relaxed text-blue-200/90">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-white/10 backdrop-blur-sm border-4 border-purple-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-purple-100">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-purple-400 to-pink-400 mb-6 rounded-full"></div>
          <p className="text-[2.5rem] leading-relaxed text-purple-200/90">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 3 – Asymmetrical floating panels */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-bl from-pink-200 via-yellow-100 to-blue-200 flex p-16 overflow-hidden">
      {/* Floating panels */}
      <div className="absolute top-10 left-16 w-48 h-28 bg-white shadow-lg rounded-lg rotate-6 opacity-70"></div>
      <div className="absolute bottom-16 right-24 w-56 h-32 bg-white shadow-lg rounded-lg -rotate-6 opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center max-w-4xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-[2.5rem] text-gray-800 leading-relaxed">{content}</p>
      </div>

      <div className="absolute mt-[200px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src={SpeechPng} alt="speech"/>
      </div>
    </section>
  );
}


export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden">
      {/* Abstract geometric accents */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/40 to-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-blue-400/30 to-indigo-400/20 rounded-full blur-3xl"></div>

      {/* Left: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-md border-4 border-indigo-500 rounded-2xl shadow-2xl p-10">
          <h2 className="text-6xl font-bold mb-6 text-pink-300 drop-shadow-[0_0_30px_rgba(255,0,200,0.4)]">{title || 'Term 1'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 rounded-full"></div>
          <p className="text-[2.5rem] leading-relaxed text-blue-100">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Right: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-md border-4 border-pink-500 rounded-2rem p-10 shadow-2xl">
          <h2 className="text-6xl font-bold mb-6 text-cyan-300 drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]">{title2 || 'Term 2'}</h2>
          <div className="h-[4px] w-40 bg-gradient-to-r from-pink-400 to-cyan-400 mb-6 rounded-full"></div>
          <p className="text-[2.5rem] leading-relaxed text-blue-100">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}


/* Main Slide 5 – Layered Bubble Stack */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 overflow-hidden flex items-center justify-center">
      {/* Decorative ribbons */}
      <div className="absolute top-0 left-0 w-[60%] h-[50%] bg-gradient-to-tr from-pink-400/40 to-purple-400/30 skew-y-6 rounded-br-[6rem]"></div>
      <div className="absolute bottom-0 right-0 w-[50%] h-[60%] bg-gradient-to-bl from-blue-400/30 to-pink-300/20 -skew-y-6 rounded-tl-[6rem]"></div>

      {/* Background icons for atmosphere */}
      <FaRegCommentDots className="absolute top-16 right-32 text-[9rem] text-pink-500/30" />
      <MdTranslate className="absolute bottom-24 left-32 text-[9rem] text-indigo-400/30" />
      <PiTextTBold className="absolute top-1/2 left-1/2 -translate-x-1/2 text-[14rem] text-purple-400/10" />

      {/* Foreground content box */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-[3rem] shadow-2xl p-16 max-w-5xl text-center border border-white/30">
        <h2 className="text-7xl font-bold mb-8 text-purple-900 tracking-wide drop-shadow-[0_0_15px_rgba(150,100,255,0.3)]">
          {title}
        </h2>
        <p className="text-[2.5rem] text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 6 – Diagonal split with layered accents */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-2xl"></div>
      
      {/* Diagonal accent bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/60 to-transparent transform -skew-y-6"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-32 max-w-5xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-[2.5rem] leading-relaxed text-gray-800">{content}</p>
      </div>

      <div className="absolute mt-[160px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src={TalkingPng} alt="talking"/>
      </div>
    </section>
  );
}



/* Image Slide – Dictionary style card */
export function ImageSlide({ title, content, autoGeneratedImage, imageUrl }) {
  const imageSrc = autoGeneratedImage || imageUrl;
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex items-center justify-center overflow-hidden">
      {/* Border frame */}
      <div className="absolute inset-8 border-4 border-blue-700 rounded-lg"></div>

      <div className="relative z-10 w-5/6 h-5/6 flex items-center justify-between">
        {/* Left: auto image or placeholder for 1st term */}
        <div className="w-1/2 h-full flex items-center justify-center pr-8">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg border-4 border-pink-400/60 shadow-2xl"
            />
          ) : (
            <div className="w-4/5 h-4/5 bg-white/60 border-4 border-blue-700/60 rounded-lg flex flex-col items-center justify-center">
              <div className="text-blue-600 text-3xl font-bold mb-4">Auto Image Placeholder</div>
              <span className="text-blue-500 text-xl text-center px-4">1st Term ImageSlide</span>
            </div>
          )}
        </div>

        {/* Right: term and definition */}
        <div className="w-1/2 text-gray-900 px-8">
          {title && (
            <h2 className="text-6xl md:text-7xl lg:text-8xl mb-8 font-bold text-indigo-900">
              {title}
            </h2>
          )}
          {content && <p className="text-4xl leading-relaxed text-gray-700">{content}</p>}
        </div>
      </div>
    </section>
  );
}

/* End Slide – Speech bubble close */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center text-white">
      {/* Giant bubble background */}
      <div className="absolute w-[800px] h-[400px] rounded-full bg-white/20 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-bold mb-4">{message}</h2>
        <p className="text-2xl opacity-80">The End</p>
      </div>
    </section>
  );
}
