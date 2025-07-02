<template>
  <div class="card bg-white relative" style="z-index: 1; margin-top: -72px">
    <div class="first-div-button-carrusel">
      <div class="second-div-button-carrusel">
        <ButtonPrime
          v-for="type in companyData?.tipos_inmuebles || []"
          :key="type.id"
          variant="outlined"
          @click="goToRoute(type.id)"
          :label="type.descripcion"
          :icon="type.icono"
          class="button-carrusel-class"
          iconPos="top"
          :title="type.descripcion"
          id="button-carrusel-id"
        />
      </div>
    </div>
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
        <div class="rounded p-0 relative z-1">
          <img
            :src="'/carrusel/' + slotProps.data.image"
            :alt="slotProps.data.name"
            class="w-full z-1 image-carrusel"
            style="object-fit: cover"
          />
        </div>
      </template>
    </Carousel>
    <div class="w-12 md:w-10 mx-auto">
      <div>
        <div
          class="text-center my-4 font-bold uppercase text-4xl py-4 h-10rem"
          style="color: #2c3e50"
        >
          RESPONSABILIDAD, COMPROMISO, CONFIANZA
          <i class="pi pi-check-circle text-4xl ml-2"></i>
        </div>
        <div class="text-center my-6 font-bold uppercase text-2xl" style="color: #2c3e50">
          UBICACIÓN
          <i class="pi pi-map-marker text-2xl"></i>
        </div>
        <div class="text-center">
          <video playsinline src="/ubicacion.mp4" class="h-30rem" autoplay controls></video>
        </div>
        <div
          class="py-2 px-4 mt-6 text-3xl font-bold text-center"
          :style="{ backgroundColor: companyData?.colorPrimario, color: '#2c3e50' }"
        >
          ¡ENCUENTRA AQUÍ EL INMUEBLE DE TUS SUEÑOS!
          <i class="pi pi-search text-4xl ml-2"></i>
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
          class="py-2 px-4 mt-2 text-3xl font-bold text-center"
          :style="{ backgroundColor: companyData?.colorPrimario, color: '#2c3e50' }"
        >
          LISTA DESTACADOS
          <i class="pi pi-list-check text-4xl ml-2"></i>
        </div>
      </div>
      <div class="grid mb-4">
        <div
          v-for="inmueble in useInmueble.inmuebles.slice(0, 3)"
          :key="inmueble.id"
          class="col-11 lg:col-4 mx-auto card-inmueble"
          v-tooltip="'Abrir'"
        >
          <Card class="card-home" :style="{ backgroundColor: 'transparent' }">
            <template #header>
              <div class="header-container">
                <p class="card-title">{{ inmueble?.nombre }}</p>
                <img
                  class="cursor-pointer"
                  alt="user header"
                  :src="getFotoPrincipal(inmueble) || ''"
                  style="width: 100%; height: 300px; object-fit: cover"
                  @click="abrirInmueble(inmueble.id)"
                />
              </div>
            </template>
          </Card>
        </div>
        <div
          v-for="inmueble in useInmueble.inmuebles.slice(3, 7)"
          :key="inmueble.id"
          class="col-11 lg:col-3 mx-auto card-inmueble"
          v-tooltip="'Abrir'"
        >
          <Card class="card-home" :style="{ backgroundColor: 'transparent' }">
            <template #header>
              <div class="header-container">
                <p class="card-title">{{ inmueble?.nombre }}</p>
                <img
                  class="cursor-pointer"
                  alt="user header"
                  :src="getFotoPrincipal(inmueble) || ''"
                  style="width: 100%; height: 300px; object-fit: cover"
                  @click="abrirInmueble(inmueble.id)"
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <map-inmueble />
    <p class="m-5 text-center">
      <span class="relative font-bold uppercase text-4xl py-2 block mb-4" style="color: #2c3e50">
        ¿Por qué hacerlo con nosotros?
        <i class="pi pi-question-circle text-5xl ml-2"></i>
      </span>

      <span class="relative xs:text-xl lg:text-2xl lg:mx-5 block mb-4" style="color: #2c3e50">
        Porque tu tranquilidad es nuestra prioridad. En Inmobiliaria Aguirre L&C entendemos que
        gestionar una propiedad no solo implica números, contratos y trámites; también implica
        tiempo, confianza y decisiones importantes. Nos encargamos de todo el proceso con
        profesionalismo, cercanía y compromiso, para que tú te enfoques en lo que realmente importa.
        Olvídate de las preocupaciones: te ayudamos a rentabilizar tu propiedad sin complicaciones,
        con procesos claros, seguros y 100% legales.
      </span>
      <span class="relative sm:text-xl lg:text-2xl lg:mx-5" style="color: #2c3e50">
        Gestionamos con responsabilidad, trabajamos con el corazón.
        <i class="pi pi-heart text-2xl"></i>
      </span>
    </p>
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
    image: 'carrusel-imagen-4.jpg'
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

function goToRoute(id: string) {
  router.push({ name: 'listadoInmuebles', query: { tipoSeleccionado: id } })
}
</script>

<style>
.image-carrusel {
  height: 40rem;
}
.first-div-button-carrusel {
  top: 22rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: absolute;
  z-index: 5;
  padding: 0;
}
.second-div-button-carrusel {
  margin: 0 auto;
  text-align: center;
  padding: 0;
}
.button-carrusel-class {
  margin: 0.5rem !important;
  border-radius: 0.5rem !important;
  padding: 5px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #363636 !important;
  background-color: #fff !important;
  border: 1px solid #363636 !important;
  width: 7rem !important;
}
#button-carrusel-id .p-button-icon {
  font-size: 40px !important;
}

.card-home {
  border: none !important;
  box-shadow: none !important;
}

.card-home .header-container {
  position: relative;
}

.card-home img {
  filter: brightness(80%);
  display: block;
  border-radius: 0.5rem !important;
}

.card-home img:hover {
  filter: brightness(60%);
}

.card-home .card-title {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
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
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  max-width: 70%;
}
@media (max-width: 960px) {
  .image-carrusel {
    height: 20rem;
  }
  .first-div-button-carrusel {
    top: 7rem;
  }
  .button-carrusel-class {
    font-size: 10px !important;
    width: 6rem !important;
  }
  #button-carrusel-id .p-button-icon {
    font-size: 20px !important;
  }
}
@media (max-width: 656px) {
  .first-div-button-carrusel {
    top: 5rem;
    padding: 0;
  }
  .button-carrusel-class {
    font-size: 9px !important;
    width: 4rem !important;
  }
  #button-carrusel-id .p-button-icon {
    font-size: 16px !important;
  }
}
</style>
