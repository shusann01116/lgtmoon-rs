'use client';

import { type DBSchema, type IDBPDatabase, openDB } from 'idb';
import { useEffect, useRef, useState } from 'react';

const DBConfig = {
  name: 'lgtmoon',
  storeName: 'lgtmoon',
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

/** TODO: データアクセスレイヤーを抽象化する */
export function getAllImages(db: IDBPDatabase<LGTMoonDB>) {
  return db.getAll(DBConfig.storeName);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function addImage(db: IDBPDatabase<LGTMoonDB>, image: LGTMoonImage) {
  return db.add(DBConfig.storeName, image);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function deleteImage(db: IDBPDatabase<LGTMoonDB>, id: string) {
  return db.delete(DBConfig.storeName, id);
}

/** TODO: データアクセスレイヤーを抽象化する */
export function useLGTMoonDB({
  onReady,
}: {
  onReady: (db: IDBPDatabase<LGTMoonDB>) => Promise<void>;
}) {
  const dbLoaded = useRef(false);
  const [db, setDB] = useState<IDBPDatabase<LGTMoonDB> | null>(null);
  useEffect(() => {
    const init = async () => {
      if (dbLoaded.current) return;
      const db = await openDB<LGTMoonDB>(DBConfig.name, DBConfig.version, {
        upgrade(db) {
          db.createObjectStore(DBConfig.storeName, { keyPath: 'id' });
        },
      });
      setDB(db);
      dbLoaded.current = true;
      onReady(db);
    };
    init();
  }, [onReady]);

  return db;
}
