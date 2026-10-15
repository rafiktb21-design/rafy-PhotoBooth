// MOLYZ BOOTH - Photo Compositor
import type { Frame, Photo } from '../types';

export const composePhotoStrip = async (
  frame: Frame,
  photos: Photo[]
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    
    // Set canvas size based on frame
    canvas.width = frame.width;
    canvas.height = frame.height;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, frame.height);
    
    // Parse frame background and create gradient
    const bgColors = parseBackgroundColors(frame.background);
    bgColors.forEach((color, index) => {
      gradient.addColorStop(index / (bgColors.length - 1), color);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add decorative elements
    addDecorativeElements(ctx, canvas.width, canvas.height, frame.category);
    
    // Load and draw each photo into its slot
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    
    // Draw photos into slots
    Promise.all(
      photos.map((photo, index) => {
        if (index >= frame.slots.length) return Promise.resolve();
        
        const slot = frame.slots[index];
        
        return loadImage(photo.dataUrl).then((img) => {
          // Apply filter if needed
          const filter = getFilterForPhoto(photo.filter);
          
          // Save context state
          ctx.save();
          
          // Apply filter
          if (filter !== 'none') {
            ctx.filter = filter;
          }
          
          // Draw photo into slot
          // Calculate aspect ratio fit
          const slotAspect = slot.width / slot.height;
          const imgAspect = img.width / img.height;
          
          let drawWidth = slot.width;
          let drawHeight = slot.height;
          let drawX = slot.x;
          let drawY = slot.y;
          
          if (imgAspect > slotAspect) {
            // Image is wider than slot
            drawHeight = slot.width / imgAspect;
            drawY = slot.y + (slot.height - drawHeight) / 2;
          } else {
            // Image is taller than slot
            drawWidth = slot.height * imgAspect;
            drawX = slot.x + (slot.width - drawWidth) / 2;
          }
          
          // Draw white border/background for photo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(slot.x - 4, slot.y - 4, slot.width + 8, slot.height + 8);
          
          // Draw photo
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          
          // Restore context state
          ctx.restore();
        });
      })
    ).then(() => {
      // Add frame border/overlay
      addFrameOverlay(ctx, canvas.width, canvas.height, frame);
      
      // Add logo/branding
      addLogo(ctx, canvas.width, canvas.height);
      
      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    }).catch(reject);
  });
};

const parseBackgroundColors = (background: string): string[] => {
  // Extract colors from gradient string
  const colorRegex = /#[a-fA-F0-9]{6}|rgb\([^)]+\)|rgba\([^)]+\)/g;
  const colors = background.match(colorRegex);
  return colors || ['#1e3a8a', '#3b82f6', '#1e3a8a'];
};

const getFilterForPhoto = (filterType: string): string => {
  const filters: Record<string, string> = {
    original: 'none',
    mono: 'grayscale(100%)',
    vintage: 'sepia(50%) contrast(90%) brightness(90%)',
    warm: 'sepia(30%) saturate(140%) brightness(105%)',
    cool: 'saturate(80%) hue-rotate(20deg) brightness(105%)',
    film: 'contrast(110%) brightness(90%) saturate(80%)',
    retro: 'sepia(40%) contrast(95%) saturate(120%) brightness(95%)',
  };
  
  return filters[filterType] || 'none';
};

const addDecorativeElements = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _category: string
): void => {
  // Add subtle pattern based on category
  ctx.globalAlpha = 0.1;
  
  // Add dots pattern
  const dotSpacing = 30;
  ctx.fillStyle = '#ffffff';
  
  for (let x = 0; x < width; x += dotSpacing) {
    for (let y = 0; y < height; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1;
};

const addFrameOverlay = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  _frame: Frame
): void => {
  // Add outer border
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, width - 8, height - 8);
  
  // Add inner border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, width - 24, height - 24);
};

const addLogo = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  // Add MOLYZ BOOTH text at the bottom
  const logoY = height - 60;
  
  // Background for logo
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, logoY - 15, width, 75);
  
  // MOLYZ text
  ctx.font = '16px "Press Start 2P", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('MOLYZ', width / 2, logoY + 10);
  
  // BOOTH text
  ctx.fillStyle = '#ef4444';
  ctx.fillText('BOOTH', width / 2 + 90, logoY + 10);
  
  // Tagline
  ctx.font = '10px "Poppins", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('CAPTURE YOUR MOMENT IN STYLE', width / 2, logoY + 30);
};
