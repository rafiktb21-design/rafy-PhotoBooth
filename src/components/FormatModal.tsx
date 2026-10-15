// MOLYZ BOOTH - Format Modal Component
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Film } from 'lucide-react';

interface FormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: 'png' | 'mp4') => void;
}

export const FormatModal = ({ isOpen, onClose, onDownload }: FormatModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-[8px_8px_0px_rgba(0,0,0,0.8)] border-4 border-gray-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-bangers tracking-wide">
                CHOOSE FORMAT
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </motion.button>
            </div>
            
            {/* Format Options */}
            <div className="space-y-3">
              {/* PNG Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDownload('png')}
                className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3
                  bg-blue-500 text-white border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                  hover:bg-blue-400 transition-all duration-100"
              >
                <Image size={24} />
                GET PHOTO (PNG)
              </motion.button>
              
              {/* MP4 Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDownload('mp4')}
                className="w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3
                  bg-purple-500 text-white border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                  hover:bg-purple-400 transition-all duration-100"
              >
                <Film size={24} />
                GET VIDEO (MP4)
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
