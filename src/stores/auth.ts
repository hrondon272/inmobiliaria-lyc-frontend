import { defineStore } from 'pinia';
import type {
    CompanyStructure
} from '@/interfaces/types';
import {
    login,
    getCompanyInfo,
    logout,
    setCookie,
    deleteCookie
} from '../services/auth.service';
import type { loginDataForm } from '@/interfaces/types';

interface State {
    company: CompanyStructure | null,
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): State => ({
        company: null,
        isAuthenticated: false,
    }),
    getters: {
        getCompanyData: (state) => state.company,
    },
    actions: {
        init() {
            const storedAuth = sessionStorage.getItem('isAuthenticated');
            if (storedAuth === 'true') this.isAuthenticated = true;
        },
        async login({ email, password }: loginDataForm) {
            try {
                const res = await login(email, password);

                if (res?.status === 200) {
                    this.isAuthenticated = true;
                    sessionStorage.setItem('isAuthenticated', 'true');
                    setCookie("token", res.data.token, res.data.expires_in)
                }
                return res?.status;
            } catch (error) {
                console.error('Login failed:', error);
                return null;
            }
        },
        async fetchCompany() {
            const { data, status } = await getCompanyInfo();
            if (status == 200) this.company = data.data;
        },
        async logout() {
            await logout();
            this.company = null;
            this.isAuthenticated = false;
            localStorage.clear();
            sessionStorage.clear();
            deleteCookie("token");
            location.href = '/';
        },
        async updateCompanyColors({ colorPrimario, colorSecundario, colorTerciario }: CompanyStructure) {
            if (this.company) {
                this.company.colorPrimario = colorPrimario;
                this.company.colorSecundario = colorSecundario;
                this.company.colorTerciario = colorTerciario;
            }
        },
        async updateCompanyInfo({ nombre, email, compania, direccion, telefono, redes_sociales, urlLogo }: CompanyStructure) {
            if (this.company) {
                this.company.nombre = nombre;
                this.company.email = email;
                this.company.compania = compania;
                this.company.direccion = direccion;
                this.company.telefono = telefono;
                this.company.redes_sociales = redes_sociales;
                this.company.urlLogo = urlLogo;
            }
        },
    }
})