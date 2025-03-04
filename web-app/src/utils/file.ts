export function getFileName(fileName: string) {
  return fileName.split('.')[0];
}

export function getFileExtension(fileName: string) {
  return fileName.split('.').pop();
}
