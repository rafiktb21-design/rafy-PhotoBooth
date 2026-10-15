// MOLYZ BOOTH - Camera Preview Component
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { VideoOff } from 'lucide-react';
import type { FilterType } from '../types';
import { getFilterById } from '../data/filters';

interface CameraPreviewProps {
  stream: MediaStream | null;
  filter: FilterType;
  isCapturing: boolean;
}

export const CameraPreview = ({ stream, filter, isCapturing }: CameraPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const filterConfig = getFilterById(filter);
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  if (!stream) {
    return (
      <div className="relative w-full aspect-[4/3] bg-gray-900 rounded-2xl border-4 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.8)] flex items-center justify-center">
        <div className="text-center">
          <VideoOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 font-bold">Camera Not Available</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      {/* Camera Frame */}
      <div className="relative w-full aspect-[4/3] rounded-2xl border-4 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.8)] overflow-hidden bg-gray-900">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ filter: filterConfig.cssFilter }}
        />
        
        {/* Live Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm border-2 border-white">
          <span className="w-2 h-2 bg-white rounded-full live-pulse" />
          LIVE
        </div>
        
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 border-2 border-white/50 rounded-lg" />
        </div>
        
        {/* Capture Flash Effect */}
        {isCapturing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  );
};
