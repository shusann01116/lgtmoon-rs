import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useKeepUntilOnPointerLeave } from "@/hooks/useKeepUntilOnPointerLeave";
import { cn } from "@/utils/cn";
import { PopoverClose } from "@radix-ui/react-popover";
import {
	Check,
	CircleEllipsis,
	Clipboard,
	Download,
	Trash,
} from "lucide-react";
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
		<article className={cn("relative", className)}>
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
					<Button
						asChild
						variant="ghost"
						size="icon"
						className="absolute stroke-primary-foreground/80 size-11 p-3 right-0 bottom-0 [@media(any-hover:hover)]:hidden"
					>
						<CircleEllipsis />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side="bottom"
					align="end"
					className="w-full p-2 flex flex-col items-start"
				>
					<PopoverClose asChild>
						<Button
							variant="ghost"
							size="sm"
							onClick={onClickDownloadButton}
						>
							<Download
								className="size-4"
							/>
							<p className="text-sm">Download</p>
						</Button>
					</PopoverClose>
					<PopoverClose asChild>
						<Button
							variant="ghost"
							size="sm"
							onClick={onDelete}
						>
							<Trash
								className="size-4"
								color="hsl(var(--destructive))"
							/>
							<p className="text-sm text-destructive">Delete</p>
						</Button>
					</PopoverClose>
				</PopoverContent>
			</Popover>
			{children}
		</article>
	);
}
