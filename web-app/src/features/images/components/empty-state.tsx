export const EmptyState = () => {
	return (
		<>
			<section className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-center font-light text-sm/loose">
				<p>
					画像を追加して LGTM
					<br className="block sm:hidden" />
					ライブラリを作ろう ☺️
				</p>
				<p>
					<kbd className="pointer-events-none mr-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
						<span className="text-xs">⌘</span>V
					</kbd>
					でクリップボードから貼り付けられるよ 🫶
				</p>
			</section>
		</>
	)
}
