import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

export type Media = {
    id: number;
    title: string;
    alt: string;
    path: string;
};

export const mediaHandler = () => {
    const storage = createStorage({
        driver: indexedDbDriver({ base: "media:" }),
    });

    const getCurrentCounter = async (): Promise<number> => {
        const counter = await storage.getItem('global:counter');
        return counter ? Number(counter) : 0;
    };

    const incrementCounter = async (): Promise<number> => {
        const current = await getCurrentCounter();
        const next = current + 1;
        await storage.setItem('global:counter', next);
        return next;
    };

    const create = async (data: Media) => {
        console.log('mediaHandler create')
        const key = await incrementCounter();
        await storage.setItem(key.toString(), data);
        return data;
    };

    const deleteItem = async (key: string) => {
        console.log('delete', key);
        await storage.remove(key.toString());
    }

    const getMedia = async (key: string): Promise<Media | null> => {
        const fullKey = key.startsWith('media:') ? key : `media:${key}`;
        let items = await storage.getItem(fullKey);

        console.log("items", items);
        return items;
    };

    const getAllMedias = async (): Promise<Media[]> => {
        const keys = await storage.getKeys();
        console.log(keys);
        const medias: Media[] = [];
        for (let key of keys) {
            console.log(key);
            if (key === 'media:global:counter') continue;
            
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
        return keys.filter(key => key !== 'global:counter').length;
    };

    const getNextKey = async (): Promise<number> => {
        const next = await getCurrentCounter() + 1;
        return next;
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