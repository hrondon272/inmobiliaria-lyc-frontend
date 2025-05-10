import imageCompression from 'browser-image-compression';

export const compressImages = async (file: File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
    };

    try {
        const compressedBlob = await imageCompression(file, options);
        return new File([compressedBlob], file.name, {
            type: file.type,
            lastModified: Date.now(),
        });
    } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        throw error;
    }
};