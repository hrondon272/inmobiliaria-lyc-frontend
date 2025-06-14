<template>
  <div class="card bg-white text-white">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-2xl p-4"
      :style="{ backgroundColor: companyData?.colorSecundario }"
    >
      <not-found-404 v-if="visibleError404" />
      <div v-else class="text-center">
        <h2>{{ inmueble?.nombre }}</h2>
        <p class="text-base">{{ inmueble?.ciudad?.descripcion }}</p>
      </div>
    </div>
    <div
      v-if="!visibleError404"
      class="w-12 md:w-10 mx-auto p-2"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      <not-found-404 v-if="visibleError404" />
      <div v-else class="text-2xl font-bold text-center">
        <h2>$ {{ getPrecio(parseFloat(inmueble?.precio || '0')) }} COP</h2>
      </div>
    </div>
    <div
      v-if="!visibleError404"
      class="w-12 md:w-10 mx-auto p-3 md:p-4"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      <div class="grid">
        <div class="col-12 md:col-6">
          <Galleria
            :value="inmueble?.fotos"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 450px; margin: auto; border: 0;"
            :showItemNavigators="true"
            :showItemNavigatorsOnHover="true"
            :circular="true"
            :autoPlay="true"
            :transitionInterval="6000"
          >
            <template #item="slotProps">
              <div class="image-container" @click="mostrarFotos = true">
                <img :src="slotProps.item.urlFoto" style="width: 100% !important; display: block" />
                <div class="hover-overlay">
                  <i class="pi pi-search"></i>
                </div>
              </div>
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.urlFoto" style="display: block; width: 50px" />
            </template>
          </Galleria>
          <Galleria
            :value="inmueble?.videos"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 450px; margin: 32px auto; border: 0;"
            :showItemNavigators="true"
            :showItemNavigatorsOnHover="true"
            :circular="true"
            :showThumbnails="false"
          >
            <template #item="slotProps">
              <div class="image-container" @click="mostrarVideos = true">
                <video
                  controls
                  preload="auto"
                  :src="slotProps.item.urlVideo"
                  class="media-preview"
                ></video>
                <div class="hover-overlay">
                  <i class="pi pi-search"></i>
                </div>
              </div>
            </template>
          </Galleria>
        </div>
        <div class="col-12 md:col-6 text-base">
          <div class="flex">
            <div class="flex-1 text-left">
              <icon-bed />
              Dormitorios
            </div>
            <div class="flex-1 text-right">{{ inmueble?.cantidadDormitorios }}</div>
          </div>
          <hr />
          <div class="flex">
            <div class="flex-1 text-left">
              <icon-bath class="mt-2" />
              Baños
            </div>
            <div class="flex-1 text-right mt-2">{{ inmueble?.cantidadBanos }}</div>
          </div>
          <hr />
          <div class="flex">
            <div class="flex-1 text-left">
              <icon-area class="mt-2" />
              Área (mt2)
            </div>
            <div class="flex-1 text-right mt-2">{{ inmueble?.areaMetrosCuadrados }}</div>
          </div>
          <hr />
          <div class="text-justify my-3">Descripción</div>
          <div class="text-justify my-3">{{ inmueble?.descripcion }}</div>
          <div class="text-justify my-3">Características</div>
          <div class="text-justify my-3">{{ inmueble?.caracteristicas }}</div>
          <div class="text-center">
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escribe al asesor"
              @click="abrirChatWhatsappAsesor(inmueble?.nombre || '')"
            />
          </div>
        </div>
      </div>
      <div class="text-center">
        <Galleria
          v-model:visible="mostrarFotos"
          :value="inmueble?.fotos"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          containerStyle="max-width: 750px; margin: auto; border: 0;"
          :showItemNavigators="true"
          :showItemNavigatorsOnHover="true"
          :circular="true"
          :autoPlay="true"
          :transitionInterval="6000"
          :fullScreen="true"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.urlFoto" style="width: 100% !important; display: block" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.urlFoto" style="display: block; width: 50px" />
          </template>
        </Galleria>
        <Galleria
          v-model:visible="mostrarVideos"
          :value="inmueble?.videos"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          containerStyle="max-width: 750px; margin: auto; border: 0;"
          :showItemNavigators="true"
          :showItemNavigatorsOnHover="true"
          :circular="true"
          :showThumbnails="false"
          :fullScreen="true"
        >
          <template #item="slotProps">
            <video
              controls
              preload="auto"
              :src="slotProps.item.urlVideo"
              class="media-preview"
            ></video>
          </template>
        </Galleria>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import { useLoaderStore } from '@/stores/loader'
import type { Inmueble } from '../interfaces/types'
import NotFound404 from '@/components/NotFound404.vue'
import { useRoute } from 'vue-router'
import { getPrecio } from '@/helpers/randomFunctions'
import IconBed from '@/components/icons/IconBed.vue'
import IconBath from '@/components/icons/IconBath.vue'
import IconArea from '@/components/icons/IconArea.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const loaderStore = useLoaderStore()
const useInmueble = useInmuebleStore()
const inmueble = ref<Inmueble | null>(null)
;({
  precio: 0
})
const visibleError404 = ref(false)
const mostrarFotos = ref(false)
const mostrarVideos = ref(false)

const responsiveOptions = ref([
  {
    breakpoint: '1500px',
    numVisible: 5
  },
  {
    breakpoint: '1024px',
    numVisible: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
])

const companyData = computed(() => authStore.getCompanyData)

const abrirChatWhatsappAsesor = (nombreInmueble: string) => {
  window.open(
    `https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20esta%20propiedad,%20${nombreInmueble}%20${location.href}`,
    '_blank'
  )
}

onMounted(async () => {
  if (route.query.inmueble) {
    const idInmueble: string = route.query.inmueble.toString()

    if (idInmueble) {
      await loaderStore?.setLoading(true)
      const { status, data } = await useInmueble.buscar(idInmueble)
      await loaderStore?.setLoading(false)
      if (status === 200) {
        inmueble.value = data.data
      } else {
        visibleError404.value = true
      }
    } else {
      visibleError404.value = true
    }
  }
})
</script>

<style scoped>
.image-container {
  position: relative;
  cursor: pointer;
}

.image-container img {
  display: block;
  width: 100%;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .hover-overlay {
  opacity: 1;
}

.hover-overlay i {
  font-size: 2rem;
  color: white;
}
</style>
