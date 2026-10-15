// MOLYZ BOOTH - Main App Component
import { AnimatePresence, motion } from 'framer-motion';
import { usePhotobooth } from './hooks/usePhotobooth';
import { HomePage } from './pages/Home';
import { LayoutPage } from './pages/Layout';
import { FramesPage } from './pages/Frames';
import { PreviewPage } from './pages/Preview';
import { BoothPage } from './pages/Booth';
import { ResultPage } from './pages/Result';

function App() {
  const {
    // State
    currentPage,
    selectedCategory,
    selectedFrame,
    selectedFilter,
    selectedLayout,
    capturedPhotos,
    currentPhotoIndex,
    countdown,
    isCapturing,
    modal,
    cameraStream,
    cameraError,
    finalPhotoBlob,
    downloadStatus,
    availableCameras,
    selectedCameraId,
    
    // Actions
    navigateTo,
    selectCategory,
    selectFrame,
    selectFilter,
    selectLayout,
    startCamera,
    stopCameraStream,
    takePhoto,
    uploadPhoto,
    removePhoto,
    generateResult,
    downloadResult,
    sendEmail,
    openModal,
    closeModal,
    resetSession,
    selectCamera,
  } = usePhotobooth();
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };
  
  return (
    <div className="min-h-screen bg-blue-600">
      <AnimatePresence mode="wait">
        {/* Home Page */}
        {currentPage === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <HomePage onStartGame={() => navigateTo('layout')} />
          </motion.div>
        )}
        
        {/* Layout Selection Page */}
        {currentPage === 'layout' && (
          <motion.div
            key="layout"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <LayoutPage
              onSelectLayout={(layout) => {
                selectLayout(layout);
                navigateTo('frames');
              }}
              onBack={() => navigateTo('home')}
            />
          </motion.div>
        )}
        
        {/* Frames Page */}
        {currentPage === 'frames' && (
          <motion.div
            key="frames"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <FramesPage
              selectedCategory={selectedCategory}
              selectedFrame={selectedFrame}
              selectedLayout={selectedLayout}
              onSelectCategory={selectCategory}
              onSelectFrame={(frame) => {
                selectFrame(frame);
                navigateTo('preview');
              }}
              onBack={() => navigateTo('layout')}
            />
          </motion.div>
        )}
        
        {/* Preview Page */}
        {currentPage === 'preview' && (
          <motion.div
            key="preview"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PreviewPage
              selectedFrame={selectedFrame}
              onUseFrame={() => navigateTo('booth')}
              onBack={() => navigateTo('frames')}
            />
          </motion.div>
        )}
        
        {/* Booth Page */}
        {currentPage === 'booth' && (
          <motion.div
            key="booth"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BoothPage
              selectedFrame={selectedFrame}
              capturedPhotos={capturedPhotos}
              currentPhotoIndex={currentPhotoIndex}
              selectedFilter={selectedFilter}
              cameraStream={cameraStream}
              cameraError={cameraError}
              countdown={countdown}
              isCapturing={isCapturing}
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onStartCamera={startCamera}
              onStopCamera={stopCameraStream}
              onTakePhoto={takePhoto}
              onUploadPhoto={uploadPhoto}
              onRemovePhoto={removePhoto}
              onSelectFilter={selectFilter}
              onSelectCamera={selectCamera}
              onBack={() => {
                stopCameraStream();
                navigateTo('frames');
              }}
              onComplete={generateResult}
            />
          </motion.div>
        )}
        
        {/* Result Page */}
        {currentPage === 'result' && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ResultPage
              selectedFrame={selectedFrame}
              capturedPhotos={capturedPhotos}
              finalPhotoBlob={finalPhotoBlob}
              modal={modal}
              downloadStatus={downloadStatus}
              onDownload={downloadResult}
              onOpenModal={openModal}
              onCloseModal={closeModal}
              onSendEmail={sendEmail}
              onReplay={resetSession}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
