// MOLYZ BOOTH - Result Preview Component
import { motion } from 'framer-motion';
import type { Photo, Frame } from '../types';

interface ResultPreviewProps {
  frame: Frame;
  photos: Photo[];
  photoBlob: Blob | null;
}

export const ResultPreview = ({ frame, photos, photoBlob }: ResultPreviewProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      {/* Photo Strip Container */}
      <div 
        className="rounded-2xl border-4 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ background: frame.background }}
      >
        {photoBlob ? (
          // Show generated photo strip
          <img 
            src={URL.createObjectURL(photoBlob)} 
            alt="Photo Strip"
            className="w-full h-auto"
          />
        ) : (
          // Show preview with captured photos
          <div className="p-3">
            {frame.layout === 'grid' ? (
              <div className="grid grid-cols-3 grid-rows-2 gap-2">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img 
                      src={photo.dataUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full aspect-[3/2] object-cover rounded-lg border-2 border-white/50"
                    />
                  </motion.div>
                ))}
              </div>
            ) : frame.layout === 'dual' ? (
              <div className="grid grid-cols-2 grid-rows-3 gap-2">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img 
                      src={photo.dataUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full aspect-[2/1] object-cover rounded-lg border-2 border-white/50"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-2 last:mb-0"
                >
                  <img 
                    src={photo.dataUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-full rounded-lg border-2 border-white/50"
                  />
                </motion.div>
              ))
            )}
            
            {/* Logo */}
            <div className="mt-4 text-center py-3 bg-black/50 rounded-lg">
              <span className="text-white font-['Press_Start_2P'] text-sm">MOLYZ </span>
              <span className="text-red-400 font-['Press_Start_2P'] text-sm">BOOTH</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
