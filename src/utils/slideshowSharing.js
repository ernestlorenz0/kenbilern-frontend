// Utility functions for slideshow sharing

/**
 * Generate a unique ID for a slideshow
 * @returns {string} Unique slideshow ID
 */
export function generateSlideshowId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Save a slideshow for sharing
 * @param {Object} slideshowData - The slideshow data to save
 * @returns {string} The generated slideshow ID
 */
export async function saveSharedSlideshow(slideshowData) {
  const provisionalId = generateSlideshowId();
  const payload = {
    id: provisionalId,
    title: slideshowData.title || 'Untitled Slideshow',
    slides: slideshowData.slides || [],
    selectedTemplate: slideshowData.selectedTemplate || 'Classic Classroom',
    createdAt: new Date().toISOString(),
    ...slideshowData
  };

  // Try backend first
  if (typeof fetch !== 'undefined') {
    try {
      const res = await fetch(`${API_BASE}/api/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        const id = data.id || payload.id;
        // Cache locally for quicker load
        try { localStorage.setItem(`shared_slideshow_${id}`, JSON.stringify({ ...payload, id })); } catch {}
        try {
          const existingShared = JSON.parse(localStorage.getItem('shared_slideshows') || '[]');
          existingShared.push({ id, title: payload.title, createdAt: payload.createdAt, slideCount: payload.slides.length });
          localStorage.setItem('shared_slideshows', JSON.stringify(existingShared));
        } catch {}
        return id;
      }
    } catch (_) {
      // fall back to local storage
    }
  }

  // Fallback: persist locally only
  localStorage.setItem(`shared_slideshow_${provisionalId}`, JSON.stringify(payload));
  const existingShared = JSON.parse(localStorage.getItem('shared_slideshows') || '[]');
  existingShared.push({ id: provisionalId, title: payload.title, createdAt: payload.createdAt, slideCount: payload.slides.length });
  localStorage.setItem('shared_slideshows', JSON.stringify(existingShared));
  return provisionalId;
}

/**
 * Load a shared slideshow by ID
 * @param {string} id - The slideshow ID
 * @returns {Object|null} The slideshow data or null if not found
 */
export async function loadSharedSlideshow(id) {
  try {
    const data = localStorage.getItem(`shared_slideshow_${id}`);
    if (data) return JSON.parse(data);
  } catch (error) {
    console.error('Error loading shared slideshow (local):', error);
  }
  if (typeof fetch !== 'undefined') {
    try {
      const r = await fetch(`${API_BASE}/api/share/${id}`);
      if (r.ok) {
        const json = await r.json();
        if (json && json.id) {
          try { localStorage.setItem(`shared_slideshow_${json.id}`, JSON.stringify(json)); } catch {}
          return json;
        }
      }
    } catch (e) {
      // ignore and return null
    }
  }
  return null;
}

/**
 * Generate a shareable URL for a slideshow
 * @param {string} id - The slideshow ID
 * @returns {string} The shareable URL
 */
export function generateShareableUrl(id) {
  // Use the actual current origin for functional links
  const baseUrl = window.location.origin;
  return `${baseUrl}/slideshow/${id}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get all shared slideshows for management
 * @returns {Array} List of shared slideshow metadata
 */
export function getSharedSlideshows() {
  try {
    return JSON.parse(localStorage.getItem('shared_slideshows') || '[]');
  } catch (error) {
    console.error('Error loading shared slideshows list:', error);
    return [];
  }
}
