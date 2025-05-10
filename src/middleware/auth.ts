import { useAuthStore } from '@/stores/auth';

export const AuthMiddleware = async (to: any, from: any, next: any) => {
    const authStore = useAuthStore();

    if (sessionStorage.getItem('sessionExpired') === 'true') {
        sessionStorage.removeItem('sessionExpired');
        sessionStorage.removeItem('isAuthenticated');
        authStore.isAuthenticated = false;
        next('/');
    }

    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        if (authStore.isAuthenticated) {
            next();
        } else {
            next('/');
        }
    } else {
        next();
    }
}