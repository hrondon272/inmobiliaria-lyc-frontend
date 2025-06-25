<template>
  <div class="card">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-5xl p-4"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      MISIÓN Y VISIÓN
    </div>
    <div
      class="w-12 md:w-10 mx-auto text-center"
      :style="{ backgroundColor: companyData?.colorPrimario, color: '#2c3e50' }"
    >
      <div class="grid mx-auto p-4 md:gap-3">
        <div class="col-12 lg:col-5 mx-auto">
          <img src="/mision.png" alt="Misión LYC" class="w-12 lg:w-7 mx-auto border-circle" />
          <h2 class="font-bold text-4xl">Misión</h2>
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre, nuestra misión es brindar soluciones inmobiliarias confiables,
            transparentes y responsables, que respondan a las necesidades reales de la comunidad de
            Segovia. Como pioneros en el municipio, durante estos 4 años hemos trabajado con
            paciencia, compromiso y vocación de servicio, educando a nuestros clientes y generando
            confianza a través de resultados concretos. Nuestro propósito es seguir construyendo un
            mercado inmobiliario sólido y profesional, donde cada cliente se sienta acompañado,
            informado y seguro al tomar decisiones sobre su patrimonio.
          </p>
          <ButtonPrime
            class="my-4"
            severity="primary"
            label="Escríbenos"
            icon="pi pi-whatsapp"
            @click="abrirChatWhatsappAsesor"
          />
        </div>
        <div class="col-12 lg:col-5 mx-auto">
          <img src="/vision.jpg" alt="Visión LYC" class="w-12 lg:w-7 mx-auto border-circle" />
          <h2 class="font-bold text-4xl">Visión</h2>
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre L y C nos proyectamos como una empresa en constante crecimiento,
            con el objetivo de ampliar nuestra presencia en nuevos territorios y consolidarnos como
            referentes del sector inmobiliario en la región. Buscamos mejorar en todos los sentidos:
            en la calidad de nuestros servicios, en la atención al cliente y en la eficiencia de
            nuestros procesos, apostándole siempre a la formación continua y a la actualización
            profesional. Nuestra visión es seguir avanzando con responsabilidad, manteniendo
            nuestros valores y fortaleciendo nuestro conocimiento para brindar un servicio cada vez
            más completo, confiable y cercano a las necesidades del mercado.
          </p>
          <ButtonPrime
            class="my-4"
            severity="primary"
            label="Escríbenos"
            icon="pi pi-whatsapp"
            @click="abrirChatWhatsappAsesor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)

const abrirChatWhatsappAsesor = () => {
  window.open(
    `https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20ustedes`,
    '_blank'
  )
}
</script>
