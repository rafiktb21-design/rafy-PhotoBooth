// MOLYZ BOOTH - Photobooth Page
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Camera, Upload, ArrowLeft } from 'lucide-react';
import type { Frame, Photo, FilterType } from '../types';
import type { CameraDevice } from '../utils/camera';
import { CameraPreview } from '../components/CameraPreview';
import { Countdown } from '../components/Countdown';
import { Inventory } from '../components/Inventory';
import { FilterBar } from '../components/FilterBar';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { CameraSelector } from '../components/CameraSelector';

interface BoothPageProps {
  selectedFrame: Frame | null;
  capturedPhotos: Photo[];
  currentPhotoIndex: number;
  selectedFilter: FilterType;
  cameraStream: MediaStream | null;
  cameraError: { type: string; message: string } | null;
  countdown: number | null;
  isCapturing: boolean;
  availableCameras: CameraDevice[];
  selectedCameraId: string | null;
  onStartCamera: () => void;
  onStopCamera: () => void;
  onTakePhoto: () => void;
  onUploadPhoto: (file: File) => void;
  onRemovePhoto: (index: number) => void;
  onSelectFilter: (filter: FilterType) => void;
  onSelectCamera: (deviceId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const BoothPage = ({
  selectedFrame,
  capturedPhotos,
  currentPhotoIndex,
  selectedFilter,
  cameraStream,
  cameraError,
  countdown,
  isCapturing,
  availableCameras,
  selectedCameraId,
  onStartCamera,
  onStopCamera,
  onTakePhoto,
  onUploadPhoto,
  onRemovePhoto,
  onSelectFilter,
  onSelectCamera,
  onBack,
  onComplete,
}: BoothPageProps) => {
  // Start camera on mount
  useEffect(() => {
    if (!cameraStream && !cameraError) {
      onStartCamera();
    }
    
    return () => {
      // Don't stop camera on unmount to preserve stream
    };
  }, []);
  
  // Check if all photos are taken
  useEffect(() => {
    if (selectedFrame && capturedPhotos.length >= selectedFrame.slots.length) {
      // Auto-navigate to result after a short delay
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [capturedPhotos.length, selectedFrame, onComplete]);
  
  if (!selectedFrame) {
    return (
      <div className="min-h-screen bg-arcade-pattern flex items-center justify-center">
        <p className="text-white text-xl">No frame selected. Please go back and select a frame.</p>
      </div>
    );
  }
  
  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onUploadPhoto(file);
      }
    };
    input.click();
  };
  
  const isComplete = capturedPhotos.length >= selectedFrame.slots.length;
  
  return (
    <div className="min-h-screen bg-arcade-pattern px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                onStopCamera();
                onBack();
              }}
              icon={<ArrowLeft size={16} />}
            >
              BACK
            </Button>
            
            {/* Camera Selector */}
            <CameraSelector
              cameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onSelectCamera={onSelectCamera}
            />
          </div>
          
          <ProgressBar
            current={currentPhotoIndex}
            total={selectedFrame.slots.length}
            frameName={selectedFrame.name}
          />
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Camera Preview */}
            <div className="relative">
              <CameraPreview
                stream={cameraStream}
                filter={selectedFilter}
                isCapturing={isCapturing}
              />
              
              {/* Countdown Overlay */}
              <Countdown countdown={countdown} />
              
              {/* Camera Error */}
              {cameraError && (
                <div className="absolute inset-0 bg-gray-900/90 flex flex-col items-center justify-center rounded-2xl border-4 border-white">
                  <p className="text-white text-xl font-bold mb-4">CAMERA ACCESS REQUIRED</p>
                  <p className="text-gray-400 text-center mb-6 px-4">{cameraError.message}</p>
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={onStartCamera}
                    >
                      TRY AGAIN
                    </Button>
                    <Button
                      variant="secondary"
                      size="medium"
                      onClick={handleUploadClick}
                      icon={<Upload size={18} />}
                    >
                      UPLOAD PHOTO
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Filter Bar */}
            <div className="mt-6">
              <FilterBar
                selectedFilter={selectedFilter}
                onSelectFilter={onSelectFilter}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
              <Button
                variant="danger"
                size="medium"
                onClick={handleUploadClick}
                icon={<Upload size={20} />}
                disabled={isComplete}
              >
                UPLOAD
              </Button>
              
              <Button
                variant="secondary"
                size="large"
                onClick={onTakePhoto}
                icon={<Camera size={24} />}
                disabled={isComplete || !cameraStream || isCapturing}
                className="px-12"
              >
                CAPTURE
              </Button>
            </div>
          </motion.div>
          
          {/* Inventory Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20">
              <Inventory
                photos={capturedPhotos}
                totalSlots={selectedFrame.slots.length}
                onRemovePhoto={onRemovePhoto}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Complete Message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-40"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-bangers text-yellow-400 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)] mb-4">
                ALL PHOTOS CAPTURED!
              </h2>
              <p className="text-white text-xl">Generating your photo strip...</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
