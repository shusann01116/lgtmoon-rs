import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ImageCoverProps = {
  children: React.ReactNode;
  onClickCopy?: () => void;
};

export function ImageCover({ children, onClickCopy }: ImageCoverProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.addEventListener("pointerleave", () => {
      setIsCopied(false);
    });
  }, []);

  const onClickCopyInner = () => {
    if (!onClickCopy) return;
    onClickCopy();
    setIsCopied(true);
  };

  return (
    <div className="relative">
      <div className="group absolute inset-0 hover:bg-primary/50 transition-all rounded-sm">
        <div className="flex items-center justify-center h-full">
          <Button
            ref={buttonRef}
            className="group-hover:inline-flex hover:bg-accent/50 hidden transition-all active:bg-accent"
            size="icon"
            variant="ghost"
            onClick={onClickCopyInner}
          >
            {isCopied ? (
              <Check className="stroke-primary-foreground" />
            ) : (
              <Clipboard className="stroke-primary-foreground" />
            )}
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
