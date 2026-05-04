import React from "react";
import libraryImg from "../imgs/library.jpg";
import books from "../imgs/books.jpg";
import PaperPng from "../pngs/paper.png";
import STILogo1 from "../STI LOGOS/STI LOGO1.png";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-white">
      <img
        src={STILogo1}
        alt="STI LOGO1"
        className="absolute top-8 right-8 w-40 h-auto pointer-events-none select-none"
      />
      <div className="flex w-[80%] h-[80%] items-center justify-between">
        <div className="relative w-[42%] h-[70%] rounded-3xl overflow-hidden shadow-xl">
          <img
            src={libraryImg}
            alt="library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
        </div>

        <div className="w-[50%] flex flex-col justify-center pl-12">
          <h1 className="font-lato font-bold text-7xl text-black mb-4 leading-tight">
            {title}
          </h1>
          <p className="font-lato font-light text-2xl text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}


/* Table of Contents Slide – Academic Minimal */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  // Render a section with its subsections
  const renderSection = (section, index, isSubsection = false) => {
    const hasSubsections = section.subsections && section.subsections.length > 0;
    
    return (
      <div key={index} className={`w-full ${isSubsection ? 'pl-12 mt-2' : ''}`}>
        <div className="flex items-center gap-4 text-gray-800 hover:text-blue-600 transition-colors duration-300 group">
          {!isSubsection && (
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 text-white text-xl font-bold flex-shrink-0 border-2 border-blue-200 group-hover:border-blue-300 transition-all duration-300 shadow-md">
              {index + 1}
            </div>
          )}
          <div className="flex-1 flex justify-between items-center">
            <span className={`${isSubsection ? 'text-3xl' : 'text-4xl font-bold'} text-left leading-tight group-hover:translate-x-2 transition-transform duration-300`}>
              {section.title}
            </span>
            {section.page !== undefined && (
              <span className="text-2xl text-gray-500 font-medium ml-4">
                {section.page}
              </span>
            )}
          </div>
        </div>
        
        {/* Render subsections if they exist */}
        {hasSubsections && (
          <div className="mt-2 space-y-2">
            {section.subsections.map((subsection, subIndex) => (
              renderSection(subsection, subIndex, true)
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Split sections into two columns
  const splitIndex = Math.ceil(sections.length / 2);
  const leftSections = sections.slice(0, splitIndex);
  const rightSections = sections.slice(splitIndex);

  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex flex-col items-center justify-center overflow-hidden p-16">
      {/* Subtle border */}
      <div className="absolute inset-12 border border-gray-300 rounded-lg"></div>
      
      {/* Title */}
      <h2 className="text-5xl font-serif font-bold text-gray-800 mb-16 tracking-wide">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-6 z-10 w-full max-w-7xl h-[70%] overflow-y-auto px-12">
        {/* Left Column */}
        <div className="space-y-6">
          {leftSections.map((section, index) => (
            <div key={`left-${index}`} className="bg-white/80 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              {renderSection(section, index)}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightSections.map((section, index) => (
            <div key={`right-${index}`} className="bg-white/80 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              {renderSection(section, index + splitIndex)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideAcademic({ title = "Table of Contents", items = [], sections }) {
  // If sections are provided directly, use them, otherwise convert items to sections
  const tocData = sections ? 
    { title, sections } : 
    { 
      title, 
      sections: items.map((item, index) => ({
        title: item,
        page: index + 3, // Default page numbers starting from 3 (after title and TOC)
        subsections: []
      })) 
    };
  return <TOCSlide tocData={tocData} />;
}


export function ImageSlide({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex items-center justify-between p-24">
      {/* Left side: Auto-generated image placeholder for 1st term */}
      <div className="w-1/2 h-full flex items-center justify-center pr-12">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain border-4 border-gray-300 shadow-xl" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-gray-100 border-4 border-gray-400 flex flex-col items-center justify-center shadow-lg">
            <div className="text-gray-600 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-gray-500 text-xl text-center px-4 font-medium">1st Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="w-1/2 pl-12">
        {title && (
          <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">
            {title}
          </h2>
        )}
        {content && (
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
            <p className="font-lato text-4xl leading-relaxed text-gray-800">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
    </section>
  );
}

export function ContentSlideText({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
    </section>
  );
}


export function MainSlide({ title, content, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex p-16 gap-12">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center max-w-[60%]">
        <h2 className="font-merriweather font-bold text-7xl mt-[-300px] text-black leading-snug">
          {title}
        </h2>
        <p className="font-lato font-light text-5xl leading-relaxed text-black break-words">
          {content}
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <img src={PaperPng} alt="paper" />
      </div>
    </section>
  );
}


export function MainSlide1({ title, content, imageUrl, autoGeneratedImage }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex p-24 gap-12">
      {/* Left side: Auto-generated image placeholder for 2nd term */}
      <div className="w-1/2 flex items-center justify-center">
        {autoGeneratedImage ? (
          <img 
            src={autoGeneratedImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain border-4 border-gray-300 shadow-xl" 
          />
        ) : (
          <div className="w-4/5 h-4/5 bg-gray-100 border-4 border-gray-400 flex flex-col items-center justify-center shadow-lg">
            <div className="text-gray-600 text-3xl font-bold mb-4">🎨 Auto Image Placeholder</div>
            <span className="text-gray-500 text-xl text-center px-4 font-medium">2nd Term: {title}</span>
          </div>
        )}
      </div>
      
      {/* Right side: Term and definition */}
      <div className="w-1/2 flex flex-col">
        <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
        {content && (
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
            <p className="font-lato font-light text-[2.9rem] leading-relaxed text-black">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, title2, content2 }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#ffffff] to-[#f5f5f5] font-serif">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:22px_22px]"></div>

      {/* Decorative geometric shapes */}
      <div className="absolute top-[-80px] left-[-100px] w-[500px] h-[200px] bg-[#e5e7eb] rotate-[-10deg] opacity-70"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[550px] h-[220px] bg-[#d1d5db] rotate-[12deg] opacity-70"></div>

      {/* Top Half: First Term */}
      <div className="absolute top-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white border-2 border-gray-300 shadow-lg p-8 h-full flex flex-col justify-center">
          <h2 className="text-7xl font-merriweather font-bold text-[#0f172a] mb-4 leading-tight">
            {title || 'Term 1'}
          </h2>
          <div className="w-40 h-[3px] bg-[#111827] mb-4"></div>
          <p className="text-[2.7rem] font-lato text-[#374151] leading-relaxed">
            {content || 'Definition for term 1'}
          </p>
        </div>
      </div>

      {/* Bottom Half: Second Term */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[420px] px-20 z-10">
        <div className="bg-white border-2 border-gray-300 shadow-lg p-8 h-full flex flex-col justify-center">
          <h2 className="text-7xl font-merriweather font-bold text-[#0f172a] mb-4 leading-tight">
            {title2 || 'Term 2'}
          </h2>
          <div className="w-40 h-[3px] bg-[#111827] mb-4"></div>
          <p className="text-[2.7rem] font-lato text-[#374151] leading-relaxed">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>
    </section>
  );
}



export function EndSlide({ message = "Thank You!", subtitle }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center text-center">
      <h1 className="font-merriweather font-bold text-8xl text-black mb-6 text-black">
        {message}
      </h1>

      {subtitle && (
        <p className="font-lato font-light text-2xl text-gray-600 text-black">
          {subtitle}
        </p>
      )}
    </section>
  );
}

export function MainSlide4({ title, content, title2, content2 }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex items-center justify-center p-24">
      {/* Two-column layout with divider */}
      <div className="flex flex-1 items-center justify-center gap-16 h-full">
        {/* Left block: First Term */}
        <div className="flex-1 h-[80%] flex flex-col justify-center pr-8 border-2 border-gray-300 shadow-lg p-8">
          <h2 className="font-merriweather font-bold text-6xl mb-4 text-black">
            {title || 'Term 1'}
          </h2>
          <div className="w-32 h-[3px] bg-gray-800 mb-4"></div>
          <p className="font-lato font-light text-[2.7rem] leading-relaxed text-gray-800">
            {content || 'Definition for term 1'}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="h-[500px] w-[5px] bg-gray-300 rounded"></div>
        </div>

        {/* Right block: Second Term */}
        <div className="flex-1 h-[80%] flex flex-col justify-center pl-8 border-2 border-gray-300 shadow-lg p-8">
          <h2 className="font-merriweather font-bold text-6xl mb-4 text-black">
            {title2 || 'Term 2'}
          </h2>
          <div className="w-32 h-[3px] bg-gray-800 mb-4"></div>
          <p className="font-lato font-light text-[2.7rem] leading-relaxed text-gray-800">
            {content2 || 'Definition for term 2'}
          </p>
        </div>
      </div>
    </section>
  );
}

// 3. ContentSlideWideCenterText
// Wide centered block with optional background accent
export function MainSlide6({ title, content, image }) {
  return (
    <section className="w-[1920px] h-[1080px] flex bg-white font-serif overflow-hidden">
      {/* Left image section */}
      <div className="w-1/4 h-full relative bg-gray-200 flex items-center justify-center">
        {/* Gray overlay for style */}
        <div className="absolute inset-0 bg-gray-300/40"></div>
        <img
            src={books}
            alt="Slide Visual"
            className="w-full h-full object-cover mix-blend-multiply"
          />                        
      </div>

      {/* Right content section */}
      <div className="w-3/4 h-full flex flex-col justify-center px-32 relative bg-gradient-to-b from-white to-gray-50">
        {/* Subtle gray line accents */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gray-300"></div>
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gray-300"></div>

        <div className="max-w-[80%]">
          <h2 className="text-7xl font-merriweather font-bold text-black mb-8 leading-tight">
            {title}
          </h2>
          <p className="text-5xl font-lato font-light text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}



const AcademicMinimal = { TitleSlide, 
                          TOCSlide, 
                          ContentSlide, 
                          ImageSlide, 
                          ContentSlideText, 
                          MainSlide, MainSlide1, MainSlide2, MainSlide4, MainSlide6,
                          EndSlide };
export default AcademicMinimal;
