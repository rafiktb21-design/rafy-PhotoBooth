// MOLYZ BOOTH - Progress Bar Component
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  frameName: string;
}

export const ProgressBar = ({ current, total, frameName }: ProgressBarProps) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white font-bangers text-2xl tracking-wide">{frameName.toUpperCase()}</h2>
        <span className="text-yellow-400 font-bold">
          {current} / {total}
        </span>
      </div>
      
      <div className="w-full h-4 bg-gray-800 rounded-full border-2 border-gray-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
        />
      </div>
      
      <div className="flex justify-between mt-1">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`
              w-3 h-3 rounded-full border-2
              ${index < current 
                ? 'bg-green-400 border-green-300' 
                : index === current 
                  ? 'bg-yellow-400 border-yellow-300 animate-pulse' 
                  : 'bg-gray-700 border-gray-600'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};
