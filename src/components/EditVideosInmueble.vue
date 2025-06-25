<template>
  <div
    class="w-12 md:w-10 mx-auto p-3 md:p-4"
    :style="{ backgroundColor: companyData?.colorPrimario }"
  >
    <div class="formgrid grid">
      <div v-for="video in listaVideos" :key="video.id" class="field col-12 md:col-6 lg:col-4 mt-2">
        <Card>
          <template #content>
            <div class="relative">
              <video
                playsinline
                controls
                preload="auto"
                :src="video.urlVideo"
                class="media-preview"
              ></video>
              <ButtonPrime
                icon="pi pi-times"
                class="p-button-rounded p-button-danger delete-button"
                @click="eliminarVideoInmueble(video.id)"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
    <hr />
    <div class="formgrid grid mt-4">
      <file-upload
        @update:listaVideos="actualizarListaVideos"
        ref="fileSelector"
        :isEditVideos="true"
      />
    </div>
    <div class="col-12 text-center mt-4">
      <ButtonPrime
        icon="pi pi-save"
        :aria-label="'Agregar videos'"
        :label="'Agregar videos'"
        @click="onSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import { useToast } from '../plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import type { FormVideosInmueble, VideoInmueble } from '@/interfaces/types'
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
})

const authStore = useAuthStore()
const useInmueble = useInmuebleStore()
const loaderStore = useLoaderStore()
const { showConfirmDelete } = useConfirm()
const { showMessage } = useToast()

const fileSelector = ref()

const listaVideos = ref<FormVideosInmueble>([])

const form = ref({
  videos: [] as VideoInmueble[]
})

const companyData = computed(() => authStore.getCompanyData)

const onSubmit = async () => {
  const totalVideos = form.value.videos.length + listaVideos.value.length
  if (totalVideos > 3) {
    showMessage('warn', 'Error', 'Cada inmueble solo puede tener hasta 3 videos', 10000)
    limpiarFormulario()
    return
  }

  await loaderStore?.setLoading(true)
  const { status, data } = await useInmueble.agregarVideos(form.value, props.idInmueble)

  await loaderStore?.setLoading(false)

  if (status === 200) {
    data.data.forEach((nuevoVideo: any) => {
      const { id, urlVideo } = nuevoVideo
      listaVideos.value.push({ id, idInmueble: props.idInmueble, urlVideo })
    })
    showMessage('success', 'Éxito', 'Videos añadidos exitosamente', 6000)
    limpiarFormulario()
  } else {
    showMessage(
      'error',
      'Error',
      'Por favor vuelva a intentar o comuníquese con nuestro equipo',
      10000
    )
  }
}

const limpiarFormulario = () => {
  form.value.videos = []
  if (fileSelector.value) fileSelector.value.resetFiles()
}

const actualizarListaVideos = (videos: VideoInmueble[]) => {
  form.value.videos = []

  videos.forEach((video: VideoInmueble) => {
    form.value.videos.push(video)
  })
}

const eliminarVideoInmueble = (id: string) => {
  showConfirmDelete(async () => {
    await loaderStore?.setLoading(true)
    const { status } = await useInmueble.eliminarVideo(id)
    await loaderStore?.setLoading(false)

    if (status === 204) {
      listaVideos.value = listaVideos.value.filter((video) => video.id !== id)
      showMessage('success', 'Éxito', 'Video eliminado exitosamente', 6000)
    } else {
      showMessage(
        'error',
        'Error',
        'Por favor vuelva a intentar o comuníquese con nuestro equipo',
        10000
      )
    }
  })
}

watch(
  () => props.modelValue,
  (newValue: any) => {
    listaVideos.value = newValue
  },
  { immediate: true }
)
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
