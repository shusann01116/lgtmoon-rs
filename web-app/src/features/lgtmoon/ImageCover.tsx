import { Button } from "@/components/ui/button";
import { useKeepUntilOnPointerLeave } from "@/hooks/useKeepUntilOnPointerLeave";
import { cn } from "@/utils/cn";
import { Check, Clipboard, Download, Trash } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

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
		toast.success("Copied to clipboard");
	};

	return (
		<div className={cn("relative", className)}>
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
					<Button
						className="group-hover:inline-flex hover:bg-accent/50 hidden transition-all active:bg-accent"
						size="icon"
						variant="ghost"
						onClick={() => onDelete?.()}
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
			{children}
		</div>
	);
}
