<template>
    <div class="card bg-white text-white">
        <div class="w-12 md:w-10 mx-auto text-2xl p-4"
            :style="{ backgroundColor: companyData?.colorSecundario }">
            NUESTROS SERVICIOS
        </div>
        <div class="w-12 md:w-10 mx-auto" :style="{ backgroundColor: companyData?.colorPrimario }">
            <div class="grid mx-auto p-4">
                <div class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Avalúo comercial y corporativo</h2>
                    <hr>
                    <p class="text-justify mt-4">Este servicio consiste en la evaluación del valor económico de
                        propiedades o activos comerciales e industriales. A través de estudios detallados que incluyen
                        análisis del mercado, características físicas del inmueble y su entorno, el avalúo ofrece un
                        valor preciso para la compra, venta, inversión o financiación de bienes inmuebles o activos
                        empresariales.</p>
                </div>
                <div class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/avaluo-comercial.png" alt="Avalúo comercial y corporativo" Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Avalúo comercial y corporativo')" />
                    </div>
                </div>
                <div v-if="isMobile" class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Mediciones topográficas – ALIADO</h2>
                    <hr>
                    <p class="text-justify mt-4">Se refiere a la realización de estudios y levantamientos topográficos
                        para determinar las características físicas y geográficas de un terreno. Estas mediciones
                        permiten conocer con exactitud la superficie, contorno, inclinación y elevación del terreno,
                        fundamentales para proyectos de construcción, urbanización, infraestructura y estudios de
                        impacto ambiental.</p>
                </div>
                <div v-if="isMobile" class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/mediciones-topograficas.png" alt="Mediciones topográficas – ALIADO"
                            Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Mediciones topográficas – ALIADO')" />
                    </div>
                </div>
                <div v-if="!isMobile" class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/mediciones-topograficas.png" alt="Mediciones topográficas – ALIADO"
                            Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Mediciones topográficas – ALIADO')" />
                    </div>
                </div>
                <div v-if="!isMobile" class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Mediciones topográficas – ALIADO</h2>
                    <hr>
                    <p class="text-justify mt-4">Se refiere a la realización de estudios y levantamientos topográficos
                        para determinar las características físicas y geográficas de un terreno. Estas mediciones
                        permiten conocer con exactitud la superficie, contorno, inclinación y elevación del terreno,
                        fundamentales para proyectos de construcción, urbanización, infraestructura y estudios de
                        impacto ambiental.</p>
                </div>
                <div class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Asesoría y alquiler de maquinaria amarilla</h2>
                    <hr>
                    <p class="text-justify mt-4">Este servicio ofrece tanto la consultoría sobre el tipo de maquinaria
                        pesada adecuada para un proyecto de construcción o movimiento de tierras, como la posibilidad de
                        alquilar equipos como excavadoras, retroexcavadoras, tractores, motoniveladoras y grúas. La
                        asesoría incluye la selección del equipo según las necesidades específicas del proyecto para
                        optimizar tiempo y recursos.</p>
                </div>
                <div class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/asesoria-alquiler-maquinaria.png"
                            alt="Asesoría y alquiler de maquinaria amarilla" Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Asesoría y alquiler de maquinaria amarilla')" />
                    </div>
                </div>
                <div v-if="isMobile" class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Paisajismo de plantas ornamentales, bosque nativo,
                        frutales y árboles maderable</h2>
                    <hr>
                    <p class="text-justify mt-4">Este servicio abarca el diseño, implementación y mantenimiento de
                        espacios verdes. Involucra la selección de plantas ornamentales para embellecimiento, así como
                        la preservación de bosques nativos y la plantación de frutales y árboles maderables,
                        contribuyendo a la conservación ambiental y al aprovechamiento sostenible del espacio natural.
                    </p>
                </div>
                <div v-if="isMobile" class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/paisajismo.png"
                            alt="Paisajismo de plantas ornamentales, bosque nativo, frutales y árboles maderable"
                            Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Paisajismo de plantas ornamentales, bosque nativo, frutales y árboles maderable')" />
                    </div>
                </div>
                <div v-if="!isMobile" class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/paisajismo.png"
                            alt="Paisajismo de plantas ornamentales, bosque nativo, frutales y árboles maderable"
                            Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Paisajismo de plantas ornamentales, bosque nativo, frutales y árboles maderable')" />
                    </div>
                </div>
                <div v-if="!isMobile" class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Paisajismo de plantas ornamentales, bosque nativo,
                        frutales y árboles maderable</h2>
                    <hr>
                    <p class="text-justify mt-4">Este servicio abarca el diseño, implementación y mantenimiento de
                        espacios verdes. Involucra la selección de plantas ornamentales para embellecimiento, así como
                        la preservación de bosques nativos y la plantación de frutales y árboles maderables,
                        contribuyendo a la conservación ambiental y al aprovechamiento sostenible del espacio natural.
                    </p>
                </div>
                <div class="col-12 md:col-8">
                    <h2 id="avaluoComercial" class="text-white">Asesoría tributaria</h2>
                    <hr>
                    <p class="text-justify mt-4">Especializado en el sector inmobiliario, este servicio ofrece
                        consultoría fiscal para optimizar la carga tributaria de empresas o inversionistas
                        inmobiliarios. Incluye planificación fiscal, revisión de impuestos sobre la propiedad y
                        transacciones, y el cumplimiento normativo para maximizar la eficiencia en la gestión de bienes
                        inmuebles dentro del marco legal.</p>
                </div>
                <div class="col-12 md:col-4">
                    <div class="text-center servicio">
                        <img src="/servicios/asesoria-tributaria.png" alt="Asesoría tributaria" Width="100%">
                        <ButtonPrime class="my-4" severity="primary" label="Escríbenos" icon="pi pi-whatsapp"
                            @click="abrirChatWhatsappAsesor('Asesoría tributaria')" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMobileDetection } from '@/composables/useGlobal'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const { isMobile } = useMobileDetection();

const companyData = computed(() => authStore.getCompanyData);

const abrirChatWhatsappAsesor = (servicio: string) => {
    window.open(`https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20el%20servicio%20${servicio},%20que%20vi%20en%20su%20sitio%20web`, '_blank')
}
</script>

<style scoped>
.servicio {
    position: relative
}

.servicio img {
    border-radius: 10px;
    filter: brightness(40%);
}

.servicio button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.servicio button:hover {
    transition: .8s;
    transform: scale(1.05) translate(-50%, -50%);
}
</style>