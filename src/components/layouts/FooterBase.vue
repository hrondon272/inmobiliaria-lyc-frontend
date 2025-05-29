<template>
  <hr />
  <div
    class="card flex justify-center text-white"
    :style="{ backgroundColor: companyData?.colorPrimario }"
  >
    <footer class="mt-3 bg-gray-900 w-full text-center py-3">
      <i class="pi pi-mobile mr-1"></i>
      Llámanos {{ companyData?.telefono }} - 3008743754
      <div class="text-xs md:text-xl"></div>
      <h2>Visitanos en redes sociales</h2>
      <div
        class="flex align-items-center justify-content-center bg-primary border-round gap-1 my-2"
      >
        <div v-for="(item, index) in companyData?.redes_sociales" :key="index">
          <ButtonPrime
            :icon="item.icono"
            :href="item.link"
            :style="{ backgroundColor: item.color }"
            :aria-label="item.nombre"
            outlined
            text
            raised
            target="_blank"
            rel="noopener"
          />
        </div>
      </div>
      <p>
        {{ companyData?.compania }} - Todos los Derechos Reservados - &copy;
        {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)
</script>
