// MOLYZ BOOTH - Frame Card Component
import { motion } from 'framer-motion';
import type { Frame } from '../types';

interface FrameCardProps {
  frame: Frame;
  isSelected: boolean;
  onClick: () => void;
}

export const FrameCard = ({ frame, isSelected, onClick }: FrameCardProps) => {
  const isGrid = frame.layout === 'grid';
  const isDual = frame.layout === 'dual';
  
  const getAspectClass = () => {
    if (isGrid) return 'aspect-[4/3]';
    if (isDual) return 'aspect-[11/10]';
    return 'aspect-[3/9]';
  };

  const getSlotClass = () => {
    if (isGrid) return 'grid grid-cols-3 grid-rows-2 gap-1 p-2 h-full';
    if (isDual) return 'grid grid-cols-2 grid-rows-3 gap-1 p-2 h-full';
    return 'flex flex-col gap-1 p-2 h-full';
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-4 bg-white p-2
        transition-all duration-200
        ${isSelected ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'border-gray-800 hover:border-blue-400'}
      `}
      style={{
        boxShadow: isSelected 
          ? '0 0 20px rgba(250, 204, 21, 0.5), 4px 4px 0px rgba(0,0,0,0.8)'
          : '4px 4px 0px rgba(0,0,0,0.8)',
      }}
    >
      {/* Frame Preview */}
      <div 
        className={`${getAspectClass()} rounded-lg overflow-hidden`}
        style={{ background: frame.background }}
      >
        {/* Slot placeholders */}
        <div className={getSlotClass()}>
          {frame.slots.slice(0, 6).map((_, index) => (
            <div 
              key={index}
              className="flex-1 bg-white/80 rounded border-2 border-dashed border-gray-400 flex items-center justify-center"
            >
              <span className="text-xs text-gray-500 font-medium">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Frame Name */}
      <div className="mt-2 text-center">
        <p className="font-bold text-gray-800 text-sm truncate">{frame.name}</p>
        <p className="text-xs text-gray-500">{frame.category}</p>
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-800"
        >
          <span className="text-gray-800 font-bold">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};
