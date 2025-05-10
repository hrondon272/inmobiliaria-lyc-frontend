<template>
  <div class="w-12 md:w-10 mx-auto p-3 md:p-4" :style="{ backgroundColor: companyData?.colorPrimario }">
    <div class="formgrid grid">
      <div v-for="(foto) in listaFotos.fotos" :key="foto.id" class="field col-12 md:col-6 lg:col-4 mt-2">
        <Card>
          <template #content>
            <div class="relative">
              <img :src="urlFotoInmueble(foto.urlFoto)" alt="Image" class="media-preview" />
              <ButtonPrime icon="pi pi-times" class="p-button-rounded p-button-danger delete-button"
                @click="eliminarFotoInmueble(foto.id)" />
              <div class="cover-photo" v-if="foto.esPortada">Foto de portada</div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <hr>
    <div class="formgrid grid mt-4">
      <h2 class="text-center">Agregue fotos al inmueble</h2>
      <file-upload @update:listaFotos="actualizarListaFotos" ref="fileSelector" :isEditImages="true" />
    </div>
    <div class="col-12 text-center mt-4">
      <ButtonPrime icon="pi pi-save" :aria-label="'Agregar fotos'" :label="'Agregar fotos'" @click="onSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  computed
} from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import { useToast } from '../plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import type {
  FormFotosInmueble,
  FotoInmueble
} from '@/interfaces/types'
import { useConfirm } from '@/plugins/useConfirm'
import FileUpload from './FileUpload.vue'
import { resolveURLFiles } from '@/helpers/randomFunctions'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  modelValue: Array,
  idInmueble: {
    type: String,
    default: ''
  }
});

const useInmueble = useInmuebleStore();
const loaderStore = useLoaderStore();
const authStore = useAuthStore();
const { showConfirmDelete } = useConfirm();
const { showMessage } = useToast();

const fileSelector = ref();

const listaFotos = ref<FormFotosInmueble>({
  fotos: []
})

const form = ref({
  fotos: [] as FotoInmueble[]
});

const companyData = computed(() => authStore.getCompanyData);

const onSubmit = async () => {
  const totalImagenes = form.value.fotos.length + listaFotos.value.fotos.length;
  if (form.value.fotos.length === 0) {
    showMessage('warn', 'Error', 'Debe seleccionar al menos una foto', 10000);
    return;
  }
  if (totalImagenes > 15) {
    showMessage('warn', 'Error', 'Cada inmueble solo puede tener hasta 15 fotos', 10000);
    limpiarFormulario()
    return;
  }

  await loaderStore?.setLoading(true)
  const { status, data } = await useInmueble.agregarFotos(form.value, props.idInmueble)

  await loaderStore?.setLoading(false)

  if (status === 200) {
    const fotoViejaPortada = listaFotos.value?.fotos?.find((foto: any) => foto.esPortada);
    if (fotoViejaPortada) fotoViejaPortada.esPortada = false;

    data.data.forEach((nuevaFoto: any) => {
      const { id, urlFoto, esPortada } = nuevaFoto;
      listaFotos.value.fotos.push({ id, urlFoto, esPortada });
    });
    showMessage('success', 'Éxito', 'Fotos añadidas exitosamente', 6000);
    limpiarFormulario()
  } else {
    showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
  }
};

const limpiarFormulario = () => {
  form.value.fotos = [];
  if (fileSelector.value) fileSelector.value.resetFiles();
}

const actualizarListaFotos = (fotos: FotoInmueble[]) => {
  const indexPortada = form.value.fotos.findIndex((foto: FotoInmueble) => foto.esPortada);
  if(fotos[0].esPortada){
    if (indexPortada !== -1) form.value.fotos.splice(indexPortada, 1, fotos[0]);
    else form.value.fotos.push(fotos[0]);
  } else {
    if (indexPortada !== -1) form.value.fotos = [form.value.fotos[indexPortada]];
    else form.value.fotos = [];
  }
  
  fotos.forEach((foto: FotoInmueble) => {
    if (!foto.esPortada) {
      form.value.fotos.push(foto);
    }
  })
}

const eliminarFotoInmueble = (id: string) => {
  showConfirmDelete(async () => {
    await loaderStore?.setLoading(true)
    const { status } = await useInmueble.eliminarFoto(id)
    await loaderStore?.setLoading(false)

    if (status === 204) {
      listaFotos.value.fotos = listaFotos.value.fotos.filter(foto => foto.id !== id);
      showMessage('success', 'Éxito', 'Foto eliminada exitosamente', 6000);
    } else {
      showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
    }
  })
};

const urlFotoInmueble = (urlFoto: string) => {
  return resolveURLFiles(urlFoto);
}

watch(() => props.modelValue, (newValue: any) => {
  listaFotos.value.fotos = newValue
},
  { immediate: true }
);
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.cover-photo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: yellow;
  color: black;
  text-align: center;
  padding: 5px 0;
  font-weight: bold;
}
</style>