import { openDB } from 'idb';


const init = async () => {
    const db = await openDB('a10', 1, {
        upgrade(db) {
            const store = db.createObjectStore('data', { keyPath: 'id' });
        },
    });
    return db;
};

const save = async <T>(data: T, dbName: string) => {
    const db = await init();
    const tx = db.transaction(dbName, 'readwrite');
    const store = tx.objectStore('myStore');
    await store.put(data);
    await tx.done;
}

const get = async (id: string, dbName: string) => {
    const db = await init();
    const tx = db.transaction(dbName, 'readonly');
    const store = tx.objectStore('myStore');
    return store.get(id);
}

export default { init, save, get }