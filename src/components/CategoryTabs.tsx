// MOLYZ BOOTH - Category Tabs Component
import { motion } from 'framer-motion';
import type { FrameCategory } from '../types';
import { categories } from '../data/frames';

interface CategoryTabsProps {
  selectedCategory: FrameCategory;
  onSelectCategory: (category: FrameCategory) => void;
}

export const CategoryTabs = ({ selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        
        return (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category)}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide
              border-3 transition-all duration-200
              ${isSelected 
                ? 'bg-yellow-400 text-black border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]' 
                : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700 shadow-[3px_3px_0px_rgba(0,0,0,0.5)]'
              }
            `}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};
