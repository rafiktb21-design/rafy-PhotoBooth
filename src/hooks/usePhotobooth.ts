// MOLYZ BOOTH - Photobooth Hook
import { useState, useCallback, useEffect } from 'react';
import type { Frame, Photo, FilterType, Page, FrameCategory, ModalType, LayoutType } from '../types';
import { requestCamera, stopCamera, capturePhoto, dataUrlToBlob, getAvailableCameras } from '../utils/camera';
import type { CameraDevice } from '../utils/camera';
import { getFilterById } from '../data/filters';
import { composePhotoStrip } from '../utils/compositor';
import { downloadPhotoStrip } from '../utils/download';

interface UsePhotoboothReturn {
  // State
  currentPage: Page;
  selectedCategory: FrameCategory;
  selectedFrame: Frame | null;
  selectedFilter: FilterType;
  selectedLayout: LayoutType;
  capturedPhotos: Photo[];
  currentPhotoIndex: number;
  countdown: number | null;
  isCapturing: boolean;
  modal: ModalType;
  cameraStream: MediaStream | null;
  cameraError: { type: string; message: string } | null;
  finalPhotoBlob: Blob | null;
  downloadStatus: 'idle' | 'loading' | 'success' | 'error';
  availableCameras: CameraDevice[];
  selectedCameraId: string | null;
  
  // Actions
  navigateTo: (page: Page) => void;
  selectCategory: (category: FrameCategory) => void;
  selectFrame: (frame: Frame) => void;
  selectFilter: (filter: FilterType) => void;
  selectLayout: (layout: LayoutType) => void;
  startCamera: (deviceId?: string) => Promise<void>;
  stopCameraStream: () => void;
  takePhoto: () => Promise<void>;
  uploadPhoto: (file: File) => void;
  removePhoto: (index: number) => void;
  retakePhoto: (index: number) => void;
  generateResult: () => Promise<void>;
  downloadResult: (format: 'png' | 'mp4') => void;
  sendEmail: (email: string) => Promise<boolean>;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  resetSession: () => void;
  selectCamera: (deviceId: string) => void;
}

export const usePhotobooth = (): UsePhotoboothReturn => {
  // State
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<FrameCategory>('All Frames');
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('original');
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('vertical');
  const [capturedPhotos, setCapturedPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<{ type: string; message: string } | null>(null);
  const [finalPhotoBlob, setFinalPhotoBlob] = useState<Blob | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [availableCameras, setAvailableCameras] = useState<CameraDevice[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  
  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera(cameraStream);
    };
  }, [cameraStream]);
  
  // Navigation
  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);
  
  // Category selection
  const selectCategory = useCallback((category: FrameCategory) => {
    setSelectedCategory(category);
  }, []);
  
  // Frame selection
  const selectFrame = useCallback((frame: Frame) => {
    setSelectedFrame(frame);
    setCurrentPhotoIndex(0);
    setCapturedPhotos([]);
  }, []);
  
  // Filter selection
  const selectFilter = useCallback((filter: FilterType) => {
    setSelectedFilter(filter);
  }, []);
  
  // Layout selection
  const selectLayout = useCallback((layout: LayoutType) => {
    setSelectedLayout(layout);
  }, []);
  
  // Camera controls
  const startCamera = useCallback(async (deviceId?: string) => {
    const cameraId = deviceId || selectedCameraId || undefined;
    const { stream, error } = await requestCamera(cameraId);
    
    if (error) {
      setCameraError(error);
    } else {
      setCameraStream(stream);
      setCameraError(null);
      
      // Get available cameras after permission is granted
      const cameras = await getAvailableCameras();
      setAvailableCameras(cameras);
      
      // Set first camera as selected if none selected
      if (!selectedCameraId && cameras.length > 0) {
        setSelectedCameraId(cameras[0].deviceId);
      }
    }
  }, [selectedCameraId]);
  
  const stopCameraStream = useCallback(() => {
    stopCamera(cameraStream);
    setCameraStream(null);
  }, [cameraStream]);
  
  // Select camera
  const selectCamera = useCallback(async (deviceId: string) => {
    // Stop current stream
    stopCamera(cameraStream);
    setCameraStream(null);
    
    // Set new camera
    setSelectedCameraId(deviceId);
    
    // Start camera with new device
    const { stream, error } = await requestCamera(deviceId);
    
    if (error) {
      setCameraError(error);
    } else {
      setCameraStream(stream);
      setCameraError(null);
    }
  }, [cameraStream]);
  
  // Take photo
  const takePhoto = useCallback(async () => {
    if (!cameraStream || !selectedFrame || isCapturing) return;
    
    setIsCapturing(true);
    
    // Countdown
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    setCountdown(null);
    
    // Capture photo
    const video = document.querySelector('video');
    if (video) {
      const filterConfig = getFilterById(selectedFilter);
      const dataUrl = capturePhoto(video, filterConfig.cssFilter);
      const blob = dataUrlToBlob(dataUrl);
      
      const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        blob,
        dataUrl,
        filter: selectedFilter,
        timestamp: Date.now(),
      };
      
      setCapturedPhotos((prev) => [...prev, newPhoto]);
      setCurrentPhotoIndex((prev) => prev + 1);
    }
    
    setIsCapturing(false);
  }, [cameraStream, selectedFrame, isCapturing, selectedFilter]);
  
  // Upload photo
  const uploadPhoto = useCallback((file: File) => {
    if (!selectedFrame) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      
      const newPhoto: Photo = {
        id: `photo-${Date.now()}`,
        blob: file,
        dataUrl,
        filter: selectedFilter,
        timestamp: Date.now(),
      };
      
      setCapturedPhotos((prev) => [...prev, newPhoto]);
      setCurrentPhotoIndex((prev) => prev + 1);
    };
    
    reader.readAsDataURL(file);
  }, [selectedFrame, selectedFilter]);
  
  // Remove photo
  const removePhoto = useCallback((index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1));
  }, []);
  
  // Retake photo
  const retakePhoto = useCallback((index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i < index));
    setCurrentPhotoIndex(index);
    navigateTo('booth');
  }, [navigateTo]);
  
  // Generate result
  const generateResult = useCallback(async () => {
    if (!selectedFrame || capturedPhotos.length === 0) return;
    
    try {
      const blob = await composePhotoStrip(selectedFrame, capturedPhotos);
      setFinalPhotoBlob(blob);
      navigateTo('result');
    } catch (error) {
      console.error('Failed to generate photo strip:', error);
    }
  }, [selectedFrame, capturedPhotos, navigateTo]);
  
  // Download result
  const downloadResult = useCallback((format: 'png' | 'mp4') => {
    if (!finalPhotoBlob || !selectedFrame) return;
    
    setDownloadStatus('loading');
    
    try {
      if (format === 'png') {
        downloadPhotoStrip(finalPhotoBlob, selectedFrame.name);
        setDownloadStatus('success');
      } else {
        // MP4 generation would require additional implementation
        // For now, just download PNG
        downloadPhotoStrip(finalPhotoBlob, selectedFrame.name);
        setDownloadStatus('success');
      }
    } catch (error) {
      setDownloadStatus('error');
    }
  }, [finalPhotoBlob, selectedFrame]);
  
  // Send email
  const sendEmail = useCallback(async (email: string): Promise<boolean> => {
    // This would require a backend service
    // For now, simulate success
    setDownloadStatus('loading');
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In production, this would call an API endpoint
    console.log('Sending to email:', email);
    
    setDownloadStatus('success');
    return true;
  }, []);
  
  // Modal controls
  const openModal = useCallback((newModal: ModalType) => {
    setModal(newModal);
  }, []);
  
  const closeModal = useCallback(() => {
    setModal(null);
  }, []);
  
  // Reset session
  const resetSession = useCallback(() => {
    stopCamera(cameraStream);
    setCameraStream(null);
    setSelectedFrame(null);
    setSelectedFilter('original');
    setCapturedPhotos([]);
    setCurrentPhotoIndex(0);
    setFinalPhotoBlob(null);
    setCountdown(null);
    setIsCapturing(false);
    setModal(null);
    setDownloadStatus('idle');
    navigateTo('frames');
  }, [cameraStream, navigateTo]);
  
  return {
    // State
    currentPage,
    selectedCategory,
    selectedFrame,
    selectedFilter,
    selectedLayout,
    capturedPhotos,
    currentPhotoIndex,
    countdown,
    isCapturing,
    modal,
    cameraStream,
    cameraError,
    finalPhotoBlob,
    downloadStatus,
    availableCameras,
    selectedCameraId,
    
    // Actions
    navigateTo,
    selectCategory,
    selectFrame,
    selectFilter,
    selectLayout,
    startCamera,
    stopCameraStream,
    takePhoto,
    uploadPhoto,
    removePhoto,
    retakePhoto,
    generateResult,
    downloadResult,
    sendEmail,
    openModal,
    closeModal,
    resetSession,
    selectCamera,
  };
};
