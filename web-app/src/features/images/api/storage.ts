'use client'

import type { LocalImage } from '@/types/lgtm-image'
import { type DBSchema, type IDBPDatabase, openDB } from 'idb'
import { useEffect, useRef, useState } from 'react'

const dbConfig = {
	name: 'lgtmoon',
	storeName: 'lgtmoon',
	version: 1,
} as const

export interface LgtMoonDb extends DBSchema {
	lgtmoon: {
		key: string
		value: LocalImage
	}
}

/** TODO: データアクセスレイヤーを抽象化する */
export function getAllImages(db: IDBPDatabase<LgtMoonDb>) {
	return db.getAll(dbConfig.storeName)
}

/** TODO: データアクセスレイヤーを抽象化する */
export function addImage(db: IDBPDatabase<LgtMoonDb>, image: LocalImage) {
	return db.add(dbConfig.storeName, image)
}

/** TODO: データアクセスレイヤーを抽象化する */
export function deleteImage(db: IDBPDatabase<LgtMoonDb>, id: string) {
	return db.delete(dbConfig.storeName, id)
}

/** TODO: データアクセスレイヤーを抽象化する */
export function useLgtMoonDb({
	onReady,
}: {
	onReady: (db: IDBPDatabase<LgtMoonDb>) => Promise<void>
}) {
	const dbLoaded = useRef(false)
	const [db, setDb] = useState<IDBPDatabase<LgtMoonDb> | null>(null)
	useEffect(() => {
		const init = async () => {
			if (dbLoaded.current) {
				return
			}
			const db = await openDB<LgtMoonDb>(dbConfig.name, dbConfig.version, {
				upgrade(db) {
					db.createObjectStore(dbConfig.storeName, { keyPath: 'id' })
				},
			})
			setDb(db)
			dbLoaded.current = true
			onReady(db)
		}
		init()
	}, [onReady])

	return db
}
