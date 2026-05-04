import React, { useState } from 'react';

export default function AIImageGenerator({ open, onClose }) {
  const [prompt, setPrompt] = useState('');

  const handleClose = () => {
    onClose();
    setPrompt('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-[600px] max-h-[80vh] flex flex-col border-4 border-[#FFC72C]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#FFC72C]">
          <h2 className="text-2xl font-bold text-[#003D7A]">AI Image Generator</h2>
          <button
            className="text-[#003D7A] hover:text-[#002855] text-2xl font-bold transition-colors"
            onClick={handleClose}
          >
            x
          </button>
        </div>

        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Upgrade to Pro to unlock AI image generation.
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-[#003D7A] mb-2">
            Describe the image you want to generate:
          </label>
          <textarea
            className="w-full border-2 border-[#003D7A] rounded-lg px-4 py-3 resize-none text-gray-900 placeholder-gray-500 focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/30 font-medium"
            rows="3"
            placeholder="e.g., A futuristic classroom with holographic displays and students using VR headsets"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="w-full py-3 px-4 rounded-lg font-bold text-base transition-all duration-300 bg-gray-300 text-gray-500 cursor-not-allowed"
            disabled
          >
            Generate Image
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFC72C] via-[#FFD700] to-[#FFC72C] rounded-b-xl"></div>
      </div>
    </div>
  );
}
