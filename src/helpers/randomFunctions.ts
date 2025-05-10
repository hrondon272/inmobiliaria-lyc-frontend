import type{ Inmueble } from '@/interfaces/types'

const resolveURLFiles = (urlFile: string) => {
    return `${import.meta.env.VITE_ASSET_URL}/${urlFile}`;
}

const getFotoPrincipal = (inmueble: Inmueble) => {
    if (!inmueble?.fotos?.length) return null;
    const portada = inmueble.fotos.find(foto => foto.esPortada) ?? inmueble.fotos[0];
    return resolveURLFiles(portada.urlFoto);
};

const getPrecio = (precio: number) => {
  return precio.toLocaleString('es-CL',
      {
          maximumFractionDigits: 0
      });
}

export {
    getFotoPrincipal,
    getPrecio,
    resolveURLFiles
}