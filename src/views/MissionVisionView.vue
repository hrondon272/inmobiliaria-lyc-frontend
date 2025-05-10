<template>
  <div class="card bg-white text-white">
    <div
      class="w-12 md:w-10 mx-auto text-2xl p-4"
      :style="{ backgroundColor: companyData?.colorSecundario }"
    >
      MISIÓN Y VISIÓN
    </div>
    <div class="w-12 md:w-10 mx-auto" :style="{ backgroundColor: companyData?.colorPrimario }">
      <div class="grid mx-auto p-4">
        <div class="col-12 md:col-6">
          <div class="text-center servicio">
            <img src="/servicios/asesoria-tributaria.png" alt="Misión y visión" Width="100%" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <h2 class="font-bold">Misión</h2>
          <p class="text-justify mt-4">
            En Terra Realtor, nos apasiona conectar a las personas con propiedades únicas que
            representen su estilo de vida y sus aspiraciones. Nos especializamos en ofrecer un
            portafolio cuidadosamente seleccionado de fincas, lotes, apartamentos y casas ubicadas
            en las zonas más estratégicas y deseadas del oriente antioqueño, como Llanogrande, El
            Retiro, La Ceja, El Carmen de Viboral y Rionegro. A través de una asesoría
            personalizada, confiable y profesional, trabajamos para garantizar que cada cliente
            encuentre no solo una propiedad, sino un espacio que pueda llamar hogar, convirtiendo
            cada inversión en una experiencia gratificante y significativa.
          </p>
          <h2 class="mt-4 font-bold">Visión</h2>
          <p class="text-justify mt-4">
            Para el año 2028, nos consolidaremos como la inmobiliaria líder en la venta de
            propiedades de lujo en el oriente antioqueño, siendo reconocidos por nuestra excelencia
            en el servicio y nuestra capacidad para anticiparnos a las necesidades de nuestros
            clientes. Con un enfoque en la exclusividad y el alto valor de nuestras propiedades,
            aspiramos a ser el aliado de confianza para quienes buscan un hogar que refleje su
            estilo de vida o una inversión segura. Nuestra meta es construir relaciones sólidas y
            duraderas, guiando a cada cliente con dedicación y compromiso hacia su hogar soñado o su
            próxima gran inversión.
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
    window.open(`https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20ustedes`, '_blank')
}
</script>
