<template>
    <h2 class="mt-2 mb-4">Configure su información</h2>
    <div class="formgrid grid w-12 md:w-10 mx-auto p-3 md:p-4" :style="{ backgroundColor: companyData?.colorPrimario }">
        <div class="field col-12 md:col-6 mt-4">
            <FloatLabel>
                <InputText v-model="form.nombre" :class="{ 'p-invalid': v$.nombre.$error }" fluid />
                <label>Tu nombre</label>
            </FloatLabel>
            <div class="p-error" v-for="error of v$.nombre.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field col-12 md:col-6 mt-4">
            <FloatLabel>
                <InputText v-model="form.email" :class="{ 'p-invalid': v$.email.$error }" fluid />
                <label>Tu correo electrónico</label>
            </FloatLabel>
            <div class="p-error" v-for="error of v$.email.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <InputText v-model="form.compania" :class="{ 'p-invalid': v$.compania.$error }" fluid />
                <label>Compañía</label>
            </FloatLabel>
            <div class="p-error" v-for="error of v$.compania.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <InputText v-model="form.telefono" :class="{ 'p-invalid': v$.telefono.$error }" fluid />
                <label>Teléfono</label>
            </FloatLabel>
            <div class="p-error" v-for="error of v$.telefono.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div class="field col-12 text-center">
            <p class="mb-2">Logo(.png, .jpg, .jpeg)</p>
            <FileUpload ref="fileUploadRef" mode="basic" name="logo" accept=".png,.jpg,.jpeg" :maxFileSize="10000000"
                @select="onLogoSeleccionado" @remove="onFileRemove" cancelIcon="x" showCancelButton />
        </div>

        <!-- Sección para redes sociales -->
        <div class="col-12">
            <h3 class="mt-4">Redes Sociales</h3>
            <ButtonPrime icon="pi pi-plus" @click="addRedSocial" class="mb-3 inline-block" />
        </div>
        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <SelectPrime v-model="selectedIcon" :options="iconOptions" class="flex-1 sm:w-full" fluid
                    optionLabel="nombre" />
                <label>Seleccione</label>
            </FloatLabel>
        </div>

        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <InputText v-model="selectedLink" fluid />
                <label>Ingresa el link</label>
            </FloatLabel>
        </div>

        <div class="field col-12 md:col-6 mt-2">
            <label>Color {{ selectedColorFormateado }}</label>
            <ColorPicker v-model="selectedColor" inputId="cp-color" format="hex" class="mb-4" inline />
        </div>
        <div v-if="form.redes_sociales.length" class="col-12 md:col-6 mt-4">
            <DataTable :value="form.redes_sociales">
                <Column field="icono" header="Icono">
                    <template #body="slotProps">
                        <i :class="slotProps.data.icono"></i>
                    </template>
                </Column>
                <Column field="link" header="Link">
                    <template #body="slotProps">
                        <a :href="slotProps.data.link" target="_blank">Abrir</a>
                    </template>
                </Column>
                <Column>
                    <template #body="slotProps">
                        <ButtonPrime icon="pi pi-times" @click="removeRedSocial(slotProps.index)"
                            class="p-button-danger" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-12 text-center my-4">
            <ButtonPrime icon="pi pi-save" aria-label="Actualizar perfil" label="Actualizar perfil" @click="onSubmit" />
        </div>
    </div>

    <h2 class="my-4">Actualizar contraseña</h2>
    <div class="formgrid grid w-12 md:w-10 mx-auto p-3 md:p-4" :style="{ backgroundColor: companyData?.colorPrimario }">
        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <Password v-model="currentPassword" toggleMask fluid>
                    <template #header>
                        <div class="font-semibold text-xm mb-4">Elige una contraseña</div>
                    </template>
                    <template #footer>
                        <Divider />
                        <ul class="pl-2 ml-2 my-0 leading-normal">
                            <li>Al menos una minúscula</li>
                            <li>Al menos una mayúscula</li>
                            <li>Al menos un número</li>
                            <li>Mínimo 8 caracteres</li>
                        </ul>
                    </template>
                </Password>
                <label>Actual contraseña</label>
            </FloatLabel>
        </div>
        <div class="field col-12 md:col-6 mt-2">
            <FloatLabel>
                <Password v-model="newPassword" toggleMask fluid>
                    <template #header>
                        <div class="font-semibold text-xm mb-4">Elige una contraseña</div>
                    </template>
                    <template #footer>
                        <Divider />
                        <ul class="pl-2 ml-2 my-0 leading-normal">
                            <li>Al menos una minúscula</li>
                            <li>Al menos una mayúscula</li>
                            <li>Al menos un número</li>
                            <li>Mínimo 8 caracteres</li>
                        </ul>
                    </template>
                </Password>
                <label>Nueva contraseña</label>
            </FloatLabel>
        </div>
        <div class="col-12 text-center my-2">
            <ButtonPrime icon="pi pi-key" aria-label="Actualizar contraseña" label="Actualizar contraseña"
                @click="changePassword" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useToast } from '../plugins/useToast';
import { useLoaderStore } from '@/stores/loader';
import { useUsuarioStore } from '@/stores/usuario';
import { compressImages } from '@/plugins/image-compresion';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const { showMessage } = useToast();
const loaderStore = useLoaderStore();
const useStore = useUsuarioStore();

const selectedIcon = ref('');
const selectedLink = ref('');
const selectedColor = ref('#000000');
const currentPassword = ref('');
const newPassword = ref('');
const fileUploadRef = ref(null);

const companyData = computed(() => authStore.getCompanyData);

const onLogoSeleccionado = async (event) => {
    const files = event.files;
    if (files.length === 0) return;

    try {
        await loaderStore?.setLoading(true)
        const compressedFile = await compressImages(files[0]);
        await loaderStore?.setLoading(false)
        
        form.value.logo = compressedFile;
    } catch (error) {
        showMessage('error', 'Error al comprimir', 'No se pudo comprimir la imagen', 5000);
    }
};

const onFileRemove = () => {
    form.value.logo = null;
    fileUploadRef.value.clear();
};

const formatearColor = (color) => {
    return color.startsWith('#') ? color : `#${color}`;
}

const selectedColorFormateado = computed(() => {
    return formatearColor(selectedColor.value);
})

const addRedSocial = () => {
    if (!selectedIcon.value || !selectedLink.value || !selectedColor.value) {
        showMessage('warn', 'Faltan datos', 'Debe seleccionar los datos de la red social', 7000);
        return;
    }

    form.value.redes_sociales.push({
        nombre: selectedIcon.value.nombre,
        icono: selectedIcon.value.icono,
        link: selectedLink.value,
        color: formatearColor(selectedColor.value)
    });
    selectedIcon.value = '';
    selectedLink.value = '';
};

const removeRedSocial = (index) => {
    form.value.redes_sociales.splice(index, 1);
};

const iconOptions = ref([
    { nombre: 'Facebook', icono: 'pi pi-facebook' },
    { nombre: 'Twitter', icono: 'pi pi-twitter' },
    { nombre: 'Instagram', icono: 'pi pi-instagram' },
    { nombre: 'Linkedin', icono: 'pi pi-linkedin' },
    { nombre: 'Pinterest', icono: 'pi pi-pinterest' },
    { nombre: 'Youtube', icono: 'pi pi-youtube' },
    { nombre: 'TikTok', icono: 'pi pi-tiktok' }
]);

const form = ref({
    nombre: companyData?.value.nombre,
    email: companyData?.value.email,
    compania: companyData?.value.compania,
    telefono: companyData?.value.telefono,
    redes_sociales: companyData?.value.redes_sociales,
    logo: null
});

const rules = {
    nombre: { required },
    email: { required, email },
    compania: { required },
    telefono: { required }
};

const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
    v$.value.$touch();

    if (v$.value.$invalid) {
        showMessage('warn', 'Error', 'Verifique el formulario', 10000);
        return;
    }

    await loaderStore?.setLoading(true);
    const { status, data } = await useStore.updateProfile(form.value);
    await loaderStore?.setLoading(false);

    if (status === 200) {
        companyData.value.urlLogo = data.data.urlLogo;
        showMessage('success', 'Éxito', 'Se ha actualizado el perfil correctamente', 5000);
        onFileRemove();
        v$.value.$reset();
    } else {
        showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
    }
};

const changePassword = async () => {
    v$.value.$touch();

    if (!currentPassword.value || !newPassword.value) {
        showMessage('warn', 'Faltan datos', 'Ingrese la contraseña actual y la nueva', 7000);
        return;
    }

    const formPasswords = {
        "currentPassword": currentPassword.value,
        "newPassword": newPassword.value
    }

    await loaderStore?.setLoading(true);
    const status = await useStore.updatePassword(formPasswords);
    await loaderStore?.setLoading(false);

    if (status === 200) {
        showMessage('success', 'Éxito', 'Se ha actualizado la contraseña exitosamente', 5000);
        currentPassword.value = '';
        newPassword.value = '';
    } else if (status === 400) {
        showMessage('warn', '', 'La contraseña actual no coincide', 10000);
    } else {
        showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
    }
};
</script>