<template>
  <div class="card bg-white">
    <Carousel
      :value="imagenesCarrusel"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="6000"
      circular
      autoplay
      :nextButtonProps="{ style: { display: 'none' } }"
      :prevButtonProps="{ style: { display: 'none' } }"
      aria-label="Carrusel de imágenes"
      aria-roledescription="Carrusel de imágenes"
      aria-live="off"
    >
      <template #item="slotProps">
        <div class="border rounded p-0">
          <div class="mb-4">
            <div class="relative">
              <img
                :src="'/carrusel/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full h-30rem"
                style="object-fit: cover"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
    <div class="w-12 md:w-10 mx-auto">
      <div>
        <div
          class="py-2 px-4 mt-2 text-2xl text-white"
          :style="{ backgroundColor: companyData?.colorPrimario }"
        >
          ¡ENCUENTRA AQUÍ EL INMUEBLE DE TUS SUEÑOS!
        </div>
        <div class="formgrid grid w-full p-4">
          <div class="field col-12 sm:col-6 xl:col-4">
            <SelectPrime
              v-model="form.ciudadSeleccionada"
              :options="companyData?.ciudades || []"
              optionLabel="descripcion"
              optionValue="id"
              placeholder="Ciudad"
              class="flex-1 w-full"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <SelectPrime
              v-model="form.tipoSeleccionado"
              :options="companyData?.tipos_inmuebles || []"
              optionLabel="descripcion"
              optionValue="id"
              placeholder="Tipos de propiedades"
              class="flex-1 sm:w-full"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputText
              class="flex-1 w-full"
              v-model="form.palabraClave"
              type="text"
              placeholder="Palabra clave"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputNumber
              v-model="form.precioDesde"
              mode="currency"
              currency="COP"
              roundingMode="floor"
              :minFractionDigits="0"
              :maxFractionDigits="0"
              placeholder="Precio desde"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputNumber
              v-model="form.precioHasta"
              mode="currency"
              currency="COP"
              roundingMode="floor"
              :minFractionDigits="0"
              :maxFractionDigits="0"
              placeholder="Precio hasta"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputNumber v-model="form.dormitorios" placeholder="# Dormitorios" fluid />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputNumber v-model="form.banos" placeholder="# Baños" fluid />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputText
              class="flex-1 w-full"
              v-model="form.area"
              type="text"
              placeholder="Area mt2"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <InputNumber
              v-model="form.presupuesto"
              mode="currency"
              currency="COP"
              roundingMode="floor"
              :minFractionDigits="0"
              :maxFractionDigits="0"
              placeholder="Presupuesto"
              fluid
            />
          </div>
          <div class="field col-12 sm:col-6 xl:col-4">
            <TextareaPrime
              v-model="form.caracteristicasEspeciales"
              rows="6"
              placeholder="Escribe características especiales: piscina, bbq, jacuzzi, balcon, estudio, patio, terraza, sauna, lobby, gimnasio, kiosko, cancha de futbol, cancha de tenis..."
              fluid
            />
          </div>
          <div class="text-right m-2 col-12">
            <ButtonPrime
              class="mx-2 mb-1"
              type="button"
              label="Ver lista"
              severity="secondary"
              @click="listarFiltrosPersonalizados"
            />
            <ButtonPrime
              class="mx-2 mb-1"
              type="button"
              label="Buscar"
              severity="primary"
              @click="listarFiltrosPersonalizados"
            />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div
          class="py-2 px-4 mt-2 text-xl text-white"
          :style="{ backgroundColor: companyData?.colorPrimario }"
        >
          LISTA DESTACADOS
        </div>
      </div>
      <div class="grid gap-2 my-4 px-2">
        <div
          v-for="inmueble in useInmueble.inmuebles.slice(0, 3)"
          :key="inmueble.id"
          class="col-4 h-10rem mb-4 bg-center bg-cover cursor-pointer card-inmueble"
          v-tooltip="'Abrir'"
          @click="abrirInmueble(inmueble.id)"
          :style="{
            backgroundImage: `url('${getFotoPrincipal(inmueble)}')`,
            width: 'calc(33.33% - 1rem)',
            margin: '0 auto'
          }"
        >
          <p class="truncate-multiline">
            {{ inmueble?.nombre }}
          </p>
        </div>
        <div
          v-for="inmueble in useInmueble.inmuebles.slice(3, 7)"
          :key="inmueble.id"
          class="col-3 h-10rem bg-center bg-cover cursor-pointer card-inmueble"
          v-tooltip="'Abrir'"
          @click="abrirInmueble(inmueble.id)"
          :style="{
            backgroundImage: `url('${getFotoPrincipal(inmueble)}')`,
            width: 'calc(25% - 1rem)',
            margin: '0 auto'
          }"
        >
          <p class="truncate-multiline">{{ inmueble?.nombre }}</p>
        </div>
      </div>
    </div>
    <map-inmueble />
    <div
      class="relative flex flex-wrap align-items-center justify-content-center w-full min-h-10rem mt-4 py-4 bg-center"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-center"
        :style="{
          backgroundColor: companyData?.colorPrimario || '#2A333E'
        }"
      ></div>

      <!-- Texto encima del fondo -->
      <span
        class="relative vertical-align-middle text-white text-center font-bold uppercase text-3xl"
      >
        "Tu hogar en buenas manos"
      </span>
    </div>

    <div
      class="relative flex flex-wrap align-items-center justify-content-center w-full py-4 bg-center"
      :style="{
        minHeight: '500px'
      }"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-center"
        :style="{
          backgroundColor: companyData?.colorPrimario,
          backgroundImage: `url('${imagenFrase3}')`,
          filter: 'brightness(60%)',
          backgroundSize: 'cover'
        }"
      ></div>

      <!-- Texto encima del fondo -->
      <span
        class="relative vertical-align-middle text-white text-center font-bold uppercase text-2xl py-4"
      >
        RESPONSABILIDAD, COMPROMISO, CONFIANZA
      </span>
      <span
        class="relative vertical-align-middle text-white text-center font-bold uppercase text-2xl py-4"
      >
        ¿Por qué hacerlo con nosotros? Porque ahorramos tu tiempo, evitamos filas y desplazamientos,
        y garantizamos un trámite ágil, confiable y 100% legal.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { ref, computed } from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import MapInmueble from '@/components/MapInmuebles.vue'
import { useRouter } from 'vue-router'
import { getFotoPrincipal } from '@/helpers/randomFunctions'
import { useAuthStore } from '@/stores/auth'
import type { homeFilters } from '@/interfaces/types'
import type { LocationQuery } from 'vue-router'

const authStore = useAuthStore()
const useInmueble = useInmuebleStore()
const router = useRouter()

const imagenFrase3 = ref('/carrusel/carrusel-imagen-2.png')

const form = ref<homeFilters>({
  tipoSeleccionado: null,
  ciudadSeleccionada: null,
  palabraClave: null,
  precioDesde: null,
  precioHasta: null,
  dormitorios: null,
  banos: null,
  area: null,
  caracteristicasEspeciales: null,
  presupuesto: null
})

const imagenesCarrusel = ref([
  {
    name: 'Imagen 1',
    image: 'carrusel-imagen-1.png'
  },
  {
    name: 'Imagen 2',
    image: 'carrusel-imagen-2.png'
  },
  {
    name: 'Imagen 3',
    image: 'carrusel-imagen-3.png'
  },
  {
    name: 'Imagen 4',
    image: 'carrusel-imagen-4.png'
  },
  {
    name: 'Imagen 5',
    image: 'carrusel-imagen-5.png'
  }
])

const companyData = computed(() => authStore.getCompanyData)

const listarFiltrosPersonalizados = async () => {
  const query: LocationQuery = {}

  if (form.value.tipoSeleccionado) query.tipoSeleccionado = String(form.value.tipoSeleccionado)
  if (form.value.ciudadSeleccionada)
    query.ciudadSeleccionada = String(form.value.ciudadSeleccionada)
  if (form.value.palabraClave) query.palabraClave = form.value.palabraClave
  if (form.value.precioDesde) query.precioDesde = String(form.value.precioDesde)
  if (form.value.precioHasta) query.precioHasta = String(form.value.precioHasta)
  if (form.value.dormitorios) query.dormitorios = String(form.value.dormitorios)
  if (form.value.banos) query.banos = String(form.value.banos)
  if (form.value.area) query.area = form.value.area
  if (form.value.caracteristicasEspeciales)
    query.caracteristicasEspeciales = form.value.caracteristicasEspeciales
  if (form.value.presupuesto) query.presupuesto = String(form.value.presupuesto)

  router.push({
    name: 'listadoInmuebles',
    query
  })
}

const abrirInmueble = (id: string) => {
  router.push({
    name: 'detalleInmueble',
    query: {
      inmueble: id
    }
  })
}

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style scoped>
.card-inmueble:hover {
  filter: brightness(60%);
  background-color: #e20d0d;
}
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  font-weight: bold;
  color: white;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
}
</style>
