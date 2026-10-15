// MOLYZ BOOTH - Type Definitions

export interface FrameSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Frame {
  id: string;
  name: string;
  category: FrameCategory;
  preview: string;
  background: string;
  width: number;
  height: number;
  slots: FrameSlot[];
  aspectRatio: 'portrait' | 'landscape' | 'square';
  layout?: 'vertical' | 'grid' | 'dual'; // vertical = 6 ke bawah, grid = 3x2, dual = 2 kolom 3 baris
}

export type FrameCategory = 'All Frames' | 'PixToon' | 'Retro' | 'Aesthetic' | 'Default';

export interface Photo {
  id: string;
  blob: Blob | null;
  dataUrl: string;
  filter: FilterType;
  timestamp: number;
}

export type FilterType = 'original' | 'mono' | 'vintage' | 'warm' | 'cool' | 'film' | 'retro';

export interface Session {
  id: string;
  frameId: string;
  photos: Photo[];
  createdAt: number;
}

export type Page = 'home' | 'layout' | 'frames' | 'preview' | 'booth' | 'result';

export type LayoutType = 'vertical' | 'grid' | 'dual';

export interface AppState {
  currentPage: Page;
  selectedCategory: FrameCategory;
  selectedFrame: Frame | null;
  selectedFilter: FilterType;
  selectedLayout: LayoutType;
  cameraStream: MediaStream | null;
  capturedPhotos: Photo[];
  currentPhotoIndex: number;
  countdown: number | null;
  isCapturing: boolean;
  modal: ModalType | null;
  email: string;
  downloadStatus: 'idle' | 'loading' | 'success' | 'error';
}

export type ModalType = 'format' | 'email' | null;

export interface FilterConfig {
  id: FilterType;
  name: string;
  cssFilter: string;
}
