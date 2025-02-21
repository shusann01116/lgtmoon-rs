"use client";

import { type DBSchema, type IDBPDatabase, openDB } from "idb";
import { useEffect, useState } from "react";

const DBConfig = {
	name: "lgtmoon",
	storeName: "lgtmoon",
	version: 1,
} as const;

export interface LGTMoonDB extends DBSchema {
	lgtmoon: {
		key: string;
		value: LGTMoonImage;
	};
}

export type LGTMoonImage = {
	id: string;
	name: string;
	buffer: ArrayBuffer;
	type: string;
	createdAt: Date;
};

export function getAllImages(db: IDBPDatabase<LGTMoonDB>) {
	return db.getAll(DBConfig.storeName);
}

export function addImage(db: IDBPDatabase<LGTMoonDB>, image: LGTMoonImage) {
	return db.add(DBConfig.storeName, image);
}

export function deleteImage(db: IDBPDatabase<LGTMoonDB>, id: string) {
	return db.delete(DBConfig.storeName, id);
}

export function useLGTMoonDB({
	onReady,
}: {
	onReady: (db: IDBPDatabase<LGTMoonDB>) => Promise<void>;
}) {
	const [db, setDB] = useState<IDBPDatabase<LGTMoonDB> | null>(null);
	useEffect(() => {
		const init = async () => {
			const db = await openDB<LGTMoonDB>(DBConfig.name, DBConfig.version, {
				upgrade(db) {
					db.createObjectStore(DBConfig.storeName, { keyPath: "id" });
				},
			});
			setDB(db);
			onReady(db);
		};
		init();
	}, [onReady]);

	return db;
}
