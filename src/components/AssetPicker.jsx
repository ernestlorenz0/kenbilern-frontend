import React, { useEffect, useState } from 'react';
import AIImageGenerator from './AIImageGenerator';

export default function AssetPicker({ open, onClose, onSelect, onAIImageGenerated }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const [generatedImages, setGeneratedImages] = useState([]);
  const [pdfImages, setPdfImages] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('assets');
  const [contentLoading, setContentLoading] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  useEffect(() => {
    if (open) {
      loadGeneratedImages();
      loadPdfImages();
    }
  }, [open]);

  const loadGeneratedImages = () => {
    try {
      const saved = localStorage.getItem('kenbilearn_generated_images');
      if (saved) {
        setGeneratedImages(JSON.parse(saved));
      } else {
        setGeneratedImages([]);
      }
    } catch (error) {
      console.error('AssetPicker: failed to load generated images:', error);
      setGeneratedImages([]);
    }
  };

  const loadPdfImages = async () => {
    setContentLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/extracted-images`);
      if (response.ok) {
        const data = await response.json();
        setPdfImages(data.images || []);
      } else {
        setPdfImages([]);
      }
    } catch (error) {
      console.error('AssetPicker: failed to load PDF images:', error);
      setPdfImages([]);
    } finally {
      setContentLoading(false);
    }
  };

  const getFilteredAssets = () => {
    const query = search.toLowerCase();
    if (activeTab === 'generated') {
      return generatedImages.filter((img) => img.name.toLowerCase().includes(query));
    }
    if (activeTab === 'pdf') {
      return pdfImages.filter((img) => img.name.toLowerCase().includes(query));
    }
    return [];
  };

  const filteredAssets = getFilteredAssets();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur-lg transition-all duration-300" />
          <div className="relative bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl p-4 w-[520px] max-h-[70vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Assets</h2>
              <button
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                onClick={onClose}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
              <button
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md font-semibold transition-all duration-200 text-xs ${
                  activeTab === 'assets' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('assets')}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Assets
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md font-semibold transition-all duration-200 text-xs ${
                  activeTab === 'generated' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('generated')}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Generated
                {generatedImages.length > 0 && (
                  <span className="bg-indigo-500 text-white text-xs px-1 py-0.5 rounded-full">
                    {generatedImages.length}
                  </span>
                )}
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md font-semibold transition-all duration-200 text-xs ${
                  activeTab === 'pdf' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('pdf')}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF Images
                {pdfImages.length > 0 && (
                  <span className="bg-indigo-500 text-white text-xs px-1 py-0.5 rounded-full">
                    {pdfImages.length}
                  </span>
                )}
              </button>
            </div>

            {activeTab !== 'assets' && (
              <div className="relative mb-4">
                <input
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 text-sm"
                  placeholder={activeTab === 'generated' ? 'Search generated images...' : 'Search PDF images...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'assets' ? (
                <div className="space-y-4 py-2">
                  <div className="w-full rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-.586-1.414l-4-4A2 2 0 0014 3H6a2 2 0 00-2 2v14a2 2 0 002 2zm5-10a1 1 0 112 0 1 1 0 01-2 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">Premium Library Locked</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Upgrade to Pro to unlock premium icons.
                    </p>
                  </div>

                  <button
                    className="w-full rounded-xl bg-[#003D7A] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#002855] focus:outline-none focus:ring-2 focus:ring-[#003D7A]/30"
                    onClick={() => setShowAIGenerator(true)}
                  >
                    Generate AI Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-6 gap-2">
                  {contentLoading && (
                    <div className="col-span-6 flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-3"></div>
                      <p className="text-gray-600 text-sm">Loading assets...</p>
                    </div>
                  )}
                  {!contentLoading && filteredAssets.length === 0 && (
                    <div className="col-span-6 text-gray-500 text-center py-6">
                      {activeTab === 'pdf' ? (
                        <>
                          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-sm">
                            {pdfImages.length === 0
                              ? 'No PDF images extracted yet. Upload a PDF with images to see them here!'
                              : 'No PDF images match your search.'}
                          </p>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">
                            {generatedImages.length === 0
                              ? 'No generated images yet.'
                              : 'No generated images match your search.'}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  {!contentLoading && filteredAssets.map((asset, index) => (
                    <button
                      key={asset.url || `${asset.name}-${index}`}
                      className="group relative border border-gray-200 rounded-lg p-2 hover:border-indigo-400 hover:shadow-md flex flex-col items-center justify-center h-20 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      onClick={() => onSelect(asset)}
                      title={asset.name}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                      />
                      {activeTab === 'generated' && asset.generatedAt && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" title="AI Generated" />
                      )}
                      <div className="absolute inset-0 bg-indigo-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AIImageGenerator
        open={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        onImageGenerated={onAIImageGenerated}
      />
    </>
  );
}
