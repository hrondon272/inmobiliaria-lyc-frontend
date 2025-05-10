import { HTTP } from "../plugins/axios"

export const registrar = async (formData: object) => {
    return await HTTP.post('/inmuebles', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const listar = async (filters: object|null, page: number, perPage: number) => {
    return await HTTP.get('/inmuebles', {
        params: { 
            page,
            perPage,
            ...filters
        }
    })
}

export const actualizar = async (form: object, id: string) => {
    return await HTTP.put(`/inmuebles/${id}`, form)
}

export const eliminar = async (id: string) => {
    return await HTTP.delete(`/inmuebles/${id}`)
}

export const buscar = async (id: string) => {
    return await HTTP.get(`/inmuebles/${id}`)
}

export const buscarFotos = async (id: string) => {
    return await HTTP.get(`/list-photos-inmueble/${id}`)
}

export const agregarFotos = async (formData: object, idInmueble: string) => {
    return await HTTP.post(`/add-photos-inmuebles/${idInmueble}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const eliminarFoto = async (id: string) => {
    return await HTTP.delete(`/inmuebles-photos/${id}`)
}

export const buscarVideos = async (id: string) => {
    return await HTTP.get(`/list-videos-inmueble/${id}`)
}

export const agregarVideos = async (formData: object, idInmueble: string) => {
    return await HTTP.post(`/add-videos-inmuebles/${idInmueble}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const eliminarVideo = async (id: string) => {
    return await HTTP.delete(`/inmuebles-videos/${id}`)
}