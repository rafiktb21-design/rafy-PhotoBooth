// MOLYZ BOOTH - Home Page
import { motion } from 'framer-motion';
import { Camera, Info, Shield, Mail, X } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';

interface HomePageProps {
  onStartGame: () => void;
}

export const HomePage = ({ onStartGame }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-arcade-pattern flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
      </div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center max-w-2xl mx-auto text-center"
      >
        {/* Logo */}
        <Logo size="large" />
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-xl md:text-2xl text-white font-medium tracking-wide drop-shadow-lg"
        >
          CAPTURE YOUR MOMENT IN STYLE
        </motion.p>
        
        {/* Random Theme Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button
            variant="secondary"
            size="small"
            onClick={() => console.log('Random theme')}
          >
            🎲 RANDOM THEME
          </Button>
        </motion.div>
        
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 w-full max-w-md bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/20 shadow-[8px_8px_0px_rgba(0,0,0,0.3)]"
        >
          {/* Camera Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            📷
          </motion.div>
          
          {/* Start Game Button */}
          <Button
            variant="success"
            size="large"
            onClick={onStartGame}
            icon={<Camera size={24} />}
            className="w-full text-xl"
          >
            START GAME
          </Button>
        </motion.div>
        
        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex gap-4"
        >
          <Button
            variant="primary"
            size="small"
            onClick={() => console.log('About')}
            icon={<Info size={16} />}
          >
            ABOUT
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => console.log('Privacy')}
            icon={<Shield size={16} />}
          >
            PRIVACY
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => console.log('Contact')}
            icon={<Mail size={16} />}
          >
            CONTACT
          </Button>
        </motion.div>
        
        {/* Quit Game */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Button
            variant="danger"
            size="small"
            onClick={() => window.close()}
            icon={<X size={16} />}
          >
            QUIT GAME
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-white/60 text-sm"
      >
        © MOLYZ BOOTH. ALL RIGHTS RESERVED.
      </motion.footer>
    </div>
  );
};
