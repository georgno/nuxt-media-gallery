import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

interface Media {
    id: number;
    title: string;
    alt: string;
    path: string;
}

export const mediaHandler = () => {
    const storage = createStorage({
        driver: indexedDbDriver({ base: "media:" }),
    });

    const create = async (data: Media) => {
        const key = await getNextKey();
        await storage.setItem(key.toString(), data);
    };

    const deleteItem = async (key: string) => {
        console.log('delete', key);
        await storage.remove(key.toString());
    }

    const getMedia = async (key: string): Promise<Media | null> => {
        const fullKey = key.startsWith('media:') ? key : `media:${key}`;
        return await storage.getItem(fullKey);
    };

    const getAllMedias = async (): Promise<Media[]> => {
        const keys = await storage.getKeys();
        console.log(keys);
        const medias: Media[] = [];
        for (let key of keys) {
            key = key.replace('media:', '');

            const media = await storage.getItem<Media>(key);
            console.log(media, key);
            if (media) {
                medias.push(media);
            }
        }

        console.log(medias);
        return medias;
    };

    const getMediaCount = async (): Promise<number> => {
        const keys = await storage.getKeys();
        return keys.length;
    };

    const getNextKey = async (): Promise<number> => {
        const count = await storage.getKeys();
        return count.length + 1;
    };

    return {
        create,
        deleteItem,
        getMedia,
        getAllMedias,
        getMediaCount,
        getNextKey,
    };
};