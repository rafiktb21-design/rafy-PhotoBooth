// MOLYZ BOOTH - Frames Page
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { FrameCategory, Frame as FrameType, LayoutType } from '../types';
import { CategoryTabs } from '../components/CategoryTabs';
import { FrameGrid } from '../components/FrameGrid';
import { Button } from '../components/Button';
import { getFramesByCategoryAndLayout } from '../data/frames';

interface FramesPageProps {
  selectedCategory: FrameCategory;
  selectedFrame: FrameType | null;
  selectedLayout: LayoutType;
  onSelectCategory: (category: FrameCategory) => void;
  onSelectFrame: (frame: FrameType) => void;
  onBack: () => void;
}

export const FramesPage = ({
  selectedCategory,
  selectedFrame,
  selectedLayout,
  onSelectCategory,
  onSelectFrame,
  onBack,
}: FramesPageProps) => {
  const frames = getFramesByCategoryAndLayout(selectedCategory, selectedLayout);
  
  return (
    <div className="min-h-screen bg-arcade-pattern px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="primary"
            size="small"
            onClick={onBack}
            icon={<ArrowLeft size={16} />}
          >
            BACK
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-8bit text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.8)] tracking-wider">
              CHOOSE YOUR FRAME
            </h1>
            <p className="text-white/70 text-sm mt-2">
              Layout: {selectedLayout === 'grid' ? 'Grid (3×2)' : selectedLayout === 'dual' ? 'Dual (2×3)' : 'Vertical (6↓)'}
            </p>
          </div>
          
          <div className="w-24" /> {/* Spacer for alignment */}
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </motion.div>
        
        {/* Frame Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FrameGrid
            frames={frames}
            selectedFrame={selectedFrame}
            onSelectFrame={onSelectFrame}
          />
        </motion.div>
        
        {/* Selected Frame Action */}
        {selectedFrame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-4 border-t-4 border-yellow-400"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">{selectedFrame.name}</p>
                <p className="text-gray-400 text-sm">{selectedFrame.slots.length} photos • {selectedFrame.category}</p>
              </div>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => console.log('Use frame')}
              >
                USE THIS FRAME →
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
