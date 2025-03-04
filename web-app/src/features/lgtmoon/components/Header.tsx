import { ImageUploadButton } from '@/features/lgtmoon/components/ImageUploadButton';
import Link from 'next/link';

interface HeaderProps {
  onAddImage: (file: File) => Promise<void>;
}

export const Header = ({ onAddImage }: HeaderProps) => {
  return (
    <section className="flex items-center gap-4 font-sans text-lg font-extrabold">
      <Link href="/">
        <h1>LGTMoon-rs</h1>
      </Link>
      <ImageUploadButton onAddImage={onAddImage} />
    </section>
  );
};
