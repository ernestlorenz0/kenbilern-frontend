import React from "react";
import { Pencil, BookOpen, Puzzle, PartyPopper, Pin} from "lucide-react";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

/* Title Slide */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 to-playful-400 flex flex-col items-center justify-center text-playful-900 animate-bounce-in overflow-hidden">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      {/* Background playful shapes */}
      <div className="absolute w-64 h-64 bg-yellow-400 rounded-full opacity-30 -top-12 -left-12"></div>
      <div className="absolute w-48 h-48 bg-pink-400 rounded-full opacity-30 bottom-8 left-32"></div>
      <div className="absolute w-56 h-56 bg-blue-400 rotate-12 opacity-30 -bottom-16 right-12"></div>

      {/* Text */}
      <h1 className="text-8xl font-extrabold font-sans mb-8 drop-shadow-lg z-10">
        {title}
      </h1>
      <h2 className="text-4xl font-semibold font-sans opacity-90 z-10">
        {subtitle}
      </h2>
    </section>
  );
}

/* Table of Contents Slide – Playful Primary */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#fff9e6] text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background playful blobs */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-pink-300 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-yellow-300 rounded-full blur-[140px] opacity-50"></div>
      <div className="absolute top-1/3 left-2/3 w-[300px] h-[300px] bg-cyan-300 rounded-full blur-[100px] opacity-50"></div>

      {/* Fun doodles */}
      <div className="absolute top-20 left-32 text-5xl text-yellow-400">⭐</div>
      <div className="absolute bottom-28 right-32 text-5xl text-pink-400">✏️</div>
      <div className="absolute top-2/3 left-16 text-4xl text-cyan-400">🎨</div>

      {/* Title */}
      <h2 className="text-6xl font-bold text-pink-500 mb-12 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 hover:text-orange-600 transition-colors duration-300 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 group-hover:from-orange-500 group-hover:to-pink-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 transition-all duration-300">
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
              <div key={actualIndex} className="flex items-center gap-8 hover:text-orange-600 transition-colors duration-300 group">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 transition-all duration-300
                  ${actualIndex % 4 === 0 ? "bg-gradient-to-r from-orange-400 to-pink-500 group-hover:from-orange-500 group-hover:to-pink-600" : actualIndex % 4 === 1 ? "bg-gradient-to-r from-pink-400 to-purple-500 group-hover:from-pink-500 group-hover:to-purple-600" : actualIndex % 4 === 2 ? "bg-gradient-to-r from-purple-400 to-red-500 group-hover:from-purple-500 group-hover:to-red-600" : "bg-gradient-to-r from-red-400 to-orange-500 group-hover:from-red-500 group-hover:to-orange-600"}`}>
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


export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#fef9c3] via-[#fde68a] to-[#fcd34d] text-gray-900 overflow-hidden flex items-center justify-center">
      {/* Floating colorful blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-300 rounded-full blur-[150px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[450px] h-[450px] bg-cyan-300 rounded-full blur-[150px] opacity-60 animate-pulse"></div>
      <div className="absolute top-[200px] right-[300px] w-[250px] h-[250px] bg-green-300 rounded-full blur-[100px] opacity-50"></div>

      {/* Lucide icons as background doodles */}
      <Puzzle className="absolute top-20 left-28 w-20 h-20 text-pink-500/50 rotate-12" />
      <BookOpen className="absolute bottom-24 right-32 w-20 h-20 text-yellow-600/50 -rotate-12" />
      <PartyPopper className="absolute top-1/2 left-16 w-24 h-24 text-cyan-500/60 animate-bounce" />
      <Pencil className="absolute bottom-1/4 right-1/4 w-20 h-20 text-green-500/50" />

      {/* Central content card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md border-8 border-yellow-300 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[3rem] px-20 py-16 text-center transform hover:scale-[1.02] transition-all duration-500">
        <h2 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-8 drop-shadow-md">
          {title || "Playful Learning!"}
        </h2>
        <p className="text-5xl leading-relaxed text-gray-800 font-medium max-w-4xl mx-auto">
          {content || "Bright colors and fun shapes make learning exciting!"}
        </p>
      </div>

      {/* Animated accent rings */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 border-4 border-pink-400/40 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 border-4 border-cyan-400/30 rounded-full animate-spin-reverse-slow"></div>
    </section>
  );
}


/* Main Slide 1 - Title + underline + content */
export function MainSlide1({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-playful-100 flex items-center justify-between text-playful-900 px-16 overflow-hidden">
      {/* Playful background shapes */}
      <div className="absolute w-32 h-32 bg-pink-300 rounded-full opacity-20 top-8 left-8"></div>
      <div className="absolute w-48 h-48 bg-blue-300 rotate-45 opacity-20 bottom-8 right-12"></div>
      <div className="absolute w-24 h-24 bg-yellow-300 rounded-full opacity-20 top-1/3 right-1/4"></div>
      <div className="absolute w-36 h-36 bg-green-300 rounded-2xl opacity-20 bottom-1/4 left-1/3 rotate-12"></div>

      {/* Left side: Auto-generated image placeholder for 2nd term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-8">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-8 border-white" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/90 border-8 border-playful-600 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
            <div className="text-playful-700 text-4xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-playful-600 text-2xl text-center px-4 font-bold">2nd Term: {title}</span>
          </div>
        )}
      </div>

      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 px-8">
        {title && (
          <h2 className="text-7xl font-bold font-sans mb-6 drop-shadow-md bg-white/80 px-6 py-3 rounded-2xl text-center border-4 border-playful-500">
            {title}
          </h2>
        )}
        <div className="h-2 w-40 bg-playful-700 rounded-full mb-6 mx-auto"></div>
        {content && (
          <div className="bg-white/90 rounded-2xl p-6 shadow-xl border-4 border-playful-400">
            <p className="text-5xl font-sans leading-relaxed text-playful-800 text-center">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* Main Slide 2 - Split layout with 2 terms (Top-Bottom) */
export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-playful-300 to-playful-200 flex flex-col items-center justify-center text-playful-900 animate-slide-up px-20 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full opacity-20 -top-16 right-20 animate-bounce"></div>
      <div className="absolute w-52 h-52 bg-green-300 rotate-12 opacity-20 bottom-0 left-10 animate-pulse"></div>
      <div className="absolute w-40 h-40 bg-pink-300 rounded-full opacity-20 top-1/4 left-20 animate-bounce"></div>
      <div className="absolute w-48 h-48 bg-blue-300 rotate-45 opacity-20 bottom-1/4 right-16 animate-pulse"></div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border-8 border-yellow-300 p-8 h-full flex flex-col justify-center transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-7xl font-bold font-sans mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 drop-shadow-md">
            {title || 'Term 1'}
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mb-4"></div>
          <p className="text-[3rem] font-sans leading-relaxed text-gray-800">
            {content || 'Definition for term 1'}
          </p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border-8 border-green-300 p-8 h-full flex flex-col justify-center transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-7xl font-bold font-sans mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 drop-shadow-md">
            {title2 || 'Term 2'}
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4"></div>
          <p className="text-[3rem] font-sans leading-relaxed text-gray-800">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden flex flex-col items-center justify-center text-center bg-gradient-to-tr from-[#F9D3FF] via-[#A0E9FF] to-[#BFFCC6]">
      {/* Animated background rings */}
      <div className="absolute w-[1400px] h-[1400px] border-[80px] border-[#FFB6B9]/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[1000px] h-[1000px] border-[60px] border-[#A0E7E5]/30 rounded-full animate-spin-slower"></div>
      <div className="absolute w-[700px] h-[700px] border-[40px] border-[#B9FBC0]/30 rounded-full animate-spin-reverse"></div>

      {/* Floating blobs */}
      <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-[#FF8FAB] rounded-[60%] blur-[100px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-[#FFC8DD] rounded-[70%] blur-[100px] opacity-60 animate-bounce"></div>

      {/* Center text */}
      <div className="relative z-10 max-w-5xl px-10">
        <h1 className="text-[7rem] font-['Baloo_2'] text-[#3A0CA3] drop-shadow-[4px_4px_0_#FFBE0B] mb-8 leading-none">
          {title || "Exploring the Future"}
        </h1>
        <p className="text-[3rem] font-['Poppins'] text-[#2B2D42] leading-snug font-medium drop-shadow-[2px_2px_0_#FFD6A5]">
          {content ||
            "Dive into a colorful world where imagination meets innovation — playful, modern, and full of life!"}
        </p>
      </div>
    </section>
  );
}


export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden flex items-center justify-center bg-[#fffaf3]">
      {/* Wavy colorful background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,200 Q480,100 960,200 T1920,200 L1920,0 L0,0 Z"
          fill="#FF9F1C"
          opacity="0.8"
        />
        <path
          d="M0,500 Q480,600 960,500 T1920,500 L1920,1080 L0,1080 Z"
          fill="#FFB6C1"
          opacity="0.8"
        />
        <path
          d="M0,800 Q480,650 960,800 T1920,800 L1920,1080 L0,1080 Z"
          fill="#A0E7E5"
          opacity="0.7"
        />
        <path
          d="M0,950 Q480,900 960,950 T1920,950 L1920,1080 L0,1080 Z"
          fill="#FEC260"
          opacity="0.6"
        />
      </svg>

      {/* Floating blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-[#FF6B6B] rounded-[60%] blur-[100px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[500px] h-[500px] bg-[#CDB4DB] rounded-[70%] blur-[120px] opacity-50 animate-bounce"></div>

      {/* Left Half: First Term */}
      <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border-8 border-pink-300 p-10 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-7xl font-['Fredoka_One'] text-[#FF4D6D] drop-shadow-[4px_4px_0_#FFD6A5] mb-6">
            {title || 'Term 1'}
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mb-4"></div>
          <p className="text-[3rem] font-['Poppins'] text-[#1C1C1C] leading-snug font-medium">
            {content || 'Definition for term 1'}
          </p>
        </div>
      </div>

      {/* Right Half: Second Term */}
      <div className="absolute right-[100px] top-1/2 -translate-y-1/2 w-[800px] z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl border-8 border-blue-300 p-10 transform hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-7xl font-['Fredoka_One'] text-[#00BBF9] drop-shadow-[4px_4px_0_#FFD6A5] mb-6">
            {title2 || 'Term 2'}
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4"></div>
          <p className="text-[3rem] font-['Poppins'] text-[#1C1C1C] leading-snug font-medium">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>
    </section>
  );
}


export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden flex items-center justify-center bg-[#fff6f0] text-[#3a1c71]">
      {/* Background abstract blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ffd93d] rounded-[50%] rotate-[25deg] blur-[100px] opacity-70"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[700px] h-[700px] bg-[#ff6b6b] rounded-[50%] rotate-[-15deg] blur-[100px] opacity-60"></div>
      <div className="absolute top-[400px] left-[1000px] w-[500px] h-[400px] bg-[#cdb4db] rounded-[60%] rotate-[8deg] opacity-70"></div>

      {/* Paint-stroke accents */}
      <div className="absolute top-16 left-32 w-[420px] h-[80px] bg-[#f15bb5] rounded-[40px] rotate-[-10deg] opacity-80 blur-[2px]"></div>
      <div className="absolute bottom-20 right-24 w-[460px] h-[90px] bg-[#fee440] rounded-[40px] rotate-[12deg] opacity-80 blur-[2px]"></div>
      <div className="absolute top-[300px] right-[400px] w-[300px] h-[60px] bg-[#00bbf9] rounded-[40px] rotate-[18deg] opacity-70 blur-[2px]"></div>

      {/* Main content area - like a playful speech bubble */}
      <div className="relative z-10 max-w-5xl bg-white rounded-[80px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-20 text-center">
        <h2 className="text-[6rem] font-['Fredoka_One'] text-[#ff4d6d] drop-shadow-[4px_4px_0_#ffd6a5] mb-10 leading-tight">
          {title || "KIDS PRESENTATION"}
        </h2>
        <p className="text-[3.5rem] font-['Poppins'] text-[#3a1c71] leading-snug max-w-4xl mx-auto">
          {content ||
            "Bright, colorful, and playful — perfect for introducing fun ideas with energy and creativity!"}
        </p>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[120px] right-[200px] w-12 h-12 bg-[#ff9f1c] rounded-full opacity-80"></div>
      <div className="absolute bottom-[200px] left-[300px] w-10 h-10 bg-[#a0e7e5] rounded-full opacity-80"></div>
      <div className="absolute bottom-[100px] right-[500px] w-8 h-8 bg-[#cdb4db] rounded-full opacity-80"></div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#fff8dc] via-[#fff5b7] to-[#ffec85] flex items-center justify-center overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-pink-200 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-200 rounded-full blur-[100px] opacity-50"></div>

      {/* Floating background notes */}
      <div className="absolute top-24 left-32 w-64 h-64 bg-pink-200/70 rotate-[5deg] rounded-md shadow-lg"></div>
      <div className="absolute bottom-24 right-40 w-72 h-72 bg-blue-200/70 -rotate-[4deg] rounded-md shadow-lg"></div>

      {/* Central Sticky Note */}
      <div className="relative z-10 bg-[#fffda0] w-[60%] p-16 text-center shadow-[10px_12px_30px_rgba(0,0,0,0.25)] rounded-sm transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
        {/* Push pin */}
        <Pin className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-red-500 w-10 h-10 drop-shadow-lg" />

        {/* Sticky note curl effect */}
        <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-gradient-to-tr from-transparent to-[#00000020] rounded-tl-full pointer-events-none"></div>

        {/* Title */}
        <h2 className="text-8xl font-patrickHand text-[#ff6b6b] mb-6 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.2)]">
          {title || "My Bright Idea!"}
        </h2>

        {/* Content */}
        <p className="text-[3.5rem] font-patrickHand text-gray-800 leading-relaxed max-w-3xl mx-auto">
          {content || "This looks like a real sticky note pinned on a wall — playful and creative!"}
        </p>
      </div>
    </section>
  );
}

export function ImageSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 via-playful-300 to-playful-400 overflow-hidden flex items-center justify-between px-16">
      {/* Playful floating shapes */}
      <div className="absolute top-12 left-16 w-28 h-28 bg-playful-500 rounded-full opacity-70"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-playful-600 rounded-2xl opacity-70 rotate-12"></div>
      <div className="absolute top-[30%] right-1/4 w-20 h-20 bg-playful-700 rounded-full opacity-60"></div>
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-playful-400 rounded-full opacity-60"></div>
      <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-playful-300 rounded-lg opacity-60"></div>

      {/* Left side: Auto-generated image placeholder for 1st term */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pr-8">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-8 border-white" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-white/80 border-8 border-playful-500 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
            <div className="text-playful-700 text-4xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-playful-600 text-2xl text-center px-4 font-bold">1st Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="relative z-10 w-1/2 text-playful-900 px-8">
        {title && (
          <h2 className="text-6xl font-bold font-sans mb-6 drop-shadow-md bg-white/70 px-6 py-3 rounded-2xl text-center">
            {title}
          </h2>
        )}
        {content && (
          <div className="bg-white/80 rounded-2xl p-6 shadow-xl border-4 border-playful-400">
            <p className="text-4xl font-sans leading-relaxed text-playful-800">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}




/* End Slide */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-playful-400 to-playful-200 flex flex-col items-center justify-center text-playful-900 animate-fade-in overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-20 -top-20 left-20"></div>
      <div className="absolute w-56 h-56 bg-pink-400 rotate-12 opacity-20 bottom-12 right-12"></div>

      <h2 className="text-7xl font-extrabold font-sans mb-6 z-10">Thank You</h2>
      <p className="text-3xl font-sans opacity-90 z-10">🎨✨</p>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlidePrimary({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const PlayfulPrimary = {
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

export default PlayfulPrimary;
