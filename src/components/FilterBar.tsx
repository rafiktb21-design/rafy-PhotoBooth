// MOLYZ BOOTH - Filter Bar Component
import { motion } from 'framer-motion';
import type { FilterType } from '../types';
import { filters } from '../data/filters';

interface FilterBarProps {
  selectedFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

export const FilterBar = ({ selectedFilter, onSelectFilter }: FilterBarProps) => {
  return (
    <div className="w-full">
      <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
        <span className="text-yellow-400">⚡</span>
        FILTERS
      </h3>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id;
          
          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectFilter(filter.id)}
              className={`
                flex-shrink-0 w-16 h-16 rounded-xl border-3 font-bold text-xs
                transition-all duration-200 flex items-center justify-center
                ${isSelected 
                  ? 'bg-yellow-400 text-black border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.8)]' 
                  : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700 shadow-[3px_3px_0px_rgba(0,0,0,0.5)]'
                }
              `}
            >
              {filter.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
