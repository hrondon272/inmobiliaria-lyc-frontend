<template>
  <div class="card text-white" :style="{ backgroundColor: companyData?.colorTerciario }">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-2xl p-4"
      :style="{ backgroundColor: companyData?.colorSecundario }"
    >
      QUIENES SOMOS
    </div>
    <div class="w-12 md:w-10 mx-auto" :style="{ backgroundColor: companyData?.colorPrimario }">
      <div class="grid mx-auto p-4">
        <div class="col-12 md:col-6">
          <div class="text-center servicio">
            <img
              src="/servicios/avaluo-comercial.png"
              alt="Avalúo comercial y corporativo"
              Width="100%"
            />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <h2 class="text-2xl font-bold">Historia de Inmobiliaria Aguirre</h2>
          <p class="text-justify mt-4">
            El 21 de julio de 2021, en el municipio de Segovia, Antioquia, nació Inmobiliaria
            Aguirre, una empresa familiar que desde sus inicios ha buscado hacer más fácil y
            confiable el proceso de arrendar, administrar y vender propiedades.
          </p>
          <p class="text-justify mt-4">
            Fundada de manera empírica, con un conocimiento profundo de la realidad local y las
            necesidades de la comunidad, Inmobiliaria Aguirre fue concebida como una respuesta a la
            falta de infraestructura inmobiliaria en una población que, en ese momento, no estaba
            completamente educada ni preparada para aceptar el concepto de una inmobiliaria
            tradicional. Pioneros en la región, entendimos desde el principio que el camino no sería
            sencillo. La desconfianza y la falta de familiaridad con los servicios inmobiliarios
            eran obstáculos que tuvimos que superar. Sin embargo, nuestra visión fue clara: ofrecer
            un servicio transparente, cercano y basado en la confianza. Con un enfoque genuino hacia
            la comunidad, fuimos ganando poco a poco su confianza, brindando soluciones accesibles,
            claras y eficaces que facilitaran la gestión de propiedades y mejoraran la calidad de
            vida de los segovianos.
          </p>
          <p class="text-justify mt-4">
            Hoy, Inmobiliaria Aguirre se ha consolidado como un referente en el sector inmobiliario
            local. Gracias a nuestro compromiso y dedicación, hemos logrado que la comunidad de
            Segovia no solo se familiarice con el concepto de una inmobiliaria, sino que también
            confíe plenamente en nuestros servicios.
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
