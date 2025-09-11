"use client";

import {
	type DBSchema,
	type IDBPDatabase,
	type IDBPTransaction,
	openDB,
} from "idb";
import { useEffect, useRef, useState } from "react";
import type { LocalImage } from "@/types/lgtm-image";

const dbConfig = {
	name: "lgtmoon",
	storeName: "lgtmoon",
	version: 2,
} as const;

export interface LgtMoonDb extends DBSchema {
	lgtmoon: {
		key: string;
		value: LocalImage;
	};
}

/** TODO: データアクセスレイヤーを抽象化する */
export function getAllImages(db: IDBPDatabase<LgtMoonDb>) {
	return db.getAll(dbConfig.storeName);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function addImage(db: IDBPDatabase<LgtMoonDb>, image: LocalImage) {
	return db.add(dbConfig.storeName, image);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function deleteImage(db: IDBPDatabase<LgtMoonDb>, id: string) {
	return db.delete(dbConfig.storeName, id);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function useLgtMoonDb({
	onReady,
}: {
	onReady: (db: IDBPDatabase<LgtMoonDb>) => Promise<void>;
}) {
	const dbLoaded = useRef(false);
	const [db, setDb] = useState<IDBPDatabase<LgtMoonDb> | null>(null);
	useEffect(() => {
		const init = async () => {
			if (dbLoaded.current) {
				return;
			}
			const db = await openDB<LgtMoonDb>(dbConfig.name, dbConfig.version, {
				upgrade(db, oldVersion, newVersion, transaction) {
					migrateDb(db, oldVersion, newVersion, transaction);
				},
			});
			setDb(db);
			dbLoaded.current = true;
			onReady(db);
		};
		init();
	}, [onReady]);

	return db;
}

function migrateDb(
	db: IDBPDatabase<LgtMoonDb>,
	oldVersion: number,
	newVersion: number | null,
	transaction: IDBPTransaction<
		LgtMoonDb,
		ArrayLike<"lgtmoon">,
		"versionchange"
	>,
) {
	if (newVersion === null) {
		return;
	}
	for (let i = oldVersion; i < newVersion; i++) {
		switch (i) {
			case 0:
				migrateDbV0ToV1(db);
				break;
			case 1:
				migrateDbV1ToV2(transaction);
				break;
			default:
				throw new Error("Failed to migrate db, Unknown version");
		}
	}
}

function migrateDbV0ToV1(db: IDBPDatabase<LgtMoonDb>) {
	db.createObjectStore(dbConfig.storeName, { keyPath: "id" });
}

async function migrateDbV1ToV2(
	transaction: IDBPTransaction<
		LgtMoonDb,
		ArrayLike<"lgtmoon">,
		"versionchange"
	>,
) {
	const store = transaction.objectStore("lgtmoon");
	const images = await store.getAll();
	for (const image of images) {
		image.storage = "local";
		await store.put(image);
	}
	await transaction.done;
}
