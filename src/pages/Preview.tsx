// MOLYZ BOOTH - Frame Preview Page
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import type { Frame } from '../types';
import { Button } from '../components/Button';

interface PreviewPageProps {
  selectedFrame: Frame | null;
  onUseFrame: () => void;
  onBack: () => void;
}

export const PreviewPage = ({ selectedFrame, onUseFrame, onBack }: PreviewPageProps) => {
  if (!selectedFrame) {
    return (
      <div className="min-h-screen bg-arcade-pattern flex items-center justify-center">
        <p className="text-white text-xl">No frame selected.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-arcade-pattern px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="primary"
            size="small"
            onClick={onBack}
            icon={<ArrowLeft size={16} />}
          >
            BACK
          </Button>
          
          <h1 className="mt-4 text-3xl md:text-4xl font-bangers text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)] text-center">
            FRAME PREVIEW
          </h1>
        </motion.div>
        
        {/* Preview Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Frame Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <div 
              className={`${selectedFrame.layout === 'grid' || selectedFrame.layout === 'dual' ? 'max-w-sm' : 'max-w-xs'} w-full rounded-2xl border-4 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.8)] overflow-hidden`}
              style={{ background: selectedFrame.background }}
            >
              {/* Photo Slots Preview */}
              <div className="p-3">
                {selectedFrame.layout === 'grid' ? (
                  // Grid Layout (3+3)
                  <div className="grid grid-cols-3 grid-rows-2 gap-2">
                    {selectedFrame.slots.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="aspect-[3/2] bg-white/80 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center"
                      >
                        <span className="text-gray-500 font-medium text-sm">{index + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : selectedFrame.layout === 'dual' ? (
                  // Dual Layout (2 kolom, 3 baris)
                  <div className="grid grid-cols-2 grid-rows-3 gap-2">
                    {selectedFrame.slots.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="aspect-[2/1] bg-white/80 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center"
                      >
                        <span className="text-gray-500 font-medium text-sm">{index + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Vertical Layout (6 ke bawah)
                  <>
                    {selectedFrame.slots.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="mb-2 last:mb-0 aspect-[2/1] bg-white/80 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center"
                      >
                        <span className="text-gray-500 font-medium text-sm">Photo {index + 1}</span>
                      </motion.div>
                    ))}
                  </>
                )}
                
                {/* Logo Area */}
                <div className="mt-4 py-3 bg-black/50 rounded-lg text-center">
                  <span className="text-white font-['Press_Start_2P'] text-sm">MOLYZ </span>
                  <span className="text-red-400 font-['Press_Start_2P'] text-sm">BOOTH</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Frame Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] border-4 border-gray-800"
          >
            <h2 className="text-2xl font-bangers text-gray-800 mb-4">{selectedFrame.name}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Category</span>
                <span className="text-gray-800 font-bold">{selectedFrame.category}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Photos</span>
                <span className="text-gray-800 font-bold">{selectedFrame.slots.length} slots</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Layout</span>
                <span className="text-gray-800 font-bold">
                  {selectedFrame.layout === 'grid' ? 'Grid (3×2)' : selectedFrame.layout === 'dual' ? 'Dual (2×3)' : 'Vertical (6↓)'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Orientation</span>
                <span className="text-gray-800 font-bold capitalize">{selectedFrame.aspectRatio}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="success"
                size="large"
                onClick={onUseFrame}
                icon={<Check size={20} />}
                className="w-full"
              >
                USE THIS FRAME
              </Button>
              
              <Button
                variant="primary"
                size="medium"
                onClick={onBack}
                className="w-full"
              >
                CHOOSE ANOTHER
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
