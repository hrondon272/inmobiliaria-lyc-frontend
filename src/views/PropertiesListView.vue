<template>
  <div class="card bg-white text-white">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-3xl md:text-5xl p-4"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      LISTA DE INMUEBLES
    </div>
    <div
      class="w-12 md:w-10 mx-auto p-3 md:p-4"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      <div
        v-if="inmuebles.length === 0"
        class="flex flex-column text-lg my-4 py-4 justify-content-center align-items-center"
        style="min-height: 300px"
      >
        <p class="text-5xl text-black-alpha-90">Sin resultados...</p>
        <ButtonPrime
          class="mt-4 text-black-alpha-90"
          type="button"
          label="Mostrar todos los inmuebles"
          severity="primary"
          @click="mostrarTodos"
        />
      </div>
      <div v-else>
        <div class="formgrid grid">
          <div
            v-for="inmueble in inmuebles"
            :key="inmueble.id"
            class="field col-12 md:col-6 lg:col-4 xl:col-3 mt-2"
          >
            <Card
              :style="{
                backgroundColor: companyData?.colorTerciario,
                boxShadow: '0px 5px 15px ' + companyData?.colorSecundario
              }"
            >
              <template #content>
                <div class="relative">
                  <img :src="getFotoPrincipal(inmueble) || ''" alt="Image" class="media-preview" />
                  <div class="text-center text-sm">
                    <h2>{{ inmueble.nombre }}</h2>
                    <h3>{{ inmueble.ciudad }}</h3>
                    <div :style="{ backgroundColor: companyData?.colorPrimario }">
                      <h3 class="text-black-alpha-90 font-semibold text-2xl">
                        $ {{ getPrecio(parseFloat(inmueble.precio)) }} COP
                      </h3>
                    </div>
                  </div>
                  <div class="flex mt-4">
                    <div class="flex-1 text-left">Dormitorios</div>
                    <div class="flex-1 text-right">{{ inmueble.cantidadDormitorios }}</div>
                  </div>
                  <hr />
                  <div class="flex">
                    <div class="flex-1 text-left">Área</div>
                    <div class="flex-1 text-right">{{ inmueble.areaMetrosCuadrados }} mt2</div>
                  </div>
                  <div class="text-center my-2">
                    <ButtonPrime
                      :style="{
                        backgroundColor: companyData?.colorSecundario,
                        border: 'none'
                      }"
                      type="button"
                      icon="pi pi-eye"
                      label="Ver inmueble"
                      severity="primary"
                      @click="verInmueble(inmueble.id)"
                    />
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <Paginator
          :rows="rowsPerPage"
          :totalRecords="totalInmuebles"
          :rowsPerPageOptions="rowsPerPageOptions"
          @page="actualizarPagina($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import { useToast } from '@/plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import { useRoute, useRouter } from 'vue-router'
import { getFotoPrincipal, getPrecio } from '@/helpers/randomFunctions'
import { useAuthStore } from '@/stores/auth'
import type { filtrosAvanzadosType } from '@/interfaces/types'
import type { LocationQuery } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const loaderStore = useLoaderStore()
const useInmueble = useInmuebleStore()
const { showMessage } = useToast()

const page = ref(1)
const rowsPerPage = ref(10)
const rowsPerPageOptions = ref([3, 5, 10, 20, 50, 100])

const companyData = computed(() => authStore.getCompanyData)
const inmuebles = computed(() => useInmueble.lista)
const totalInmuebles = computed(() => useInmueble.totalInmuebles)

const filtrosAvanzados = ref({
  precioDesde: null,
  precioHasta: null,
  dormitorios: null,
  banos: null,
  area: null,
  caracteristicasEspeciales: null
} as filtrosAvanzadosType)

onMounted(async () => {
  const query: LocationQuery = route.query
  fetchInmuebles(query)
})

const actualizarPagina = (event: any) => {
  if (rowsPerPage.value !== event.rows) {
    rowsPerPage.value = event.rows
    page.value = 1
  } else {
    page.value = event.page + 1
  }
  fetchInmuebles()
}

const fetchInmuebles = async (filtrosDefault: any = {}) => {
  let filtros = Object.keys(filtrosDefault).length > 0 ? filtrosDefault : filtrosAvanzados.value
  filtros = removerFiltrosNulos(filtros)

  if (Object.keys(filtros).length > 0) {
    router.replace({
      name: 'listadoInmuebles',
      query: filtros
    })
  }

  await loaderStore?.setLoading(true)
  const status = await useInmueble.fetchInmuebles(filtros, page.value, rowsPerPage.value)
  await loaderStore?.setLoading(false)

  if (status !== 200)
    showMessage(
      'error',
      'Error',
      'Por favor vuelva a intentar o comuníquese con nuestro equipo',
      10000
    )
}

const removerFiltrosNulos = (filtros: any) => {
  return Object.fromEntries(
    Object.entries(filtros)
      .filter(([, v]) => v !== null)
      .map(([key, value]) => [key, String(value)])
  )
}

const mostrarTodos = () => {
  router.replace({
    name: 'listadoInmuebles'
  })
  reiniciarFiltrosAvanzados()
  fetchInmuebles({})
}

const reiniciarFiltrosAvanzados = () => {
  filtrosAvanzados.value = {
    precioDesde: null,
    precioHasta: null,
    dormitorios: null,
    banos: null,
    area: null,
    caracteristicasEspeciales: null
  }
}

const verInmueble = (id: string) => {
  router.push({
    name: 'detalleInmueble',
    query: {
      inmueble: id
    }
  })
}
</script>
