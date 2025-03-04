'use client'

import { useEffect } from 'react'

export function useOnPaste(onPaste: (e: ClipboardEvent) => void) {
	useEffect(() => {
		const handlePaste = (e: ClipboardEvent) => {
			e.preventDefault()
			onPaste(e)
		}
		window.addEventListener('paste', handlePaste)
		return () => {
			window.removeEventListener('paste', handlePaste)
		}
	}, [onPaste])
}
