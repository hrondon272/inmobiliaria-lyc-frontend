<template>
  <hr />
  <div
    class="card flex justify-center text-white"
    :style="{ backgroundColor: companyData?.colorPrimario }"
  >
    <footer class="mt-3 bg-gray-900 w-full text-center py-3">
      <div class="grid mx-auto p-4">
        <div class="col-12 md:col-6">
          <p class="text-xl text-white font-semibold text-center mb-2">Contáctanos</p>
          <i class="pi pi-mobile mr-1"></i>
          Llámanos {{ companyData?.telefono }} - 3008743754
          <p>{{ companyData?.email }}</p>
          <p class="mt-2 text-xl">Visítanos en redes sociales</p>
          <div v-for="(item, index) in companyData?.redes_sociales" :key="index">
            <ButtonPrime
              :icon="item.icono"
              :href="item.link"
              :style="{ backgroundImage: item.color, color: '#FFF', margin: '4px' }"
              :aria-label="item.nombre"
              v-tooltip.bottom="item.nombre"
              outlined
              text
              raised
              target="_blank"
              rel="noopener"
              @click="navegarA(item.link)"
            />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <p class="text-xl text-white font-semibold text-center mb-2">Horario de atención</p>
          <p>
            <span class="font-bold">Lunes a viernes: </span>
            <span style="display: block">8:00 AM - 12:00 PM</span>
            <span>2:00 PM - 05:30 PM</span>
          </p>
          <p>
            <span class="font-bold">Sábado: </span>
            <span>08:00 AM - 12:00 PM</span>
          </p>
          <p>
            <span class="font-bold">Domingo: </span>
            <span>No laboramos</span>
          </p>
        </div>
      </div>
      <p class="p-1">
        {{ companyData?.compania }} - Todos los Derechos Reservados - &copy;
        {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)

const navegarA = (link: string) => {
  window.open(link, '_blank')
}
</script>
