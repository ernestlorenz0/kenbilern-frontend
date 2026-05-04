import React from "react";
import { Atom, Beaker, CircuitBoard, FunctionSquare, FlaskConical, Triangle, Cpu, Satellite} from "lucide-react";
import neuronBg from "../pngs/neurons.png";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

// STEM Modern Title Slide
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#3a506b] text-white flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      
      {/* Animated tech grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00f6ff20_1px,transparent_1px),linear-gradient(to_bottom,#00f6ff20_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>

      {/* Glowing network lines */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#00f6ff30,transparent_70%),radial-gradient(circle_at_80%_80%,#4fd1c520,transparent_70%)]"></div>

      {/* Floating geometric icons (STEM symbols) */}
      <Atom className="absolute top-24 left-24 w-32 h-32 text-cyan-300/30 animate-pulse" />
      <CircuitBoard className="absolute bottom-24 right-24 w-32 h-32 text-cyan-300/25 animate-pulse" />
      <Beaker className="absolute bottom-24 left-36 w-24 h-24 text-cyan-400/20 rotate-12" />
      <Triangle className="absolute top-32 right-40 w-24 h-24 text-cyan-300/20 -rotate-12" />

      {/* Accent glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,246,255,0.08),transparent_70%)]"></div>

      {/* Title & Subtitle */}
      <div className="relative z-10 text-center">
        <h1 className="font-['Orbitron'] text-8xl font-bold tracking-wider text-cyan-100 drop-shadow-[0_0_20px_rgba(0,246,255,0.7)] mb-4 animate-fade-in">
          {title || "STEM INNOVATION"}
        </h1>
        {subtitle && (
          <p className="font-['Rajdhani'] text-3xl text-cyan-200/80 tracking-widest animate-slide-up">
            {subtitle || "Science • Technology • Engineering • Mathematics"}
          </p>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
    </section>
  );
}

/* Table of Contents Slide – STEM Modern Artistic */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0d0d0f] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Abstract gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 rounded-full blur-[200px] opacity-40"></div>

      {/* Geometric + STEM-inspired lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-400 drop-shadow-lg mb-16">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-200 hover:text-cyan-300 transition-colors duration-300 group">
              <div className="w-20 h-20 rounded-full border-3 border-cyan-400/40 group-hover:border-cyan-300/60 flex items-center justify-center text-2xl text-cyan-400 font-bold flex-shrink-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300 shadow-lg">
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
              <div key={actualIndex} className="flex items-center gap-8 text-gray-200 hover:text-cyan-300 transition-colors duration-300 group">
                <div className="w-20 h-20 rounded-full border-3 border-cyan-400/40 group-hover:border-cyan-300/60 flex items-center justify-center text-2xl text-cyan-400 font-bold flex-shrink-0 bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-all duration-300 shadow-lg">
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-semibold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative equations/doodles */}
      <div className="absolute top-24 right-24 text-cyan-300/50 text-2xl font-mono">
        E = mc²
      </div>
      <div className="absolute bottom-20 left-24 text-pink-400/50 text-xl font-mono">
        ∫ f(x) dx
      </div>
    </section>
  );
}



export function MainSlide1({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] flex items-center justify-between px-16">

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />
      <FlaskConical className="absolute top-1/2 left-1/2 w-24 h-24 text-yellow-400/20 -translate-x-1/2" />

      {/* Left side: Auto-generated image placeholder for 2nd term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-8">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-lg border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,246,255,0.4)]" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/5 backdrop-blur-md border-2 border-cyan-400/40 rounded-xl flex flex-col items-center justify-center">
            <div className="text-cyan-300 text-3xl font-mono font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-cyan-200 text-xl text-center px-4 font-mono">2nd Term: {title}</span>
          </div>
        )}
      </div>

      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-7xl font-bold font-mono text-cyan-300 mb-6 drop-shadow-[0_0_10px_rgba(0,246,255,0.7)]">
          {title}
        </h2>

        {/* Accent line */}
        <div className="h-[3px] w-24 bg-cyan-400 mb-6 shadow-[0_0_10px_rgba(0,246,255,0.7)]"></div>

        {/* Content */}
        <p className="text-5xl font-mono text-gray-200 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#38bdf820,transparent)]"></div>
    </section>
  );
}


export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0a192f] flex flex-col items-center justify-center overflow-hidden">

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl p-8 h-full flex flex-col justify-center">
          <h2 className="text-7xl font-orbitron font-mono text-cyan-300 mb-4 drop-shadow-[0_0_20px_rgba(0,246,255,0.7)]">
            {title || 'Term 1'}
          </h2>
          <div className="h-[3px] w-24 bg-cyan-400 mb-4 shadow-[0_0_10px_rgba(0,246,255,0.7)]"></div>
          <p className="text-5xl font-rajdhani text-gray-200 leading-relaxed">
            {content || 'Definition for term 1'}
          </p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl p-8 h-full flex flex-col justify-center">
          <h2 className="text-7xl font-orbitron font-mono text-cyan-300 mb-4 drop-shadow-[0_0_20px_rgba(0,246,255,0.7)]">
            {title2 || 'Term 2'}
          </h2>
          <div className="h-[3px] w-24 bg-cyan-400 mb-4 shadow-[0_0_10px_rgba(0,246,255,0.7)]"></div>
          <p className="text-5xl font-rajdhani text-gray-200 leading-relaxed">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#3a506b] text-white overflow-hidden flex items-center justify-center">
      {/* Animated tech grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#00f6ff15_1px,transparent_1px),linear-gradient(to_bottom,#00f6ff15_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>

      {/* Glowing radial orbs for energy feel */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/20 blur-3xl"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/20 blur-3xl"></div>

      {/* STEM icons */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />

      {/* Futuristic frame */}
      <div className="absolute inset-0 border-[6px] border-cyan-400/30 rounded-3xl pointer-events-none"></div>

      {/* Glow accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>

      {/* Content area */}
      <div className="relative z-10 text-center px-32">
        <h2 className="font-orbitron text-8xl font-bold text-cyan-300 mb-8 drop-shadow-[0_0_20px_rgba(0,246,255,0.6)] animate-fade-in">
          {title || "Scientific Principles"}
        </h2>
        <p className="font-rajdhani text-6xl text-gray-200/90 leading-relaxed max-w-5xl mx-auto animate-slide-up">
          {content ||
            "Exploring the intersection of science, technology, engineering, and mathematics — bridging knowledge with innovation."}
        </p>
      </div>
    </section>
  );
}
// STEM Modern Image Slide
export function ImageSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-[#0a192f] to-[#112d4e] flex items-center justify-between px-16">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      {/* Left side: Auto-generated image placeholder for 1st term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-8">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-lg border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(0,246,255,0.4)]" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/5 backdrop-blur-md border-2 border-cyan-400/40 rounded-xl flex flex-col items-center justify-center">
            <div className="text-cyan-300 text-3xl font-mono font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-cyan-200 text-xl text-center px-4 font-mono">1st Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 text-white px-8">
        {title && <h2 className="font-mono text-7xl font-bold mb-8 text-cyan-300 drop-shadow-[0_0_10px_rgba(0,246,255,0.7)]">{title}</h2>}
        {content && <p className="text-5xl leading-relaxed text-white/90 font-light">{content}</p>}
      </div>
    </section>
  );
}

export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#050816] text-white overflow-hidden flex items-center justify-center">
      {/* === Animated gradient background === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10"></div>

      {/* === Dynamic light beams === */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom_right,rgba(0,255,255,0.1),transparent_70%)] animate-scan" />
      <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_top_left,rgba(0,100,255,0.08),transparent_70%)] animate-scan2" />

      {/* === Floating tech elements === */}
      <Atom className="absolute top-[12%] left-[8%] w-28 h-28 text-cyan-400/25 animate-pulse-slow" />
      <Cpu className="absolute top-[18%] right-[10%] w-24 h-24 text-blue-400/25 animate-pulse-slow" />
      <Beaker className="absolute bottom-[15%] left-[15%] w-28 h-28 text-indigo-400/25 animate-pulse-slow" />
      <Satellite className="absolute bottom-[10%] right-[15%] w-32 h-32 text-cyan-300/25 animate-pulse-slow" />

      {/* Left Half: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-cyan-300/40 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.25)] p-12">
          <h2 className="text-7xl font-orbitron text-cyan-300 mb-6 drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">
            {title || 'Term 1'}
          </h2>
          <div className="h-[4px] w-24 bg-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,255,255,0.6)] rounded-full"></div>
          <p className="text-5xl font-rajdhani text-cyan-100/90 leading-relaxed">
            {content || 'Definition for term 1'}
          </p>
        </div>
      </div>

      {/* Right Half: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-cyan-300/40 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.25)] p-12">
          <h2 className="text-7xl font-orbitron text-cyan-300 mb-6 drop-shadow-[0_0_25px_rgba(0,255,255,0.6)]">
            {title2 || 'Term 2'}
          </h2>
          <div className="h-[4px] w-24 bg-cyan-400 mb-6 shadow-[0_0_20px_rgba(0,255,255,0.6)] rounded-full"></div>
          <p className="text-5xl font-rajdhani text-cyan-100/90 leading-relaxed">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>

      {/* === Floating glow orbs === */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[200px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[220px] bottom-[-150px] right-[-150px]" />

    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#050816] via-[#0a192f] to-[#112d4e] text-white flex items-center justify-center overflow-hidden">
      {/* Layer 1 – glowing mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Layer 2 – gradient orbs */}
      <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-cyan-500/25 blur-[200px]" />
      <div className="absolute bottom-[-300px] right-[-200px] w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[220px]" />
      <div className="absolute top-[400px] left-[500px] w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[160px]" />

      {/* Layer 3 – diagonal accent lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-[20%] top-0 w-[140%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rotate-[10deg]" />
        <div className="absolute -left-[10%] top-[40%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rotate-[10deg]" />
        <div className="absolute -left-[15%] bottom-[20%] w-[130%] h-[2px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent rotate-[10deg]" />
      </div>

      {/* Layer 4 – faint background STEM icons */}
      <div className="absolute inset-0 opacity-15">
        <Atom className="absolute top-[10%] left-[8%] w-28 h-28 text-cyan-300/40" />
        <Beaker className="absolute bottom-[15%] right-[12%] w-28 h-28 text-blue-400/35" />
        <CircuitBoard className="absolute top-[40%] right-[18%] w-36 h-36 text-indigo-400/30" />
        <FunctionSquare className="absolute bottom-[25%] left-[20%] w-32 h-32 text-green-400/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-24 max-w-6xl">
        {/* Title */}
        <h2 className="text-8xl font-orbitron font-bold text-cyan-300 tracking-wide mb-6 drop-shadow-[0_0_25px_rgba(0,246,255,0.6)]">
          {title || "Exploring Innovation"}
        </h2>

        {/* Animated underline */}
        <div className="relative h-[4px] w-40 bg-cyan-400 rounded-full mb-10 overflow-hidden shadow-[0_0_25px_rgba(0,246,255,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[shine_2s_linear_infinite]" />
        </div>

        {/* Content */}
        <p className="text-5xl font-rajdhani text-cyan-100/90 leading-relaxed max-w-5xl drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          {content ||
            "Where science meets creativity — merging technology, engineering, and mathematics to shape the future of innovation."}
        </p>
      </div>

      {/* Glow animation keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

// STEM Modern Section Header
export function EndSlide({ title }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#112d4e] flex items-center justify-center">

      <div className="absolute -top-32 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-600/30 blur-3xl" />
      <div className="absolute bottom-[-150px] right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/30 to-indigo-600/30 blur-3xl" />

      {/* STEM icons */}
      <Atom className="absolute top-16 left-24 w-32 h-32 text-cyan-400/20" />
      <Beaker className="absolute bottom-20 right-40 w-28 h-28 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/4 right-16 w-32 h-32 text-indigo-400/20" />
      <FunctionSquare className="absolute bottom-32 left-1/3 w-28 h-28 text-green-400/20" />


      <h2 className="text-8xl font-extrabold font-mono text-cyan-300 tracking-wide drop-shadow-lg">
        Thank You
      </h2>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f6ff15,transparent)]"></div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideSTEM({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const STEMModern = { TitleSlide, TOCSlides: TOCSlide, ImageSlide, MainSlide1, MainSlide2, MainSlide3, MainSlide4, MainSlide6, EndSlide };
export default STEMModern;
