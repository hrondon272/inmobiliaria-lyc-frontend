export interface CompanyStructure {
    urlLogo: string;
    colorPrimario: string;
    colorSecundario: string;
    colorTerciario: string;
    compania: string;
    email: string;
    nombre: string;
    telefono: string;
    redes_sociales: {
        [key: string]: SocialNetwork
    }
    ciudades: string[];
    tipos_inmuebles: string[];
    logo: File
}

export interface SocialNetwork {
    icono: string;
    link: string;
    nombre: string;
    color: string;
}

export interface loginDataForm {
    email: string,
    password: string
}

export interface Inmueble {
    id: string;
    nombre: string;
    ciudad: {
        descripcion: string
    };
    precio: string;
    disponible: boolean;
    urlImagen: string;
    latitud: number;
    longitud: number;
    fotos?: Array<{
        esPortada: boolean,
        idInmueble: string,
        urlFoto: string
    }>;
    cantidadDormitorios?: number,
    cantidadBanos?: number,
    descripcion?: string,
    caracteristicas?: string,
    areaMetrosCuadrados?: string,
    coordenadas?: { 
        latitud: number, 
        longitud: number
    },
    videos: FormVideosInmueble
}

export interface formPasswordType {
    currentPassword: string,
    newPassword: string
}

export interface contactFormType {
    nombre: string,
    email: string,
    telefono: string,
    descripcion: string
}

export interface FormInmueble {
    id?: string;
    nombre: string;
    autor: string;
    cantidadDormitorios: number,
    cantidadBanos: number,
    direccion: string,
    areaMetrosCuadrados: string,
    caracteristicas: string,
    descripcion: string,
    precio: number,
    precioNegociable: false,
    coordenadas: { 
        latitud: number, 
        longitud: number
    },
    idTipo: boolean | null,
    idCiudad: boolean | null,
    fotos: FotoInmueble[],
    disponible: false,
    videos?: VideoInmueble[]
}

export interface FotoInmueble {
    foto: File;
    esPortada: boolean;
}
export interface FormFotosInmueble {
    fotos: {
        id: string,
        urlFoto: string,
        esPortada: boolean
    }[];
}

export type FormVideosInmueble = VideoInmueble[];

export interface VideoInmueble {
    id: string,
    idInmueble: string,
    urlVideo: string,
}

export interface filtrosAvanzadosType{
    precioDesde: null|number,
    precioHasta: null|number,
    dormitorios: null|number,
    banos: null|number,
    area: null|string,
    caracteristicasEspeciales: null|string
}