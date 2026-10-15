// MOLYZ BOOTH - Result Page
import { motion } from 'framer-motion';
import type { Frame, Photo } from '../types';
import { ResultPreview } from '../components/ResultPreview';
import { SavePanel } from '../components/SavePanel';
import { EmailModal } from '../components/EmailModal';
import { FormatModal } from '../components/FormatModal';

interface ResultPageProps {
  selectedFrame: Frame | null;
  capturedPhotos: Photo[];
  finalPhotoBlob: Blob | null;
  modal: 'format' | 'email' | null;
  downloadStatus: 'idle' | 'loading' | 'success' | 'error';
  onDownload: (format: 'png' | 'mp4') => void;
  onOpenModal: (modal: 'format' | 'email') => void;
  onCloseModal: () => void;
  onSendEmail: (email: string) => Promise<boolean>;
  onReplay: () => void;
}

export const ResultPage = ({
  selectedFrame,
  capturedPhotos,
  finalPhotoBlob,
  modal,
  downloadStatus,
  onDownload,
  onOpenModal,
  onCloseModal,
  onSendEmail,
  onReplay,
}: ResultPageProps) => {
  if (!selectedFrame) {
    return (
      <div className="min-h-screen bg-arcade-pattern flex items-center justify-center">
        <p className="text-white text-xl">No result to display.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-arcade-pattern px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Mission Complete Header */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-7xl font-bangers text-yellow-400 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
          >
            MISSION COMPLETE!
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-3xl"
              >
                ⭐
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Photo Strip Preview */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-sm">
              <ResultPreview
                frame={selectedFrame}
                photos={capturedPhotos}
                photoBlob={finalPhotoBlob}
              />
            </div>
          </motion.div>
          
          {/* Save Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SavePanel
              onDownload={() => onOpenModal('format')}
              onEmail={() => onOpenModal('email')}
              onReplay={onReplay}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Modals */}
      <FormatModal
        isOpen={modal === 'format'}
        onClose={onCloseModal}
        onDownload={onDownload}
      />
      
      <EmailModal
        isOpen={modal === 'email'}
        onClose={onCloseModal}
        onSend={onSendEmail}
        status={downloadStatus}
      />
    </div>
  );
};
