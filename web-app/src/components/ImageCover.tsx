import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";

type ImageCoverProps = {
  children: React.ReactNode;
  onClickCopy?: () => void;
}

export function ImageCover({ children, onClickCopy }: ImageCoverProps) {
  return (
    <div className="relative">
      <div className="group absolute inset-0 hover:bg-primary/50 transition-all rounded-sm">
        <div className="flex items-center justify-center h-full">
          <Button className="group-hover:inline-flex hover:bg-accent/50 hidden transition-all" size="icon" variant="ghost" onClick={onClickCopy}>
            <Clipboard className="stroke-primary-foreground" />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
