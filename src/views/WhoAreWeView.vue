<template>
    <div class="card bg-white text-white">
        <div class="w-12 md:w-10 mx-auto text-2xl p-4"
            :style="{ backgroundColor: companyData?.colorSecundario }">
            QUIENES SOMOS
        </div>
        <div class="w-12 md:w-10 mx-auto" :style="{ backgroundColor: companyData?.colorPrimario }">
            <div class="grid mx-auto p-4">
                <div class="col-12 md:col-6">
                    <div class="text-center servicio">
                        <img src="/servicios/avaluo-comercial.png" alt="Avalúo comercial y corporativo" Width="100%">
                    </div>
                </div>
                <div class="col-12 md:col-6">
                    <p class="text-justify mt-4">Terra Realtor es una inmobiliaria que se dedica a la comercialización,
                        avalúos, y desarrollo de proyectos constructivos en el oriente antioqueño, con una experiencia
                        de 10 años. Nuestra misión es proporcionar soluciones inmobiliarias innovadoras, personalizadas
                        que superen las expectativas del cliente. Brindamos exclusividad en asesoría profesional de
                        materialidad, estructuras diseño arquitectónico y zonificación.</p>
                    <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                        @click="abrirChatWhatsappAsesor" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const companyData = computed(() => authStore.getCompanyData);

const abrirChatWhatsappAsesor = () => {
    window.open(`https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20ustedes`, '_blank')
}
</script>