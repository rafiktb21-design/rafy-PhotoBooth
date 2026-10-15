// MOLYZ BOOTH - Frame Grid Component
import { motion } from 'framer-motion';
import type { Frame } from '../types';
import { FrameCard } from './FrameCard';

interface FrameGridProps {
  frames: Frame[];
  selectedFrame: Frame | null;
  onSelectFrame: (frame: Frame) => void;
}

export const FrameGrid = ({ frames, selectedFrame, onSelectFrame }: FrameGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {frames.map((frame, index) => (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <FrameCard
            frame={frame}
            isSelected={selectedFrame?.id === frame.id}
            onClick={() => onSelectFrame(frame)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
