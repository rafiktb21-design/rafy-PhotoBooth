// MOLYZ BOOTH - Inventory Component
import { motion } from 'framer-motion';
import type { Photo } from '../types';
import { X } from 'lucide-react';

interface InventoryProps {
  photos: Photo[];
  totalSlots: number;
  onRemovePhoto: (index: number) => void;
}

export const Inventory = ({ photos, totalSlots, onRemovePhoto }: InventoryProps) => {
  return (
    <div className="w-full">
      <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2 bg-yellow-400 px-3 py-2 rounded-lg">
        <span className="text-black">📸</span>
        <span className="text-black">INVENTORY</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: totalSlots }).map((_, index) => {
          const photo = photos[index];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`
                relative aspect-square rounded-xl border-3 overflow-hidden
                ${photo 
                  ? 'bg-white border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]' 
                  : 'bg-gray-800/50 border-dashed border-gray-600'
                }
              `}
            >
              {photo ? (
                <>
                  <img 
                    src={photo.dataUrl} 
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                    {index + 1}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemovePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
                  >
                    <X size={14} />
                  </motion.button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-2xl font-bold">{index + 1}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-3 text-center">
        <span className="text-white font-bold">
          {photos.length} / {totalSlots} photos
        </span>
      </div>
    </div>
  );
};
