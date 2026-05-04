import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { X, Play, Pause, SkipBack, SkipForward, Settings, Maximize } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function SwiperSlideshow({ 
  slides, 
  selectedTemplate, 
  Theme, 
  onClose, 
  open 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const swiperRef = useRef(null);

  // Responsive breakpoints configuration
  const breakpoints = {
    // When window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // When window width is >= 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          swiperRef.current?.slidePrev();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (e.key === ' ') toggleAutoplay();
          else swiperRef.current?.slideNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'f':
        case 'F11':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleAutoplayDelayChange = (newDelay) => {
    setAutoplayDelay(newDelay);
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.params.autoplay.delay = newDelay;
      if (isPlaying) {
        swiperRef.current.autoplay.start();
      }
    }
  };

  // Helper function to render draggable elements with responsive sizing
  const renderDraggableElements = (elements, baseZIndex = 10) => {
    return elements.map((el, idx) => {
      // Calculate responsive sizes based on viewport width
      const viewportWidth = window.innerWidth;
      const scaleFactor = Math.min(1, viewportWidth / 1024); // Base width 1024px
      
      const style = {
        position: 'absolute',
        left: el.x !== undefined ? `calc(${el.x}px * ${scaleFactor})` : '0',
        top: el.y !== undefined ? `calc(${el.y}px * ${scaleFactor})` : '0',
        width: el.w ? `calc(${el.w}px * ${scaleFactor})` : 'auto',
        height: el.h ? `calc(${el.h}px * ${scaleFactor})` : 'auto',
        transform: el.rotation ? `rotate(${el.rotation}deg) scale(${scaleFactor})` : `scale(${scaleFactor})`,
        transformOrigin: 'top left',
        zIndex: baseZIndex + (el.zIndex || 0),
        objectFit: 'contain',
        pointerEvents: 'none',
        maxWidth: '100%',
        ...(el.style || {})
      };

      // Handle different element types
      switch(el.type) {
        case 'image':
          return (
            <img
              key={`${el.id || idx}-${el.x}-${el.y}`}
              src={el.content}
              alt={`Slide element ${idx + 1}`}
              className="absolute object-contain"
              style={style}
            />
          );
        case 'text':
          return (
            <div
              key={`${el.id || idx}-${el.x}-${el.y}`}
              className="absolute"
              style={{
                ...style,
                color: el.color || 'inherit',
                fontSize: el.fontSize || '16px',
                fontFamily: el.fontFamily || 'inherit',
                fontWeight: el.fontWeight || 'normal',
                textAlign: el.textAlign || 'left',
                lineHeight: el.lineHeight || 'normal',
                padding: '4px 8px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: el.content || '' }}
            />
          );
        default:
          return null;
      }
    });
  };

  // Render themed slide content
  const renderSlideContent = (slide, index) => {
    if (!slide || !Theme) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">No content available</div>
        </div>
      );
    }

    // Extract all components
    const components = slide.components || [];
    const title = components.find(c => c.type === "title")?.content || "";
    const content = components.find(c => c.type === "paragraph")?.content || "";
    const title2 = components.find(c => c.type === "title2")?.content || "";
    const content2 = components.find(c => c.type === "paragraph2")?.content || "";
    const backgroundImage = components.find(c => c.type === "image" && !c.isDraggable);
    const draggableElements = components.filter(c => c.isDraggable);
    const backgroundStyle = {
      ...(backgroundImage?.content ? { 
        backgroundImage: `url(${backgroundImage.content})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {})
    };

    // Title slide
    if (index === 0 && Theme.TitleSlide) {
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.TitleSlide
            title={title}
            subtitle={content}
            imageUrl={backgroundImage?.content}
          />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }

    // Table of Contents slide
    if (components.some(c => c.type === "toc") && Theme.TOCSlide) {
      const tocComponent = components.find(c => c.type === "toc") || {};
      const tocTitle = tocComponent.content || "Table of Contents";
      
      // Get TOC items and convert them to sections format
      const tocSections = components
        .filter(c => c.type === "toc_item" && c.content) // Only include items with content
        .map((item, index) => ({
          id: item.id || `toc-item-${index}`,
          title: item.content,
          page: item.pageNumber || (index + 3), // Default page numbers starting from 3
          subsections: item.subsections || [],
          ...(item.subtitle ? { subtitle: item.subtitle } : {})
        }));

      // Prepare the tocData object in the expected format
      const tocData = {
        title: tocTitle,
        sections: tocSections, // Array of section objects with title and page
        // Include any additional TOC data that might be needed
        ...(tocComponent.data || {})
      };

      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.TOCSlide
            tocData={tocData}
          />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }

    // End slide
    if (components.some(c => c.type === "end") && Theme.EndSlide) {
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.EndSlide
            message={components.find(c => c.type === "end")?.content || "Thank You!"}
            subtitle={content}
          />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }

    // Content slides
    const autoGeneratedImage = components.find(c => c.type === "auto_generated_image")?.content || null;

    // Use assigned layout or fallback
    if (slide.layout && Theme[slide.layout]) {
      const LayoutComp = Theme[slide.layout];
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <LayoutComp 
            title={title} 
            content={content} 
            title2={title2}
            content2={content2}
            imageUrl={backgroundImage?.content} 
            autoGeneratedImage={autoGeneratedImage} 
          />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }

    // Fallback logic with draggable images
    if (backgroundImage && Theme.ImageSlide) {
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.ImageSlide title={title} imageUrl={backgroundImage.content} />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }
    
    if (Theme.MainSlide) {
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.MainSlide title={title} content={content} />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }
    if (Theme.ContentSlide) {
      return (
        <div className="relative w-full h-full" style={backgroundStyle}>
          <Theme.ContentSlide title={title} content={content} />
          {renderDraggableElements(draggableElements, 20)}
        </div>
      );
    }

    // Default fallback with all elements
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8" style={backgroundStyle}>
        {title && (
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center relative z-20">{title}</h1>
        )}
        {content && (
          <p className="text-xl text-gray-600 text-center max-w-4xl leading-relaxed relative z-20">{content}</p>
        )}
        
        {renderDraggableElements(draggableElements, 20)}
      </div>
    );
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isFullscreen ? 'bg-white' : 'bg-black'}`}>
      {/* Header Controls - Hide in fullscreen mode */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-2 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <h2 className="text-white text-sm sm:text-xl font-semibold truncate">
              <span className="hidden sm:inline">Slideshow Preview - {selectedTemplate}</span>
              <span className="sm:hidden">{selectedTemplate}</span>
            </h2>
            <div className="text-white/70 text-xs sm:text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Playback Controls */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Previous slide (←)"
            >
              <SkipBack size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={toggleAutoplay}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
            </button>
            
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Next slide (→)"
            >
              <SkipForward size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Fullscreen - Hide on very small screens */}
            <button
              onClick={toggleFullscreen}
              className="hidden sm:block p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title={isFullscreen ? "Exit Fullscreen (F11)" : "Enter Fullscreen (F11)"}
            >
              <Maximize size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Settings - Hide on very small screens */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="hidden sm:block p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Settings"
            >
              <Settings size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-red-500/50 rounded-lg transition-all ml-1 sm:ml-2"
              title="Close (Esc)"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-2 sm:mt-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <label className="text-white text-xs sm:text-sm">Autoplay Delay:</label>
              <select
                value={autoplayDelay}
                onChange={(e) => handleAutoplayDelayChange(Number(e.target.value))}
                className="bg-white text-black rounded px-2 sm:px-3 py-1 text-xs sm:text-sm"
              >
                <option value={1000}>1 second</option>
                <option value={2000}>2 seconds</option>
                <option value={3000}>3 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
              </select>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Swiper Slideshow */}
      <div className="relative w-full h-full bg-black">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
            disabledClass: 'opacity-30 cursor-default',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet w-2 h-2 sm:w-3 sm:h-3 mx-1 bg-white/50 rounded-full transition-all duration-300 inline-block cursor-pointer',
            bulletActiveClass: '!bg-white !w-4 sm:!w-6',
            renderBullet: (index, className) => {
              return `<span class="${className}" role="button" tabindex="0"></span>`;
            },
          }}
          autoplay={isPlaying ? {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          } : false}
          effect="slide"
          speed={600}
          loop={slides.length > 1}
          breakpoints={{
            320: {
              spaceBetween: 10,
            },
            640: {
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 30,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Add touch event listeners for better mobile experience
            if (swiper.el) {
              swiper.el.style.touchAction = 'pan-y';
              swiper.el.style.cursor = 'grab';
              swiper.el.addEventListener('mousedown', () => {
                swiper.el.style.cursor = 'grabbing';
              });
              swiper.el.addEventListener('mouseup', () => {
                swiper.el.style.cursor = 'grab';
              });
            }
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex);
            // Auto-hide controls after slide change on mobile
            if (window.innerWidth < 640) {
              setShowSettings(false);
            }
          }}
          className="w-full h-full select-none"
          touchRatio={1.5}
          resistance={true}
          resistanceRatio={0.7}
          watchOverflow={true}
          updateOnWindowResize={true}
          resizeObserver={true}
          observeParents={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={slide.id || index} 
              className="flex items-center justify-center bg-black"
              style={{
                padding: isFullscreen ? '0' : '1rem',
                boxSizing: 'border-box',
                height: '100%',
              }}
            >
              <div 
                className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
                  isFullscreen ? 'max-w-full' : 'max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw] 2xl:max-w-[70vw] mx-auto'
                }`}
                style={{
                  aspectRatio: '16/9',
                  maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 120px)',
                }}
              >
                <div 
                  className={`relative w-full h-full bg-white overflow-hidden ${
                    isFullscreen ? 'rounded-none' : 'rounded-xl sm:rounded-2xl shadow-xl'
                  }`}
                  style={{
                    boxShadow: isFullscreen ? 'none' : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  {renderSlideContent(slide, index)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination - Bottom Center */}
        <div className="swiper-pagination-custom absolute bottom-4 left-0 right-0 flex justify-center items-center z-10" />

        {/* Navigation Arrows - Only show on larger screens */}
        <div className="hidden sm:block">
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 cursor-pointer">
            <SkipBack size={20} className="w-5 h-5" />
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 cursor-pointer">
            <SkipForward size={20} className="w-5 h-5" />
          </div>
        </div>

        {/* Mobile Navigation Hint */}
        <div className="sm:hidden absolute bottom-2 left-0 right-0 text-center">
          <p className="text-white/60 text-xs animate-pulse">Swipe to navigate</p>
        </div>
      </div>

      {/* Custom Navigation Buttons - Hide in fullscreen */}
      {!isFullscreen && (
        <>
          <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm">
            <SkipBack size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm">
            <SkipForward size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Custom Pagination */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`swiper-pagination-bullet-custom w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'swiper-pagination-bullet-active-custom bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Instructions - Hide in fullscreen and on mobile */}
      {!isFullscreen && (
        <div className="hidden sm:block absolute bottom-4 right-4 text-white/60 text-xs">
          Use ← → keys to navigate • Space to play/pause • Esc to close
        </div>
      )}
    </div>
  );
}
