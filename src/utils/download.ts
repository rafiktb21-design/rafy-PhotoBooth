// MOLYZ BOOTH - Download Utilities

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadPhotoStrip = (blob: Blob, frameName: string): void => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  const filename = `molyz-${frameName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.png`;
  downloadBlob(blob, filename);
};

export const generateTimestamp = (): string => {
  return new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
};
