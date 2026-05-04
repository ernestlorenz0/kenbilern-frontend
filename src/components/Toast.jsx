import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Notification Component
 * Usage: <Toast message="Success!" type="success" duration={3000} onClose={() => {}} />
 */
export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      // STI palette: White background, Yellow accent, Blue text
      bg: 'bg-white',
      border: 'border-[#FFC72C]',
      text: 'text-[#003D7A]',
      icon: <CheckCircle className="w-6 h-6" style={{ color: '#FFC72C' }} />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <XCircle className="w-6 h-6 text-red-500" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: <Info className="w-6 h-6 text-blue-500" />,
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border-l-4 ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
      }`}
      style={{ minWidth: '320px', maxWidth: '500px' }}
    >
      {/* Icon */}
      <div className="flex-shrink-0">{currentStyle.icon}</div>

      {/* Message */}
      <div className="flex-1 text-base font-medium">{message}</div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
        aria-label="Close notification"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
