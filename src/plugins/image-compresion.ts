import imageCompression from 'browser-image-compression';
import { isHeic, heicTo } from "heic-to"


export const compressImages = async (file: File) => {
    let newFile = file;

    if (await isHeic(file)) {
        const jpeg = await heicTo({
            blob: file,
            type: "image/jpeg",
            quality: 0.95
        });
        newFile = new File([jpeg], file.name.replace(/\.heic$/i, '.jpg'), {
            type: "image/jpeg",
            lastModified: Date.now(),
        });
    }

    const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 5000,
        useWebWorker: true,
    };

    try {
        const compressedBlob = await imageCompression(newFile, options);
        return new File([compressedBlob], file.name, {
            type: newFile.type,
            lastModified: newFile.lastModified,
        });
    } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        throw error;
    }
};