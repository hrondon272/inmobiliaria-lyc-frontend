import { useConfirm as primeUserConfirm } from "primevue/useconfirm";

export const useConfirm = () => {
    const confirm = primeUserConfirm();

    const showConfirmDelete = (onAccept: () => void) => {
        confirm.require({
            message: 'Está seguro de eliminar?',
            header: 'Confirmación',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancelar',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Sí',
                severity: 'danger'
            },
            accept: onAccept
        });
    };

    const showConfirmDefault = (onAccept: () => void) => {
        confirm.require({
            message: 'Por favor confirme para continuar',
            header: 'Confirmación',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancelar',
            rejectProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Confirmo',
                severity: 'danger'
            },
            accept: onAccept
        });
    };

    return {
        showConfirmDelete,
        showConfirmDefault
    };
};