<template>
  <div
    v-if="props.isEditImages || (!props.isEditImages && !props.isEditVideos)"
    class="field col-12 md:col-6 text-center"
    style="color: #2c3e50"
  >
    <p>Foto principal(.png, .jpg, .jpeg, .heic)</p>
    <FileUpload
      ref="fotoPrincipalRef"
      mode="basic"
      accept=".png,.jpg,.jpeg,.HEIC,.heic"
      :maxFileSize="10000000"
      @select="onFotosSeleccionadas($event, true)"
    />
  </div>
  <div
    v-if="props.isEditImages || (!props.isEditImages && !props.isEditVideos)"
    class="field col-12 mt-2 text-center"
  >
    <FileUpload
      ref="fotosInmuebleRef"
      @select="onFotosSeleccionadas($event, false)"
      :multiple="true"
      accept=".png,.jpg,.jpeg,.HEIC,.heic"
      :fileLimit="14"
      invalidFileLimitMessage="Solo puede subir hasta 14 fotos"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <ButtonPrime
              @click="chooseCallback()"
              label="Seleccionar"
              icon="pi pi-plus"
              :disabled="files.length > 14"
            />
            <ButtonPrime
              @click="clearCallback()"
              label="Cancelar"
              icon="pi pi-times"
              severity="danger"
              :disabled="!files || files.length === 0"
            />
          </div>
        </div>
      </template>
      <template #content="{ files }">
        <div v-if="files.length > 0 && files.length <= 14" class="text-center py-2">
          {{ files.length }} Imagene(s) cargada(s) <i class="pi pi-check"></i>
        </div>
        <div v-if="files.length > 14" class="text-center py-2">
          No puede seleccionar más de 14 fotos, de clic en cancelar y seleccione nuevamente
        </div>
      </template>
      <template #empty>
        <span>Arrastre y suelte hasta 14 fotos del inmueble(.png, .jpg, .jpeg).</span>
      </template>
    </FileUpload>
  </div>
  <div
    v-if="props.isEditVideos || (!props.isEditImages && !props.isEditVideos)"
    class="field col-12 mt-2 text-center"
    style="color: #2c3e50"
  >
    <h2>Agregue hasta tres videos del inmueble</h2>
    <p>Por favor tenga en cuenta que:</p>
    <p>El video debe pesar un máximo de 100MB</p>
    <p class="mb-2">Cada video no debe durar más de 60 segundos</p>
    <FileUpload
      class="my-2"
      ref="videosInmuebleRef"
      @select="onVideosSeleccionados($event)"
      :multiple="true"
      accept=".mp4,.avi,.mkv,.mov"
      :fileLimit="3"
      invalidFileLimitMessage="Solo puedes seleccionar un máximo de 3 videos"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
          <div class="flex gap-2">
            <ButtonPrime
              @click="chooseCallback()"
              label="Seleccionar"
              icon="pi pi-plus"
              :disabled="files.length > 3"
            />
            <ButtonPrime
              @click="clearCallback()"
              label="Cancelar"
              icon="pi pi-times"
              severity="danger"
              :disabled="!files || files.length === 0"
            />
          </div>
        </div>
      </template>
      <template #content="{ files }">
        <Message v-if="errorVideo" severity="error" variant="outlined" class="mb-2">
          Error, cada video puede durar un máximo de 60 segundos y pesar hasta 100MB
        </Message>
        <div v-if="files.length > 0 && files.length <= 3" class="text-center py-2">
          <Message severity="success" variant="outlined" class="mb-2">
            {{ files.length }} Video(s) cargado(s) <i class="pi pi-check"></i>
          </Message>
        </div>
        <Message
          v-if="files.length > 3"
          class="text-center py-2"
          severity="error"
          variant="outlined"
        >
          No puede seleccionar más de 3 Videos, de clic en cancelar y seleccione nuevamente
        </Message>
      </template>
      <template #empty>
        <span>Arrastre y suelte hasta 3 videos del inmueble(.mp4, .avi, .mkv, .mov).</span>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { compressImages } from '@/plugins/image-compresion'
import { useLoaderStore } from '@/stores/loader'
import { useToast } from '../plugins/useToast'

const props = defineProps({
  isEditVideos: {
    type: Boolean,
    default: false
  },
  isEditImages: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:listaFotos', 'update:listaVideos'])

const loaderStore = useLoaderStore()
const { showMessage } = useToast()

const fotoPrincipalRef = ref()
const fotosInmuebleRef = ref()
const videosInmuebleRef = ref()
const errorVideo = ref(false)

const onFotosSeleccionadas = async (event: any, esPortada: boolean = false) => {
  if (event.files.length > 14) {
    showMessage('warn', '', 'Solo puedes seleccionar un máximo de 14 fotos', 10000)
    return
  }

  await loaderStore?.setLoading(true)
  const archivosComprimidos = await Promise.all(
    event.files.map((file: File) => compressImages(file))
  )

  if (archivosComprimidos.length) {
    emit(
      'update:listaFotos',
      archivosComprimidos.map((foto) => ({
        foto: foto,
        esPortada: esPortada
      }))
    )
  }
  await loaderStore?.setLoading(false)
}

const onVideosSeleccionados = async (event: any) => {
  let invalid = false
  for (const file of event.files) {
    if (!(await verificarVideo(file))) {
      invalid = true
      break
    }
  }

  if (invalid) {
    errorVideo.value = true
    videosInmuebleRef.value.clear()
    return
  }

  if (errorVideo.value) errorVideo.value = false

  emit('update:listaVideos', event.files)
}

const verificarVideo = async (file: File) => {
  const duracion = await new Promise((resolve, reject) => {
    const video = document.createElement('video')

    video.preload = 'metadata'
    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = function () {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }

    video.onerror = function () {
      reject('No se pudo cargar el archivo de video.')
    }
  })

  if (typeof duracion === 'number' && duracion <= 120 && file.size <= 209715200) return true
  else return false
}

const resetFiles = () => {
  if (fotoPrincipalRef.value) fotoPrincipalRef.value.clear()
  if (fotosInmuebleRef.value) fotosInmuebleRef.value.clear()
  if (videosInmuebleRef.value) videosInmuebleRef.value.clear()
}

defineExpose({
  resetFiles
})
</script>
