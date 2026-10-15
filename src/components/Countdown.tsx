// MOLYZ BOOTH - Countdown Component
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  countdown: number | null;
}

export const Countdown = ({ countdown }: CountdownProps) => {
  if (countdown === null) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        key={countdown}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-9xl font-bangers text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
        >
          {countdown}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
