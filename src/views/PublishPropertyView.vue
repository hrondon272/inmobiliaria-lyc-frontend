<template>
  <div class="card bg-white text-white">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-2xl p-4"
      :style="{ backgroundColor: companyData?.colorSecundario }"
    >
      Publica aquí tu inmueble
    </div>
    <create-edit-inmueble v-model="modelo" :isEditing="isEditing" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreateEditInmueble from '../components/CreateEditInmueble.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const modelo = ref([])
const isEditing = ref(false)

const companyData = computed(() => authStore.getCompanyData)
</script>
