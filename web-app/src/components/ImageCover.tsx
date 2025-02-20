import { Button } from "@/components/ui/button";
import { useKeepUntilOnPointerLeave } from "@/hooks/useKeepUntilOnPointerLeave";
import { Check, Clipboard, Download } from "lucide-react";
import { useRef } from "react";

type ImageCoverProps = {
	children: React.ReactNode;
	onClickCopy?: () => void;
	onClickDownload?: () => void;
};

export function ImageCover({
	children,
	onClickCopy,
	onClickDownload,
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

	return (
		<div className="relative">
			<div className="group absolute inset-0 hover:bg-primary/50 transition-all rounded-sm">
				<div className="flex items-center justify-center h-full">
					<Button
						ref={copyButtonRef}
						className="group-hover:inline-flex hover:bg-accent/50 hidden transition-all active:bg-accent"
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
						className="group-hover:inline-flex hover:bg-accent/50 hidden transition-all active:bg-accent"
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
				</div>
			</div>
			{children}
		</div>
	);
}
