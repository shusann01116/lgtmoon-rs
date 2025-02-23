import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { type ChangeEvent, type ReactNode, useRef } from "react";

type FileInputButtonProps = {
	className?: string;
	icon: ReactNode;
	accept: string;
	onClick: (e: ChangeEvent<HTMLInputElement>) => void;
	variant?: "default" | "outline" | "ghost" | "link";
};

export function FileInputButton({
	className,
	icon,
	accept,
	onClick,
	variant,
}: FileInputButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<input
				aria-label="Image file selector"
				ref={inputRef}
				type="file"
				accept={accept}
				className="hidden"
				onChange={onClick}
			/>
			<Button
				variant={variant}
				size="icon"
				onClick={() => inputRef.current?.click()}
				className={cn("cursor-pointer", className)}
			>
				{icon}
			</Button>
		</>
	);
}
