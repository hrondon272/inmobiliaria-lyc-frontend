import { defineStore } from 'pinia'
import type { Inmueble } from '../interfaces/types'
import {
    registrar,
    listar,
    actualizar,
    eliminar,
    buscar,
    buscarFotos,
    buscarVideos,
    agregarFotos,
    eliminarFoto,
    agregarVideos,
    eliminarVideo
} from '../services/inmueble.service';

export type IMainStore = {
    inmuebles: Inmueble[];
    total: number;
    page: number;
};

export const useInmuebleStore = defineStore('mainstore', {
    state: (): IMainStore => ({
        inmuebles: [],
        total: 0,
        page: 1
    }),
    getters: {
        lista(state) {
            return state.inmuebles;
        },
        totalInmuebles(state) {
            return state.total;
        },
        currentPage(state) {
            return state.page;
        }
    },
    actions: {
        async fetchInmuebles(filters: object | null = {}, page: number = 1, perPage: number = 10) {
            const { data, status } = await listar(filters, page, perPage);

            if (status === 200) {
                this.inmuebles = data.data;
                this.total = data.total;
                this.page = data.page;
            }
            return status;
        },
        async registrar(form: any) {
            const precioNegociable = form.precioNegociable ? '1' : '0';

            const formData = new FormData();
            formData.append("nombre", form.nombre)
            formData.append("areaMetrosCuadrados", form.areaMetrosCuadrados)
            formData.append("autor", form.autor)
            formData.append("cantidadBanos", form.cantidadBanos)
            formData.append("cantidadDormitorios", form.cantidadDormitorios)
            formData.append("caracteristicas", form.caracteristicas)
            formData.append('coordenadas[latitud]', form.coordenadas.latitud);
            formData.append('coordenadas[longitud]', form.coordenadas.longitud);
            formData.append("descripcion", form.descripcion)
            formData.append("direccion", form.direccion)
            formData.append("precio", form.precio)
            formData.append("precioNegociable", precioNegociable);
            formData.append("tipoOperacion", form.tipoOperacion)
            formData.append("idCiudad", form.idCiudad)
            formData.append("idTipo", form.idTipo)


            form.fotos.forEach((item: any, index: number) => {
                if (item.foto instanceof File) {
                    const esPortada = item.esPortada ? '1' : '0';
                    formData.append(`fotos[${index}][foto]`, item.foto);
                    formData.append(`fotos[${index}][esPortada]`, esPortada);
                }
            });

            form.videos.forEach((item: any, index: number) => {
                if (item instanceof File) {
                    formData.append(`videos[${index}]`, item);
                }
            });

            const { status } = await registrar(formData);
            return status;
        },
        async buscar(id: string) {
            return await buscar(id);
        },
        async actualizar(form: any, id: string) {
            form.fotos = form.fotos.filter((item: { foto: File }) => item.foto instanceof File);
            form.videos = form.videos.filter((item: { foto: File }) => item instanceof File);

            const { status, data } = await actualizar(form, id);
            if (status === 200) {
                const index = this.inmuebles.findIndex(inmueble => inmueble.id === id);
                if (index !== -1) {
                    this.inmuebles[index] = {
                        ...this.inmuebles[index],
                        ...data.data
                    };
                }
            }
            return status;
        },
        async eliminar(id: string) {
            const { status } = await eliminar(id);
            if (status === 204) {
                this.inmuebles = this.inmuebles.filter(inmueble => inmueble.id !== id);
                this.total = this.total > 0 ? this.total - 1 : 0;
            }
            return status;
        },
        async buscarFotos(id: string) {
            return await buscarFotos(id);
        },
        async agregarFotos(form: any, idInmueble: string) {
            const formData = new FormData();
            form.fotos.forEach((item: any, index: number) => {
                const esPortada = item.esPortada ? '1' : '0';
                formData.append(`fotos[${index}][foto]`, item.foto);
                formData.append(`fotos[${index}][esPortada]`, esPortada);
            });
            const response = await agregarFotos(formData, idInmueble);

            if (response.status === 200) {
                const index = this.inmuebles.findIndex(inmueble => inmueble.id === idInmueble);
                const fotoNuevaPortada = response.data.data.find((foto: any) => foto.esPortada);
                if (index !== -1 && fotoNuevaPortada) {
                    this.inmuebles[index]?.fotos?.forEach(foto => {
                        if (foto.esPortada) foto.esPortada = false;
                    });
                    this.inmuebles[index]?.fotos?.push({
                        esPortada: fotoNuevaPortada.esPortada,
                        idInmueble: fotoNuevaPortada.idInmueble,
                        urlFoto: fotoNuevaPortada.urlFoto
                    });
                }
            }
            return response;
        },
        async eliminarFoto(id: string) {
            return await eliminarFoto(id);
        },
        async buscarVideos(id: string) {
            return await buscarVideos(id);
        },
        async agregarVideos(form: any, idInmueble: string) {
            const formData = new FormData();
            form.videos.forEach((item: any, index: number) => {
                formData.append(`videos[${index}]`, item);
            });
            const response = await agregarVideos(formData, idInmueble);
            const { data: videoNuevo, status } = response;

            if (status === 200) {
                const index = this.inmuebles.findIndex(inmueble => inmueble.id === idInmueble);
                if (index !== -1) {
                    this.inmuebles[index]?.videos?.push({
                        id: videoNuevo.id,
                        idInmueble: videoNuevo.idInmueble,
                        urlVideo: videoNuevo.urlFoto
                    });
                }
            }
            return response;
        },
        async eliminarVideo(id: string) {
            return await eliminarVideo(id);
        },
    }
})