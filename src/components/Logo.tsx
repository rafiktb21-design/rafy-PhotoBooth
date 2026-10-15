// MOLYZ BOOTH - Logo Component
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'large';
}

export const Logo = ({ size = 'large' }: LogoProps) => {
  const isLarge = size === 'large';
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      {/* Decorative Stars */}
      <motion.div
        className="absolute -left-8 top-0"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="text-yellow-400 fill-yellow-400" size={isLarge ? 24 : 16} />
      </motion.div>
      <motion.div
        className="absolute -right-6 top-4"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="text-yellow-400 fill-yellow-400" size={isLarge ? 18 : 12} />
      </motion.div>
      <motion.div
        className="absolute -left-4 -bottom-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Star className="text-white" size={isLarge ? 14 : 10} />
      </motion.div>
      
      {/* Logo Text */}
      <div className={`font-['Press_Start_2P'] tracking-wider ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
        <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">MOLYZ</span>
      </div>
      <div className={`font-['Press_Start_2P'] tracking-wider mt-2 ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
        <span className="text-red-500 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">BOOTH</span>
      </div>
    </motion.div>
  );
};
