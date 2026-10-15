// MOLYZ BOOTH - Layout Selection Page
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutGrid, LayoutList, Columns } from 'lucide-react';
import type { LayoutType } from '../types';
import { Button } from '../components/Button';

interface LayoutPageProps {
  onSelectLayout: (layout: LayoutType) => void;
  onBack: () => void;
}

export const LayoutPage = ({ onSelectLayout, onBack }: LayoutPageProps) => {
  return (
    <div className="min-h-screen bg-arcade-pattern flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mb-8"
      >
        <Button
          variant="primary"
          size="small"
          onClick={onBack}
          icon={<ArrowLeft size={16} />}
        >
          BACK
        </Button>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-8bit text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)] text-center mb-4 tracking-wider leading-relaxed"
      >
        CHOOSE LAYOUT
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white/80 text-lg mb-12 text-center"
      >
        Pilih format foto strip yang kamu mau!
      </motion.p>

      {/* Layout Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Vertical Layout Option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectLayout('vertical')}
          className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-4 border-white/20 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:border-white/40 transition-all"
        >
          {/* Preview */}
          <div className="flex justify-center mb-6">
            <div className="w-28 rounded-xl border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700">
              <div className="flex flex-col gap-1 p-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[2/1] bg-white/80 rounded border border-dashed border-gray-400 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LayoutList size={22} className="text-white" />
              <h3 className="text-xl font-bangers text-white">VERTICAL</h3>
            </div>
            <p className="text-white/70 text-sm">6 Foto ke Bawah</p>
            <p className="text-white/50 text-xs mt-1">Portrait Format</p>
          </div>
        </motion.div>

        {/* Dual Layout Option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectLayout('dual')}
          className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-4 border-white/20 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:border-white/40 transition-all"
        >
          {/* Preview */}
          <div className="flex justify-center mb-6">
            <div className="w-40 rounded-xl border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] overflow-hidden bg-gradient-to-b from-emerald-500 to-teal-600">
              <div className="grid grid-cols-2 grid-rows-3 gap-1 p-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[2/1] bg-white/80 rounded border border-dashed border-gray-400 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Columns size={22} className="text-white" />
              <h3 className="text-xl font-bangers text-white">DUAL</h3>
            </div>
            <p className="text-white/70 text-sm">3+3 Foto (2 Kolom)</p>
            <p className="text-white/50 text-xs mt-1">Landscape Format</p>
          </div>
        </motion.div>

        {/* Grid Layout Option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectLayout('grid')}
          className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-4 border-white/20 shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:border-white/40 transition-all"
        >
          {/* Preview */}
          <div className="flex justify-center mb-6">
            <div className="w-40 rounded-xl border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] overflow-hidden bg-gradient-to-b from-purple-500 to-pink-600">
              <div className="grid grid-cols-3 grid-rows-2 gap-1 p-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/2] bg-white/80 rounded border border-dashed border-gray-400 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LayoutGrid size={22} className="text-white" />
              <h3 className="text-xl font-bangers text-white">GRID</h3>
            </div>
            <p className="text-white/70 text-sm">3+3 Foto (2 Baris)</p>
            <p className="text-white/50 text-xs mt-1">Landscape Format</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
