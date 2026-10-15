// MOLYZ BOOTH - Email Modal Component
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Mail, Send, Check, AlertCircle } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => Promise<boolean>;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export const EmailModal = ({ isOpen, onClose, onSend, status }: EmailModalProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSend = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    await onSend(email);
  };
  
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 font-bangers tracking-wide">
                SEND PERMANENTLY
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
            
            {/* Description */}
            <p className="text-gray-600 mb-6">
              Enter your email to receive the high-quality digital copy of your photo strip.
            </p>
            
            {/* Email Input */}
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-3 border-gray-300 focus:border-blue-500 focus:outline-none font-medium"
                disabled={status === 'loading'}
              />
            </div>
            
            {/* Error Message */}
            {emailError && (
              <p className="text-red-500 text-sm mb-4 flex items-center gap-2">
                <AlertCircle size={16} />
                {emailError}
              </p>
            )}
            
            {/* Status Messages */}
            {status === 'loading' && (
              <p className="text-blue-500 text-sm mb-4 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Send size={16} />
                </motion.div>
                Sending...
              </p>
            )}
            
            {status === 'success' && (
              <p className="text-green-500 text-sm mb-4 flex items-center gap-2">
                <Check size={16} />
                Email sent successfully!
              </p>
            )}
            
            {status === 'error' && (
              <p className="text-red-500 text-sm mb-4 flex items-center gap-2">
                <AlertCircle size={16} />
                Failed to send email. Please try again.
              </p>
            )}
            
            {/* Send Button */}
            <motion.button
              whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
              whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
              onClick={handleSend}
              disabled={status === 'loading'}
              className={`
                w-full py-3 rounded-xl font-bold uppercase tracking-wide
                border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                transition-all duration-100
                ${status === 'loading' 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-400'
                }
              `}
            >
              {status === 'loading' ? 'SENDING...' : 'SEND'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
