<template>
  <div id="propertiesMap" class="w-10 mx-auto"></div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { ref, onMounted, nextTick, computed } from 'vue'
import L from 'leaflet'
import { useInmuebleStore } from '@/stores/inmueble'
import { getFotoPrincipal, getPrecio } from '@/helpers/randomFunctions'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const useInmueble = useInmuebleStore()

const leafletMap = ref<L.Map>()
const companyData = computed(() => authStore.getCompanyData)

onMounted(async () => {
  await useInmueble.fetchInmuebles({ disponible: true }, 1, 100)
  nextTick(() => {
    const mapContainer = document.getElementById('propertiesMap')
    if (mapContainer) {
      initLeafletMap()
    } else {
      console.error('Map container not found.')
    }
  })
})

const initLeafletMap = () => {
  leafletMap.value = L.map('propertiesMap', {
    center: new L.LatLng(4.733120387754163, -74.08196395655861),
    zoom: 7
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap.value)

  const icono = L.icon({
    iconUrl: 'icono.ico',
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  })

  useInmueble.inmuebles.forEach((item) => {
    if (leafletMap.value) {
      L.marker([item?.coordenadas?.latitud || 0, item?.coordenadas?.longitud || 0], {
        icon: icono
      }).addTo(leafletMap.value).bindPopup(`
        <div class="propiedad">
          <a 
            href="/detalle-inmueble?inmueble=${item.id}"
            target="_blank"
            title="Ver inmueble"
          >
            <img src="${getFotoPrincipal(item)}" alt="Inmuebles" width="100" height="100" >
          </a>
          <p id="nombreInmueble">${item.nombre}</p>
          <div style="background-color: ${companyData?.value?.colorPrimario || '#000'}; color: #FFF; margin-bottom: 25px;">
            <p id="precioInmueble">${getPrecio(parseFloat(item.precio) || 0)}</p>
          </div>
          <a 
            href="https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=me%20interesa%20la%20propiedad%3A%20${item.nombre}"
            style=" background-color: ${companyData?.value?.colorSecundario || '#000'};
                    color: #FFF;
                    cursor: pointer;
                    padding: 10px;
                    text-decoration: none;
                    border-radius: 6px;"
            target="_blank"
          >
            Abrir chat de WhatsApp
          </a>
        </div>
        `)
    }
  })
}
</script>

<style scoped>
#propertiesMap {
  width: 100%;
  height: 600px;
  z-index: 1;
}
</style>
