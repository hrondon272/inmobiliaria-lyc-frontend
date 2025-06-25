<template>
  <div class="w-full" :style="{ backgroundColor: companyData?.colorPrimario }">
    <map-inmueble />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import MapInmueble from '@/components/MapInmuebles.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)
</script>
