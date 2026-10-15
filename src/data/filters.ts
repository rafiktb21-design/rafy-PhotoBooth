// MOLYZ BOOTH - Filter Configuration
import type { FilterConfig, FilterType } from '../types';

export const filters: FilterConfig[] = [
  {
    id: 'original',
    name: 'Original',
    cssFilter: 'none',
  },
  {
    id: 'mono',
    name: 'Mono',
    cssFilter: 'grayscale(100%)',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    cssFilter: 'sepia(50%) contrast(90%) brightness(90%)',
  },
  {
    id: 'warm',
    name: 'Warm',
    cssFilter: 'sepia(30%) saturate(140%) brightness(105%)',
  },
  {
    id: 'cool',
    name: 'Cool',
    cssFilter: 'saturate(80%) hue-rotate(20deg) brightness(105%)',
  },
  {
    id: 'film',
    name: 'Film',
    cssFilter: 'contrast(110%) brightness(90%) saturate(80%)',
  },
  {
    id: 'retro',
    name: 'Retro',
    cssFilter: 'sepia(40%) contrast(95%) saturate(120%) brightness(95%)',
  },
];

export const getFilterById = (id: FilterType): FilterConfig => {
  return filters.find((filter) => filter.id === id) || filters[0];
};
