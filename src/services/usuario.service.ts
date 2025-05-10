import { HTTP } from "../plugins/axios"
import type { formPasswordType } from '@/interfaces/types';

export const updateColors = async (form: object) => {
    return await HTTP.post('/update-colors', form)
}

export const updateProfile = async (formData: object) => {
    return await HTTP.post('/update-company-info', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updatePassword = async (formPassword: formPasswordType) => {
    return await HTTP.post('/update-password', formPassword)
}

export const sendContactMail = async (form: object) => {
    return await HTTP.post('/contact-mail', form)
}