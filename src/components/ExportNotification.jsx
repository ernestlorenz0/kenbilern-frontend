import React from 'react';
import { CheckCircle, XCircle, Download, FileText, FileImage, Presentation } from 'lucide-react';

export default function ExportNotification({ show, onClose, exportType, success, message, downloadUrl, filename }) {
  if (!show) return null;

  const getIcon = () => {
    if (!success) return <XCircle className="w-10 h-10 text-red-500" />;
    
    switch (exportType) {
      case 'PNG':
        return <FileImage className="w-10 h-10 text-[#FFC72C]" />;
      case 'PDF':
        return <FileText className="w-10 h-10 text-[#FFC72C]" />;
      case 'PPTX':
        return <Presentation className="w-10 h-10 text-[#FFC72C]" />;
      default:
        return <CheckCircle className="w-10 h-10 text-[#FFC72C]" />;
    }
  };

  const handleDownload = () => {
    if (downloadUrl && filename) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`bg-white rounded-xl shadow-2xl border-4 p-6 max-w-md min-w-[320px] ${
        success ? 'border-[#FFC72C]' : 'border-red-500'
      }`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-bold text-xl mb-2 ${
              success ? 'text-[#003D7A]' : 'text-red-800'
            }`}>
              {success ? `${exportType} Export Complete!` : 'Export Failed'}
            </h3>
            
            <p className="text-gray-700 text-sm mb-4 font-medium">
              {message}
            </p>

            {success && downloadUrl && (
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-[#003D7A] hover:bg-[#002855] text-white px-5 py-2.5 rounded-lg font-bold transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  Download {exportType}
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-[#003D7A] hover:text-[#002855] font-bold transition-colors text-sm border-2 border-[#003D7A] hover:border-[#002855] rounded-lg"
                >
                  Close
                </button>
              </div>
            )}

            {!success && (
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Close
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 text-[#003D7A] hover:text-[#002855] transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* STI Yellow Accent Bar */}
        {success && (
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFC72C] via-[#FFD700] to-[#FFC72C] rounded-b-xl"></div>
        )}
      </div>
    </div>
  );
}
