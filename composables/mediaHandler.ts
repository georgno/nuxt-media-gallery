// create media type
export type Media = {
    id: number;
    title: string;
    subtitle: string;
    path: string;
    file?: File | null;
}


export const mediaHandler = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const create = async (data: Media) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('subtitle', data.subtitle);
            if (data.file) {
                formData.append('file', data.file);
            }

            const response = await fetch(`${baseURL}/api/v1/media/sigo-upload`, {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error('Failed to create media');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating media:', error);
            throw error;
        }
    };

    const deleteItem = async (key: string) => {
        try {
            let formData = new FormData();
            formData.append('id', key);
            const response = await fetch(`${baseURL}/api/v1/media/sigo-delete`, {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete media');
            }
        } catch (error) {
            console.error('Error deleting media:', error);
            throw error;
        }
    }

    const getMedia = async (key: string): Promise<Media | null> => {
        try {
            const response = await fetch(`${baseURL}/api/v1/media/sigo/${key}`, {
                headers: defaultHeaders,
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch media');
            }

            let output = await response.json()
            console.log(output)
            
            return output;
        } catch (error) {
            console.error('Error fetching media:', error);
            return null;
        }
    };

    const getAllMedias = async (): Promise<Media[]> => {
        try {
            const response = await fetch(`${baseURL}/api/v1/media/sigo`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch all media');
            }

            let output = await response.json()
            console.log(output)
            
            return output;
        } catch (error) {
            console.error('Error fetching all media:', error);
            return [];
        }
    };

    const getMediaCount = async (): Promise<number> => {
        const medias = await getAllMedias();
        return medias.length;
    };

    const getNextKey = async (): Promise<number> => {
        const medias = await getAllMedias();
        const maxId = Math.max(...medias.map(media => media.id), 0);
        return maxId + 1;
    };

    const updateInfo = async (id: string | number, data: { id: number, title?: string, subtitle?: string }) => {
        try {
            const response = await fetch(`${baseURL}/api/v1/media/sigo-update-info`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update media info');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating media info:', error);
            throw error;
        }
    };

    return {
        create,
        deleteItem,
        getMedia,
        getAllMedias,
        getMediaCount,
        getNextKey,
        updateInfo,
    };
};