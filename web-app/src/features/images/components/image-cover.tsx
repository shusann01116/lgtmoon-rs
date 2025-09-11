import { PopoverClose } from "@radix-ui/react-popover";
import {
	Check,
	CircleEllipsis,
	Clipboard,
	Download,
	Link,
	Loader2,
	Trash,
	Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKeepUntilOnPointerLeave } from "@/hooks/use-keep-until-on-pointer-leave";
import { cn } from "@/utils/cn";

type ImageCoverProps = {
	children: React.ReactNode;
	className: string;
	onUpload?: () => void;
	onClickCopyMdLink?: () => void;
	onClickCopy?: () => void;
	onClickDownload?: () => void;
	onDelete?: () => Promise<void>;
};

export function ImageCover({
	children,
	className,
	onUpload,
	onClickCopyMdLink,
	onClickCopy,
	onClickDownload,
	onDelete,
}: ImageCoverProps) {
	const uploadButtonRef = useRef<HTMLButtonElement>(null);
	const [isUploaded, onClickUploadButton] = useKeepUntilOnPointerLeave(
		uploadButtonRef,
		onUpload,
	);

	const copyMdLinkButtonRef = useRef<HTMLButtonElement>(null);
	const [isCopiedMdLink, onClickCopyMdLinkButton] = useKeepUntilOnPointerLeave(
		copyMdLinkButtonRef,
		onClickCopyMdLink,
	);

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

	const [isDeleting, setIsDeleting] = useState(false);
	const onClickDeleteButton = useCallback(async () => {
		setIsDeleting(true);
		await onDelete?.();
		setIsDeleting(false);
	}, [onDelete]);

	const onClickCopyForUnHoverable = useCallback(() => {
		onClickCopy?.();
		toast.success("Copied to clipboard");
	}, [onClickCopy]);

	return (
		<article className={cn("relative", className)}>
			<div className="group absolute inset-0 rounded-sm transition-all hover:bg-primary/50">
				<div className="flex h-full items-center justify-center transition-all">
					<Tooltip delayDuration={700}>
						<TooltipTrigger asChild>
							<Button
								ref={uploadButtonRef}
								className={cn(
									"hidden cursor-pointer transition-all hover:bg-accent/50 active:bg-accent group-hover:inline-flex",
									onUpload ? "" : "group-hover:hidden",
								)}
								size="icon"
								variant="ghost"
								onClick={onClickUploadButton}
							>
								{isUploaded ? (
									<Check className="stroke-primary-foreground" />
								) : (
									<Upload className="stroke-primary-foreground" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<div className="flex items-center gap-2">
								<p>Upload</p>
							</div>
						</TooltipContent>
					</Tooltip>
					<Tooltip delayDuration={700}>
						<TooltipTrigger asChild>
							<Button
								ref={copyMdLinkButtonRef}
								className={cn(
									"hidden cursor-pointer transition-all hover:bg-accent/50 active:bg-accent group-hover:inline-flex",
									onClickCopyMdLink ? "" : "group-hover:hidden",
								)}
								size="icon"
								variant="ghost"
								onClick={onClickCopyMdLinkButton}
							>
								{isCopiedMdLink ? (
									<Check className="stroke-primary-foreground" />
								) : (
									<Link className="stroke-primary-foreground" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<div className="flex items-center gap-2">
								<p>Copy md link to clipboard</p>
							</div>
						</TooltipContent>
					</Tooltip>
					<Tooltip delayDuration={700}>
						<TooltipTrigger asChild>
							<Button
								ref={copyButtonRef}
								className={cn(
									"hidden cursor-pointer transition-all hover:bg-accent/50 active:bg-accent group-hover:inline-flex",
									onClickCopy ? "" : "group-hover:hidden",
								)}
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
						</TooltipTrigger>
						<TooltipContent>
							<div className="flex items-center gap-2">
								<p>Copy to clipboard</p>
							</div>
						</TooltipContent>
					</Tooltip>
					<Tooltip delayDuration={700}>
						<TooltipTrigger asChild>
							<Button
								ref={downloadButtonRef}
								className={cn(
									"hidden cursor-pointer transition-all hover:bg-accent/50 active:bg-accent group-hover:inline-flex",
									onClickDownload ? "" : "group-hover:hidden",
								)}
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
						</TooltipTrigger>
						<TooltipContent>
							<div className="flex items-center gap-2">
								<p>Download</p>
							</div>
						</TooltipContent>
					</Tooltip>
					<Tooltip delayDuration={700}>
						<Dialog>
							<DialogTrigger asChild>
								<TooltipTrigger asChild>
									<Button
										className={cn(
											"hidden cursor-pointer transition-all hover:bg-accent/50 active:bg-accent group-hover:inline-flex",
											onDelete ? "" : "group-hover:hidden",
										)}
										size="icon"
										variant="ghost"
									>
										<Trash className="stroke-primary-foreground" />
									</Button>
								</TooltipTrigger>
							</DialogTrigger>
							<DialogContent>
								<DialogTitle>Delete Image</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete this image?
								</DialogDescription>
								<DialogFooter>
									<div className="flex flex-row-reverse gap-2">
										<Button
											className="cursor-pointer align-middle"
											variant="destructive"
											onClick={onClickDeleteButton}
											onKeyDown={async (event) => {
												if (event.key === "Enter") {
													await onClickDeleteButton();
												}
											}}
										>
											<span>Delete</span>
											<span className="size-4">
												{isDeleting ? (
													<Loader2 className="animate-spin" />
												) : (
													"↵"
												)}
											</span>
										</Button>
										<DialogClose asChild>
											<Button className="cursor-pointer" variant="outline">
												Cancel
											</Button>
										</DialogClose>
									</div>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<TooltipContent>
							<div className="flex items-center gap-2">
								<p>Delete</p>
							</div>
						</TooltipContent>
					</Tooltip>
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
						<CircleEllipsis className="rounded-full stroke-primary-foreground/80 backdrop-brightness-75" />
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
