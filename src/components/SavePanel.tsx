// MOLYZ BOOTH - Save Panel Component
import { motion } from 'framer-motion';
import { Download, Mail, RotateCcw } from 'lucide-react';

interface SavePanelProps {
  onDownload: () => void;
  onEmail: () => void;
  onReplay: () => void;
}

export const SavePanel = ({ onDownload, onEmail, onReplay }: SavePanelProps) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] border-4 border-gray-800"
    >
      <h3 className="text-xl font-bold text-gray-800 font-bangers tracking-wide mb-4 text-center">
        DATA SAVE
      </h3>
      
      <div className="h-1 bg-gray-300 rounded-full mb-6" />
      
      <div className="space-y-3">
        {/* Save to Disk */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDownload}
          className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3
            bg-blue-500 text-white border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
            hover:bg-blue-400 transition-all duration-100"
        >
          <Download size={20} />
          SAVE TO DISK
        </motion.button>
        
        {/* Send to Email */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEmail}
          className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3
            bg-green-500 text-white border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
            hover:bg-green-400 transition-all duration-100"
        >
          <Mail size={20} />
          SEND TO EMAIL
        </motion.button>
        
        {/* Replay */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-3
            bg-orange-500 text-white border-3 border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
            hover:bg-orange-400 transition-all duration-100"
        >
          <RotateCcw size={20} />
          REPLAY MISSION
        </motion.button>
      </div>
    </motion.div>
  );
};
