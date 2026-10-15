// MOLYZ BOOTH - Camera Utilities

export interface CameraError {
  type: 'permission' | 'notfound' | 'generic';
  message: string;
}

export interface CameraDevice {
  deviceId: string;
  label: string;
}

export const getAvailableCameras = async (): Promise<CameraDevice[]> => {
  try {
    // Request permission first
    await navigator.mediaDevices.getUserMedia({ video: true });
    
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    return videoDevices.map(device => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
    }));
  } catch (error) {
    console.error('Failed to enumerate cameras:', error);
    return [];
  }
};

export const requestCamera = async (deviceId?: string): Promise<{ stream: MediaStream | null; error: CameraError | null }> => {
  try {
    const constraints: MediaStreamConstraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        ...(deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'user' }),
      },
      audio: false,
    };
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return { stream, error: null };
  } catch (err) {
    const error = err as Error;
    
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return {
        stream: null,
        error: {
          type: 'permission',
          message: 'Camera permission denied. Please allow camera access in your browser settings.',
        },
      };
    }
    
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return {
        stream: null,
        error: {
          type: 'notfound',
          message: 'No camera found. Please connect a camera and try again.',
        },
      };
    }
    
    return {
      stream: null,
      error: {
        type: 'generic',
        message: 'Failed to access camera. Please try again.',
      },
    };
  }
};

export const stopCamera = (stream: MediaStream | null): void => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

export const capturePhoto = (video: HTMLVideoElement, filter: string): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Apply filter
  ctx.filter = filter === 'none' ? 'none' : filter;
  
  // Draw video frame to canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convert to data URL
  return canvas.toDataURL('image/png', 1.0);
};

export const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};
