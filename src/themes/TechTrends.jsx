import React from "react";
import { FaRobot, FaMicrochip } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import { PiCircuitryBold } from "react-icons/pi";
import { Cpu, Wifi, Cloud, CircuitBoard, Code2, Database } from "lucide-react";
import technology from '../imgs/technology.jpg';
import RobotPng from '../pngs/robot.png';
import RobotSvg from '../svgs/robot.svg';
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

/* Title Slide – Futuristic grid + neon glow */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 flex items-center justify-center text-white">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Layered grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15),transparent_70%)]"></div>

      {/* Neon circuit lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-0 w-1/2 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent blur-sm"></div>
        <div className="absolute bottom-32 right-0 w-1/2 h-[2px] bg-gradient-to-l from-fuchsia-400 via-purple-500 to-transparent blur-sm"></div>
        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent blur-sm"></div>
      </div>

      {/* Floating futuristic icons */}
      <FaRobot className="absolute top-24 left-32 text-[9rem] text-cyan-400/30" />
      <FaMicrochip className="absolute bottom-24 right-32 text-[10rem] text-fuchsia-400/25" />
      <PiCircuitryBold className="absolute top-1/2 left-1/2 -translate-x-1/2 text-[16rem] text-blue-400/10" />

      {/* Title and subtitle */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold tracking-widest mb-8 text-cyan-300 drop-shadow-[0_0_35px_rgba(0,200,255,0.4)]">
          {title}
        </h1>
        <h2 className="text-4xl font-light text-blue-200/80 tracking-wide">
          {subtitle}
        </h2>
      </div>

      {/* Subtle glow ring */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05),transparent_70%)]"></div>
    </section>
  );
}


/* Table of Contents Slide – Tech Trends */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Futuristic glowing grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      {/* Neon circuit lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg"></div>
      <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500 to-purple-600 shadow-lg"></div>

      {/* Title */}
      <h2 className="text-6xl font-bold tracking-wide text-cyan-300 mb-16 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 hover:text-cyan-300 transition-colors duration-300 group">
              <div className="w-20 h-20 rounded-lg border-3 border-cyan-400 group-hover:border-cyan-300 bg-gray-900/50 group-hover:bg-gray-800/60 flex items-center justify-center text-2xl text-cyan-400 group-hover:text-cyan-300 font-bold flex-shrink-0 shadow-lg transition-all duration-300">
                {sectionIndex + 1}
              </div>
              <span className="text-5xl font-semibold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 hover:text-cyan-300 transition-colors duration-300 group">
                <div className="w-20 h-20 rounded-lg border-3 border-cyan-400 group-hover:border-cyan-300 bg-gray-900/50 group-hover:bg-gray-800/60 flex items-center justify-center text-2xl text-cyan-400 group-hover:text-cyan-300 font-bold flex-shrink-0 shadow-lg transition-all duration-300">
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-semibold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
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
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-cyan-400/30"></div>
          ))}
        </div>
      </div>

      {/* Neon accents */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg"></div>
      <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500 to-purple-600 shadow-lg"></div>

      {/* Two-column layout mirroring ClassicClassroom behavior */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
        {/* Left: auto image or placeholder for 2nd term */}
        <div className="w-1/2 h-4/5 flex items-center justify-center px-8">
          {autoGeneratedImage ? (
            <img
              src={autoGeneratedImage}
              alt={title}
              className="w-full h-full object-cover rounded-lg border-4 border-cyan-500/60 shadow-2xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-900/60 border-4 border-cyan-700/60 rounded-lg flex flex-col items-center justify-center">
              <div className="text-cyan-400 text-3xl font-bold mb-4">Auto Image Placeholder</div>
              <span className="text-cyan-300 text-xl text-center px-4">2nd Term MainSlide</span>
            </div>
          )}
        </div>

        {/* Right: title and definition */}
        <div className="w-1/2 bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 rounded-lg p-10 text-center shadow-2xl mx-8">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">{title}</h2>
          <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-300">{content}</p>
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideTechTrends({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const TechTrends = {
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

export default TechTrends;

/* Main Slide 2 – Image left, text right */
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex flex-col items-center justify-center bg-gradient-to-r from-blue-950 to-gray-900 text-white">
      {/* Grid overlay for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 rounded-lg shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">{title || 'Term 1'}</h2>
          <div className="h-[3px] w-32 bg-gradient-to-r from-cyan-400 to-blue-600 mb-4"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-300">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="h-full bg-gray-900/80 backdrop-blur-sm border-2 border-purple-400 rounded-lg shadow-2xl p-8 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 text-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">{title2 || 'Term 2'}</h2>
          <div className="h-[3px] w-32 bg-gradient-to-r from-purple-400 to-pink-600 mb-4"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-300">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 3 – Split diagonal futuristic style */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden text-white">
      {/* Left content area (65%) */}
      <div className="relative w-[65%] h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col justify-center px-24">
        {/* Grid overlay for tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Text content */}
        <div className="relative z-10">
          <h2 className="text-7xl font-extrabold text-blue-300 mb-10 drop-shadow-lg">
            {title}
          </h2>
          <p className="text-[2.5rem] leading-relaxed text-gray-200 max-w-3xl">
            {content}
          </p>
        </div>
      </div>

      {/* Right image area (35%) */}
      <div className="relative w-[35%] h-full bg-black/30">
        <img
            src={technology}
            alt="Tech visual"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
        {/* Futuristic glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/40 to-transparent mix-blend-overlay"></div>
      </div>
    </section>
  );
}



/* Main Slide 4 – Circuit board background + tech icons */
export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-950 text-white flex items-center justify-center overflow-hidden">
      {/* Circuit lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <path d="M200 0 V1080 M600 0 V1080 M1000 0 V1080 M1400 0 V1080" stroke="#3b82f6" strokeWidth="2"/>
          <path d="M0 200 H1920 M0 600 H1920 M0 1000 H1920" stroke="#8b5cf6" strokeWidth="2"/>
        </svg>
      </div>

      {/* Floating icons */}
      <Cpu className="absolute top-24 left-20 text-blue-400 opacity-40 w-16 h-16" />
      <CircuitBoard className="absolute bottom-32 right-32 text-purple-400 opacity-30 w-20 h-20" />

      {/* Left: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 rounded-lg shadow-2xl p-10">
          <h2 className="text-6xl font-extrabold mb-6 text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">{title || 'Term 1'}</h2>
          <div className="h-[3px] w-32 bg-gradient-to-r from-cyan-400 to-blue-600 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-300">{content || 'Definition for term 1'}</p>
        </div>
      </div>

      {/* Right: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-purple-400 rounded-lg shadow-2xl p-10">
          <h2 className="text-6xl font-extrabold mb-6 text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">{title2 || 'Term 2'}</h2>
          <div className="h-[3px] w-32 bg-gradient-to-r from-purple-400 to-pink-600 mb-6"></div>
          <p className="text-[2.5rem] leading-relaxed text-gray-300">{content2 || 'Definition for term 2'}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 5 – Holographic panels + icons */
export function MainSlide5({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white flex items-center justify-center p-16 overflow-hidden">
      {/* Holographic panels */}
      <div className="absolute top-24 left-20 w-72 h-44 bg-blue-600/30 border border-blue-400/40 rounded-xl backdrop-blur-md transform rotate-6"></div>
      <div className="absolute bottom-24 right-32 w-80 h-52 bg-purple-600/30 border border-purple-400/40 rounded-xl backdrop-blur-md transform -rotate-6"></div>

      {/* Floating icons */}
      <Wifi className="absolute top-12 right-16 text-cyan-400 opacity-30 w-14 h-14" />
      <Database className="absolute bottom-20 left-32 text-blue-400 opacity-40 w-16 h-16" />
      <Code2 className="absolute top-1/3 right-1/4 text-purple-300 opacity-30 w-12 h-12" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Image */}
        <div className="w-[700px] h-[350px] flex items-center justify-center">
          <img src={RobotSvg} alt="robot" crossOrigin="anonymous" onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=RobotPng; }} />
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-7xl font-bold text-purple-300 mb-6">{title}</h2>
          <p className="text-[2.5rem] leading-relaxed text-gray-300">{content}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 6 – Futuristic HUD + icons */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#020617] text-white flex items-center justify-center overflow-hidden">
      {/* Background holographic grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20"></div>

      {/* Holographic rings */}
      <div className="absolute w-[900px] h-[900px] border border-cyan-400/20 rounded-full blur-sm"></div>
      <div className="absolute w-[650px] h-[650px] border border-blue-400/30 rounded-full blur-sm"></div>
      <div className="absolute w-[400px] h-[400px] border border-purple-500/30 rounded-full blur-sm"></div>

      {/* Light beams */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-cyan-400/60 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent"></div>

      {/* Holographic glow around content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_70%)] blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center backdrop-blur-sm p-12 border border-cyan-500/30 rounded-3xl bg-white/5">
        <h2 className="text-7xl font-extrabold text-cyan-300 tracking-widest drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] mb-10">
          {title}
        </h2>
        <p className="text-[2.5rem] leading-relaxed text-gray-200 max-w-4xl mx-auto drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">
          {content}
        </p>
      </div>
    </section>
  );
}


/* Image Slide – Framed neon */
export function ImageSlide({ title, content, autoGeneratedImage, imageUrl }) {
  const imageSrc = autoGeneratedImage || imageUrl;
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:80px_80px] opacity-10"></div>

      <div className="relative z-10 w-5/6 h-5/6 flex items-center justify-between">
        {/* Left: auto image or placeholder for 1st term */}
        <div className="w-1/2 h-full flex items-center justify-center pr-8">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg border-4 border-cyan-500/60 shadow-2xl"
            />
          ) : (
            <div className="w-4/5 h-4/5 bg-gray-900/60 border-4 border-cyan-700/60 rounded-lg flex flex-col items-center justify-center">
              <div className="text-cyan-400 text-3xl font-bold mb-4">Auto Image Placeholder</div>
              <span className="text-cyan-300 text-xl text-center px-4">1st Term ImageSlide</span>
            </div>
          )}
        </div>

        {/* Right: term and definition */}
        <div className="w-1/2 text-white px-8">
          {title && (
            <h2 className="text-6xl md:text-7xl lg:text-8xl mb-8 font-bold text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">
              {title}
            </h2>
          )}
          {content && <p className="text-4xl leading-relaxed text-gray-300">{content}</p>}
        </div>
      </div>

      {/* Glow accents */}
      <div className="absolute bottom-20 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      <div className="absolute top-40 right-20 w-[300px] h-[300px] rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
    </section>
  );
}

/* End Slide – Trend line graph vibe */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center text-white overflow-hidden">
      {/* Trend line */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="100%" height="100%">
          <polyline
            points="0,600 200,500 400,550 600,400 800,420 1000,300 1280,350"
            fill="none"
            stroke="cyan"
            strokeWidth="8"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-extrabold mb-6">{message}</h2>
        <p className="text-2xl text-blue-300">End of Tech Trends</p>
      </div>
    </section>
  );
}
