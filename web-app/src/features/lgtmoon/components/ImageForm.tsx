'use client';

import { EmptyState } from '@/features/lgtmoon/components/EmptyState';
import { Header } from '@/features/lgtmoon/components/Header';
import { ImageGallery } from '@/features/lgtmoon/components/ImageGallery';
import { useImageStorage } from '@/features/lgtmoon/hooks/useImageStorage';
import { useOnPaste } from '@/hooks/useUploadFromClipBoard';
import { toast } from 'sonner';

export function ImageForm() {
  const { images, handleAddImage, handleDeleteImage } = useImageStorage();

  useOnPaste(async (e: ClipboardEvent) => {
    const files = e.clipboardData?.files;
    if (!files) return;
    for (const file of files) {
      void handleAddImage(file);
    }
  });

  const onAddImage = async (file: File) => {
    if (images?.some((image) => image.name === file.name)) {
      toast.error('Image already exists');
      return;
    }
    void handleAddImage(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <Header onAddImage={onAddImage} />
      {images && images.length < 1 ? (
        <EmptyState />
      ) : (
        <ImageGallery images={images || []} onDelete={handleDeleteImage} />
      )}
    </div>
  );
}
