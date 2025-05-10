<template>
  <div class="formgrid grid w-12 md:w-10 mx-auto p-3 md:p-4 text-white" :style="{ backgroundColor: companyData?.colorPrimario }">
    <div class="field col-12 md:col-6 mt-2">
      <FloatLabel>
        <InputText v-model="form.nombre" :class="{ 'p-invalid': v$.nombre.$error }" fluid />
        <label>Nombre de la propiedad</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.nombre.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-6 mt-2">
      <FloatLabel>
        <InputText v-model="form.autor" :class="{ 'p-invalid': v$.autor.$error }" fluid />
        <label>Tu nombre</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.autor.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-2 mt-2">
      <FloatLabel>
        <InputNumber v-model="form.cantidadDormitorios" :class="{ 'p-invalid': v$.cantidadDormitorios.$error }"
          showButtons :min="0" fluid />
        <label># dormitorios</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.cantidadDormitorios.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-2 mt-2">
      <FloatLabel>
        <InputNumber :min="0" v-model="form.cantidadBanos" :class="{ 'p-invalid': v$.cantidadBanos.$error }" showButtons
          fluid />
        <label># baños</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.cantidadBanos.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-4 mt-2">
      <FloatLabel>
        <SelectPrime v-model="form.idTipo" :options="companyData?.tipos_inmuebles" optionLabel="descripcion"
          optionValue="id" placeholder="Tipo de inmueble" class="w-full md:w-56"
          :class="{ 'p-invalid': v$.idTipo.$error }" fluid />
        <label>Tipo de inmueble</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.idTipo.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-4 mt-2">
      <FloatLabel>
        <InputText v-model="form.direccion" :class="{ 'p-invalid': v$.direccion.$error }" fluid />
        <label>Dirección</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.direccion.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-3 mt-2">
      <FloatLabel>
        <SelectPrime v-model="form.idCiudad" :options="companyData?.ciudades" optionLabel="descripcion" optionValue="id"
          placeholder="Ciudad" class="w-full md:w-56" :class="{ 'p-invalid': v$.idCiudad.$error }" fluid />
        <label>Ciudad</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.idCiudad.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-3 mt-2">
      <FloatLabel>
        <InputText v-model="form.areaMetrosCuadrados" :class="{ 'p-invalid': v$.areaMetrosCuadrados.$error }" fluid />
        <label>Mts cuadrados</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.areaMetrosCuadrados.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-2 mt-2">
      <ButtonPrime label="Seleccionar" @click="visible = true" fluid />
    </div>
    <div class="field col-6 md:col-2 mt-2">
      <FloatLabel>
        <InputNumber v-model="form.coordenadas.latitud" :class="{ 'p-invalid': v$.coordenadas.latitud.$error }"
          class="border-1 border-round-md" disabled fluid />
        <label>Latitud</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.coordenadas.latitud.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-2 mt-2">
      <FloatLabel>
        <InputNumber v-model="form.coordenadas.longitud" :class="{ 'p-invalid': v$.coordenadas.longitud.$error }"
          class="border-1 border-round-md" disabled fluid />
        <label>Longitud</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.coordenadas.longitud.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-6 mt-2">
      <FloatLabel variant="in">
        <TextareaPrime v-model="form.caracteristicas" rows="4" :class="{ 'p-invalid': v$.caracteristicas.$error }"
          fluid />
        <label>Características</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.caracteristicas.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-12 md:col-6 mt-2">
      <FloatLabel>
        <TextareaPrime v-model="form.descripcion" rows="4" :class="{ 'p-invalid': v$.descripcion.$error }" fluid />
        <label>Descripción</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.descripcion.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-3 mt-2">
      <FloatLabel variant="on">
        <InputNumber v-model="form.precio" mode="currency" currency="COP" roundingMode="floor" :minFractionDigits="0"
          :maxFractionDigits="0" :class="{ 'p-invalid': v$.precio.$error }" fluid />
        <label for="lasttname">Precio</label>
      </FloatLabel>
      <div class="p-error" v-for="error of v$.precio.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="field col-6 md:col-3 mt-2">
      <div class="flex items-center">
        <CheckboxPrime inputId="precioNegociable" v-model="form.precioNegociable" :binary="true" />
        <label for="precioNegociable" class="ml-2"> Negociable? </label>
      </div>
    </div>
    <div v-if="isEditing" class="field col-6 md:col-3 mt-2">
      <div class="flex items-center">
        <CheckboxPrime inputId="disponible" v-model="form.disponible" :binary="true" />
        <label for="disponible" class="ml-2"> Disponible? </label>
      </div>
    </div>
    <file-upload v-if="!isEditing" @update:listaFotos="actualizarListaFotos" ref="fileSelector" @update:listaVideos="actualizarListaVideos" />
    <div class="col-12 text-center mt-4">
      <ButtonPrime icon="pi pi-save" :aria-label="isEditing ? 'Actualizar información' : 'Registrar inmueble'"
        :label="isEditing ? 'Actualizar información' : 'Registrar inmueble'" @click="onSubmit" />
    </div>
    <DialogPrime v-model:visible="visible" modal header="Seleccione la ubicación del inmueble."
      :style="{ width: '90%' }">
      <location-selector :latitud="form.coordenadas.latitud" :longitud="form.coordenadas.longitud"
        @location-selected="updateLocation" />
    </DialogPrime>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  computed
} from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  numeric,
  minValue,
  between
} from '@vuelidate/validators'
import { useInmuebleStore } from '@/stores/inmueble'
import { useToast } from '../plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import LocationSelector from '@/components/LocationSelector.vue'
import type {
  FormInmueble,
  FotoInmueble,
  VideoInmueble,
  FormVideosInmueble
} from '@/interfaces/types'
import FileUpload from './FileUpload.vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  modelValue: Object,
  isEditing: Boolean
});

const emit = defineEmits(['update:visible']);

const useInmueble = useInmuebleStore();
const loaderStore = useLoaderStore();
const authStore = useAuthStore();
const listaFotos = ref<FotoInmueble[]>([]);
const listaVideos = ref<FormVideosInmueble>([])

const companyData = computed(() => authStore.getCompanyData);

const { showMessage } = useToast();

const visible = ref(false);
const fileSelector = ref();

const form = ref<FormInmueble>({
  nombre: '',
  autor: '',
  cantidadDormitorios: 0,
  cantidadBanos: 0,
  direccion: '',
  areaMetrosCuadrados: '',
  caracteristicas: '',
  descripcion: '',
  precio: 0,
  precioNegociable: false,
  coordenadas: { latitud: 0, longitud: 0 },
  idTipo: null,
  idCiudad: null,
  fotos: [] as FotoInmueble[],
  disponible: false,
  videos: [] as VideoInmueble[]
})

const rules = {
  nombre: { required },
  autor: { required },
  cantidadDormitorios: { required, numeric },
  cantidadBanos: { required, numeric },
  direccion: { required },
  areaMetrosCuadrados: { required },
  caracteristicas: { required },
  descripcion: { required },
  precio: {
    required,
    minValue: minValue(1)
  },
  coordenadas: {
    required,
    latitud: { between: between(-90, 90) },
    longitud: { between: between(-180, 180) }
  },
  idTipo: { required, numeric },
  idCiudad: { required, numeric }
}

const v$ = useVuelidate(rules, form)

const actualizarListaFotos = (fotos: FotoInmueble[]) => {
  const indexPortada = listaFotos.value.findIndex((foto: FotoInmueble) => foto.esPortada);
  if(fotos[0].esPortada){
    if (indexPortada !== -1) listaFotos.value.splice(indexPortada, 1, fotos[0]);
    else listaFotos.value.push(fotos[0]);
  } else {
    if (indexPortada !== -1) listaFotos.value = [listaFotos.value[indexPortada]];
    else listaFotos.value = [];
  }
  
  fotos.forEach((foto: FotoInmueble) => {
    if (!foto.esPortada) {
      listaFotos.value.push(foto);
    }
  })
}

const actualizarListaVideos = (videos: VideoInmueble[]) => {
  listaVideos.value = [];
  
  videos.forEach((video: VideoInmueble) => {
    listaVideos.value.push(video);
  })
}

const onSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    showMessage('warn', 'Error', 'Verifique el formulario', 10000);
    return;
  }

  if (!props.isEditing) {
    if (listaFotos.value.length === 0) {
      showMessage('warn', 'Error', 'Debe seleccionar al menos la foto principal', 10000);
      return;
    }
    if (listaFotos.value.length > 15) {
      showMessage('warn', 'Error', 'Puedes seleccionar un máximo de 15 fotos', 10000);
      return;
    }
    if (listaVideos.value.length > 3) {
      showMessage('warn', 'Error', 'Puedes seleccionar un máximo de 3 videos', 10000);
      return;
    }
    form.value.fotos = listaFotos.value;
    form.value.videos = listaVideos.value;
  }

  await loaderStore?.setLoading(true)

  const status = props.isEditing
    ? form.value.id
      ? await useInmueble.actualizar(form.value, form.value.id)
      : (showMessage('warn', 'Error', 'Vuelve a seleccionar el inmueble', 6000), null)
    : await useInmueble.registrar(form.value);

  await loaderStore?.setLoading(false)

  if (status === 201) {
    showMessage('success', 'Éxito', 'Tu inmueble se ha cargado exitosamente', 10000);
    limpiarFormulario()
  } else if (status === 200) {
    showMessage('success', 'Éxito', 'Información actualizada exitosamente', 10000);
    emit('update:visible', false);
  } else {
    showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
  }
};

const limpiarFormulario = () => {
  form.value = {
    nombre: '',
    autor: '',
    cantidadDormitorios: 0,
    cantidadBanos: 0,
    direccion: '',
    areaMetrosCuadrados: '',
    caracteristicas: '',
    descripcion: '',
    precio: 0,
    precioNegociable: false,
    coordenadas: { latitud: 0, longitud: 0 },
    idTipo: null,
    idCiudad: null,
    fotos: [] as FotoInmueble[],
    disponible: false,
    videos: [] as VideoInmueble[]
  };
  listaFotos.value = [] as FotoInmueble[];
  listaVideos.value = [];
  v$.value.$reset();

  if (fileSelector.value) fileSelector.value.resetFiles();
}

const updateLocation = (location: { latitud: number, longitud: number }) => {
  form.value.coordenadas.latitud = location.latitud;
  form.value.coordenadas.longitud = location.longitud;
};

watch(() => props.modelValue, (newValue: any) => {
  if (props.isEditing && newValue) {
    form.value = { ...newValue };
  }
},
  { immediate: true }
);
</script>