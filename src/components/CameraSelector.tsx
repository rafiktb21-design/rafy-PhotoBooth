// MOLYZ BOOTH - Camera Selector Component
import { Video, ChevronDown } from 'lucide-react';
import type { CameraDevice } from '../utils/camera';

interface CameraSelectorProps {
  cameras: CameraDevice[];
  selectedCameraId: string | null;
  onSelectCamera: (deviceId: string) => void;
}

export const CameraSelector = ({ cameras, selectedCameraId, onSelectCamera }: CameraSelectorProps) => {
  if (cameras.length <= 1) return null;
  
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 bg-gray-800 rounded-xl border-3 border-gray-700 px-4 py-2">
        <Video className="text-blue-400" size={18} />
        <select
          value={selectedCameraId || ''}
          onChange={(e) => onSelectCamera(e.target.value)}
          className="bg-transparent text-white font-medium outline-none cursor-pointer appearance-none pr-6 min-w-[150px]"
        >
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId} className="bg-gray-800 text-white">
              {camera.label}
            </option>
          ))}
        </select>
        <ChevronDown className="text-gray-400 absolute right-3 pointer-events-none" size={16} />
      </div>
    </div>
  );
};
