<template>
  <div class="grid mb-8">
    <div :class="['col-12 md:col-3 text-center', invertir ? 'md:order-2' : 'md:order-1']">
      <img :src="imagen" :alt="titulo" class="w-6 md:w-full border-round-xl" />
    </div>

    <div :class="['col-12 md:col-9', invertir ? 'md:order-1' : 'md:order-2']">
      <h2 class="text-xl md:text-3xl font-bold">{{ titulo }}</h2>
      <hr class="my-2" />
      <p class="text-justify mt-4" v-for="(p, index) in descripcion" :key="index">
        {{ p }}
      </p>
      <div class="text-center">
        <ButtonPrime
          class="mt-4"
          severity="primary"
          label="Escríbenos"
          icon="pi pi-whatsapp"
          @click="abrirChatWhatsappAsesor()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  titulo: string
  descripcion: string[]
  imagen: string
  invertir?: boolean
}>()

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)

const abrirChatWhatsappAsesor = () => {
  const mensaje = `Hola, me interesa el servicio ${props.titulo}, que vi en su sitio web`
  window.open(
    `https://api.whatsapp.com/send?phone=${companyData.value?.telefono}&text=${encodeURIComponent(mensaje)}`,
    '_blank'
  )
}
</script>
