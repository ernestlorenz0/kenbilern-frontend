import React from 'react';

export default function HelpPage() {
  const helpSteps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Upload PDF Files",
      description: "Upload one or more PDF files using the drag-and-drop upload box. Maximum file size is 5MB per file. The system will automatically extract text and structure from your documents."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "AI-Powered Content Generation",
      description: "Let our AI analyze your content and generate images to enhance your presentation. You can also provide custom prompts for specific image generation needs."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Table of Contents",
      description: "Our improved TOC system automatically generates a structured table of contents from your document."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Interactive Elements",
      description: "Add predefined images. You can position, resize, and rotate these elements freely for a customized look."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Presentation Mode",
      description: "Use presentation mode to preview your slides in full screen. The mode includes navigation control like timer. Press F11 for fullscreen or Esc to exit."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Export & Share",
      description: "Export your presentation in multiple formats including PDF, PNG, or PPTX. Share directly from the platform or download for offline use. All exports are saved to your history for easy access."
    }
  ];

  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "We support PDF files for upload. Export options include PDF, PNG, and PPTX formats. The system automatically extracts text and structure from your documents."
    },
    {
      question: "How do I customize the Table of Contents?",
      answer: "The TOC is automatically generated from your document's headings."
    },
    {
      question: "Can I add interactive elements to my slides?",
      answer: "Yes! You can add draggable images, text boxes, and shapes. These elements can be freely positioned, resized, and rotated on your slides."
    },
    {
      question: "How do I use presentation mode?",
      answer: "Click the 'Present' button in the top-right corner or press Ctrl+Shift+P. Use arrow keys to navigate, Esc to exit, and F11 for fullscreen mode."
    },
    {
      question: "Is there a limit to the number of slides I can have?",
      answer: "You can create presentations with up to 100 slides. For best performance, we recommend keeping presentations under 50 slides."
    },
    {
      question: "How do I share my presentation with others?",
      answer: "You can export your presentation in various formats or generate a shareable link. For collaborative editing, use the 'Share' button to invite team members."
    },
    {
      question: "Can I use my own templates?",
      answer: "Currently, you can choose from our collection of professional templates. We're working on custom template support in a future update!"
    }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* STI Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#003D7A' }}>How to Use KENBILEARN</h2>
        <p style={{ color: '#2C2C2C' }}>Follow these simple steps to create amazing presentations</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8">
          
          {/* STI Steps Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#003D7A' }}>
              <svg className="w-5 h-5" fill="none" stroke="#FFC72C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Getting Started
            </h3>
            
            <div className="space-y-4">
              {helpSteps.map((step, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                  <div className="relative p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#003D7A' }}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div style={{ color: '#FFC72C' }}>
                            {step.icon}
                          </div>
                          <h4 className="font-semibold" style={{ color: '#003D7A' }}>{step.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STI FAQ Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#003D7A' }}>
              <svg className="w-5 h-5" fill="none" stroke="#FFC72C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                  <div className="relative p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E5E5E5' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#003D7A' }}>{faq.question}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
