import { defineStore } from 'pinia';
import {
    updateColors,
    updateProfile,
    updatePassword,
    sendContactMail
} from '../services/usuario.service';
import { useAuthStore } from './auth';
import type { 
    CompanyStructure,
    formPasswordType,
    contactFormType
} from '@/interfaces/types';

export const useUsuarioStore = defineStore('usuario', {
    actions: {
        async updateProfile(form: any) {

            const formData = new FormData();
            formData.append("nombre", form.nombre)
            formData.append("email", form.email)
            formData.append("compania", form.compania)
            formData.append("telefono", form.telefono)
            formData.append("redes_sociales", JSON.stringify(form.redes_sociales))
            formData.append("logo", form.logo)
            
            const { status, data } = await updateProfile(formData);
            if (status === 200) {
                const authStore = useAuthStore();
                form.urlLogo = data.data.urlLogo;
                authStore.updateCompanyInfo(form);
            }
            return { status, data };
        },
        async updateColors(form: CompanyStructure) {
            const { status } = await updateColors(form);
            if (status === 200) {
                const authStore = useAuthStore();
                authStore.updateCompanyColors(form);
            }
            return status;
        },
        async updatePassword(formPassword: formPasswordType) {
            const { status } = await updatePassword(formPassword);
            return status;
        },
        async sendContactMail(form: contactFormType) {
            const { status } = await sendContactMail(form);
            return status;
        }
    }
})