import { useToast as primeUseToast } from 'primevue/usetoast';

export const useToast = () => {
    const toast = primeUseToast();

    const showMessage = (type: 'contrast'|'error'|'info'|'secondary'|'success'|'warn', summary: string, message: string, lifetime: number) => {
        toast.add({
            severity: type,
            summary: summary,
            detail: message,
            life: lifetime
        });
    };

    return {
        showMessage
    };
};