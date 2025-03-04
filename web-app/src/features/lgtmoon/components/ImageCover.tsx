import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useKeepUntilOnPointerLeave } from '@/hooks/useKeepUntilOnPointerLeave';
import { cn } from '@/utils/cn';
import { PopoverClose } from '@radix-ui/react-popover';
import {
  Check,
  CircleEllipsis,
  Clipboard,
  Download,
  Trash,
} from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

type ImageCoverProps = {
  children: React.ReactNode;
  className: string;
  onClickCopy: () => void;
  onClickDownload: () => void;
  onDelete: () => void;
};

export function ImageCover({
  children,
  className,
  onClickCopy,
  onClickDownload,
  onDelete,
}: ImageCoverProps) {
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [isCopied, onClickCopyButton] = useKeepUntilOnPointerLeave(
    copyButtonRef,
    onClickCopy,
  );

  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const [isDownloaded, onClickDownloadButton] = useKeepUntilOnPointerLeave(
    downloadButtonRef,
    onClickDownload,
  );

  const onClickCopyForUnHoverable = () => {
    onClickCopy();
    toast.success('Copied to clipboard');
  };

  return (
    <article className={cn('relative', className)}>
      <div className="group hover:bg-primary/50 absolute inset-0 rounded-sm transition-all">
        <div className="flex h-full items-center justify-center">
          <Button
            ref={copyButtonRef}
            className="hover:bg-accent/50 active:bg-accent hidden cursor-pointer transition-all group-hover:inline-flex"
            size="icon"
            variant="ghost"
            onClick={onClickCopyButton}
          >
            {isCopied ? (
              <Check className="stroke-primary-foreground" />
            ) : (
              <Clipboard className="stroke-primary-foreground" />
            )}
          </Button>
          <Button
            ref={downloadButtonRef}
            className="hover:bg-accent/50 active:bg-accent hidden cursor-pointer transition-all group-hover:inline-flex"
            size="icon"
            variant="ghost"
            onClick={onClickDownloadButton}
          >
            {isDownloaded ? (
              <Check className="stroke-primary-foreground" />
            ) : (
              <Download className="stroke-primary-foreground" />
            )}
          </Button>
          <Button
            className="hover:bg-accent/50 active:bg-accent hidden cursor-pointer transition-all group-hover:inline-flex"
            size="icon"
            variant="ghost"
            onClick={onDelete}
          >
            <Trash className="stroke-primary-foreground" />
          </Button>
        </div>
      </div>
      <button
        type="button"
        className="group absolute [@media(any-hover:none)]:inset-0"
        onClick={onClickCopyForUnHoverable}
        title="Copy"
      />
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            title="Image menu"
            className="absolute right-0 bottom-0 p-3 [@media(any-hover:hover)]:hidden"
          >
            <CircleEllipsis className="stroke-primary-foreground/80 rounded-full backdrop-brightness-75" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="flex w-full flex-col items-start p-2"
        >
          <PopoverClose asChild>
            <Button variant="ghost" size="sm" onClick={onClickDownloadButton}>
              <Download className="size-4" />
              <p className="text-sm">Download</p>
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash className="size-4" color="var(--destructive)" />
              <p className="text-destructive text-sm">Delete</p>
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
      {children}
    </article>
  );
}
