import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import { toPng, toJpeg } from 'html-to-image';

// Export utilities for Konva-based slide export
export class SlideExporter {
  constructor() {
    this.exportProgress = 0;
    this.onProgressUpdate = null;
  }

  setProgressCallback(callback) {
    this.onProgressUpdate = callback;
  }

  updateProgress(progress) {
    this.exportProgress = progress;
    if (this.onProgressUpdate) {
      this.onProgressUpdate(progress);
    }
  }

  // Helper: Wait for all images in element to load
  async waitForImagesToLoad(element) {
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      // Prefer decode() to ensure pixel data is ready
      if (typeof img.decode === 'function') {
        return img.decode().catch(() => undefined);
      }
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        const done = () => resolve();
        img.onload = done;
        img.onerror = done; // Resolve even on error to not block
        // Timeout after 5 seconds if image doesn't load
        setTimeout(done, 5000);
      });
    });
    await Promise.all(imagePromises);
  }

  // Helper: Move element to viewport for capture
  async moveElementToViewport(element) {
    const originalStyles = {
      position: element.style.position,
      top: element.style.top,
      left: element.style.left,
      zIndex: element.style.zIndex,
      visibility: element.style.visibility,
      opacity: element.style.opacity
    };

    // Move to viewport and make visible
    element.style.position = 'fixed';
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.zIndex = '9999';
    element.style.visibility = 'visible';
    element.style.opacity = '1';

    // Wait for images to load
    await this.waitForImagesToLoad(element);

    // Wait for browser to render and animations to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    return originalStyles;
  }

  // Helper: Restore element to original position
  restoreElementPosition(element, originalStyles) {
    element.style.position = originalStyles.position || 'fixed';
    element.style.top = originalStyles.top || '0px';
    element.style.left = originalStyles.left || '0px';
    element.style.zIndex = originalStyles.zIndex || '-1000';
    element.style.visibility = originalStyles.visibility || 'hidden';
    element.style.opacity = originalStyles.opacity || '0';
  }

  // Export current slide as PNG
  async exportCurrentSlidePNG(slideContainerRef, filename = 'slide.png') {
    let originalStyles = null;
    try {
      this.updateProgress(10);
      
      if (!slideContainerRef.current) {
        throw new Error('Slide container reference not available');
      }

      this.updateProgress(20);

      // STEP 1: Move element to viewport
      originalStyles = await this.moveElementToViewport(slideContainerRef.current);

      this.updateProgress(40);

      // STEP 2: Capture using html-to-image
      const dataURL = await toPng(slideContainerRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Higher scale for better quality (retina)
        width: 1920,
        height: 1080,
        backgroundColor: '#ffffff',
        cacheBust: true
      });

      this.updateProgress(80);

      // STEP 3: Restore element to hidden position
      this.restoreElementPosition(slideContainerRef.current, originalStyles);

      this.updateProgress(100);
      return { 
        success: true, 
        message: 'PNG exported successfully!', 
        downloadUrl: dataURL,
        filename: filename,
        exportType: 'PNG'
      };
    } catch (error) {
      console.error('PNG export error:', error);
      // Restore element even if error occurs
      if (originalStyles && slideContainerRef.current) {
        this.restoreElementPosition(slideContainerRef.current, originalStyles);
      }
      return { success: false, message: `PNG export failed: ${error.message}` };
    }
  }

  // Export all slides as PDF
  async exportAllSlidesPDF(slides, getSlideContainerForSlide, filename = 'presentation.pdf') {
    try {
      this.updateProgress(5);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080]
      });

      const totalSlides = slides.length;
      let processedSlides = 0;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        let originalStyles = null;
        let slideContainerRef = null; // Declare outside try block for catch block access
        
        try {
          // Get the slide container for this specific slide
          slideContainerRef = await getSlideContainerForSlide(i);
          
          if (slideContainerRef && slideContainerRef.current) {
            // STEP 1: Move element to viewport
            originalStyles = await this.moveElementToViewport(slideContainerRef.current);

            // STEP 2: Capture slide as image using html-to-image
            const dataURL = await toJpeg(slideContainerRef.current, {
              quality: 0.95,
              pixelRatio: 2, // Higher scale for better quality (retina)
              width: 1920,
              height: 1080,
              backgroundColor: '#ffffff',
              cacheBust: true
            });

            // STEP 3: Restore element to hidden position
            this.restoreElementPosition(slideContainerRef.current, originalStyles);

            // Add new page for slides after the first
            if (i > 0) {
              pdf.addPage();
            }

            // Add image to PDF (fit to page)
            pdf.addImage(dataURL, 'JPEG', 0, 0, 1920, 1080);
          }
        } catch (slideError) {
          console.error(`Error exporting slide ${i}:`, slideError);
          // Restore element even if error occurs
          if (originalStyles && slideContainerRef && slideContainerRef.current) {
            this.restoreElementPosition(slideContainerRef.current, originalStyles);
          }
        }

        processedSlides++;
        this.updateProgress(10 + (processedSlides / totalSlides) * 80);
      }

      this.updateProgress(95);

      // Generate PDF blob instead of auto-downloading
      const pdfBlob = pdf.output('blob');
      const downloadUrl = URL.createObjectURL(pdfBlob);

      this.updateProgress(100);
      return { 
        success: true, 
        message: `PDF with ${totalSlides} slides exported successfully!`,
        downloadUrl: downloadUrl,
        filename: filename,
        exportType: 'PDF'
      };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, message: `PDF export failed: ${error.message}` };
    }
  }

  // Export all slides as PPTX
  async exportAllSlidesPPTX(slides, getSlideContainerForSlide, filename = 'presentation.pptx') {
    try {
      this.updateProgress(5);

      const pptx = new pptxgen();
      
      // Set presentation properties
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = 'Slide Editor';
      pptx.company = 'KENBILERN';
      pptx.title = 'Exported Presentation';

      const totalSlides = slides.length;
      let processedSlides = 0;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        let originalStyles = null;
        let slideContainerRef = null; // Declare outside try block for catch block access
        
        try {
          // Get the slide container for this specific slide
          slideContainerRef = await getSlideContainerForSlide(i);
          
          if (slideContainerRef && slideContainerRef.current) {
            // Create new slide
            const pptxSlide = pptx.addSlide();

            // STEP 1: Move element to viewport
            originalStyles = await this.moveElementToViewport(slideContainerRef.current);

            // STEP 2: Capture slide as JPEG with optimized quality for smaller file size
            const dataURL = await toJpeg(slideContainerRef.current, {
              quality: 0.90, // Optimized balance: 70-80% smaller file, same visual quality
              pixelRatio: 2, // Keep 2x for retina sharpness
              width: 1920,
              height: 1080,
              backgroundColor: '#ffffff',
              cacheBust: true
            });

            // STEP 3: Restore element to hidden position
            this.restoreElementPosition(slideContainerRef.current, originalStyles);

            // Add image to slide (full slide dimensions)
            pptxSlide.addImage({
              data: dataURL,
              x: 0,
              y: 0,
              w: '100%',
              h: '100%'
            });
          }
        } catch (slideError) {
          console.error(`Error exporting slide ${i}:`, slideError);
          // Restore element even if error occurs
          if (originalStyles && slideContainerRef && slideContainerRef.current) {
            this.restoreElementPosition(slideContainerRef.current, originalStyles);
          }
        }

        processedSlides++;
        this.updateProgress(10 + (processedSlides / totalSlides) * 80);
      }

      this.updateProgress(95);

      // Generate PPTX blob instead of auto-downloading
      const pptxBlob = await pptx.write({ outputType: 'blob' });
      const downloadUrl = URL.createObjectURL(pptxBlob);

      this.updateProgress(100);
      return { 
        success: true, 
        message: `PPTX with ${totalSlides} slides exported successfully!`,
        downloadUrl: downloadUrl,
        filename: filename,
        exportType: 'PPTX'
      };
    } catch (error) {
      console.error('PPTX export error:', error);
      return { success: false, message: `PPTX export failed: ${error.message}` };
    }
  }

  // Helper method to create a temporary stage for a specific slide
  async createTemporaryStage(slide, themeComponent, stageWidth = 1280, stageHeight = 720) {
    return new Promise((resolve) => {
      // This would need to be implemented to create a temporary Konva stage
      // for slides that aren't currently visible
      // For now, we'll return null and handle in the calling code
      resolve(null);
    });
  }
}

// Utility function to download file from data URL
export function downloadFile(dataURL, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utility function to get current timestamp for filenames
export function getTimestampedFilename(baseName, extension) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${baseName}_${timestamp}.${extension}`;
}
