<template>
  <div class="card">
    <div class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-5xl p-4">
      NUESTROS SERVICIOS
    </div>
    <div class="w-12 md:w-10 mx-auto" :style="{ backgroundColor: companyData?.colorPrimario }">
      <div class="grid mx-auto p-4">
        <div class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">Admnistracion de Inmuebles</h2>
          <hr />
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre, facilitamos el proceso de arrendar propiedades con un enfoque
            claro y directo. Ofrecemos asesoría personalizada, gestionamos los trámites legales y
            nos encargamos de la administración de pagos. Sabemos que el arrendamiento puede tener
            desafíos, pero estamos aquí para ofrecer soluciones rápidas y transparentes, tanto para
            arrendadores como para arrendatarios. Nuestro compromiso es hacer el proceso lo más
            sencillo y seguro posible.
          </p>
        </div>
        <div class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/avaluo-comercial.png"
              alt="Admnistracion de Inmuebles"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Admnistracion de Inmuebles')"
            />
          </div>
        </div>
        <div v-if="isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">Servicio de arrendamiento</h2>
          <hr />
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre, te brindamos una solución integral para el arrendamiento de
            inmuebles en Segovia. A través de nuestra plataforma digital, podrás acceder a un
            portafolio completo de propiedades disponibles, eliminando la necesidad de realizar
            búsquedas puerta a puerta. Gracias a la virtualidad, podrás visualizar fotos,
            descripciones detalladas y características de cada inmueble, lo que te permitirá tomar
            decisiones informadas desde la comodidad de tu hogar. Lo que nos diferencia es que todos
            los inmuebles disponibles en nuestro portal son de nuestra administración directa, lo
            que garantiza que cada propiedad es real y está verificada. Evitamos los riesgos de
            fraudes y estafas relacionadas con inmuebles fantasmas, brindándote seguridad y
            confianza en todo el proceso. Adicionalmente, contamos con una oficina física en un
            punto estratégico de Segovia, para aquellos clientes que deseen una atención más
            personalizada o necesiten mayor cercanía y seguridad al realizar sus gestiones. En
            Inmobiliaria Aguirre, garantizamos un servicio transparente, seguro y eficiente para que
            tu experiencia de arrendamiento sea sencilla y confiable.
          </p>
        </div>
        <div v-if="isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/mediciones-topograficas.png"
              alt="Servicio de arrendamiento"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de arrendamiento')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/mediciones-topograficas.png"
              alt="Servicio de arrendamiento"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de arrendamiento')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">Servicio de arrendamiento</h2>
          <hr />
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre, te brindamos una solución integral para el arrendamiento de
            inmuebles en Segovia. A través de nuestra plataforma digital, podrás acceder a un
            portafolio completo de propiedades disponibles, eliminando la necesidad de realizar
            búsquedas puerta a puerta. Gracias a la virtualidad, podrás visualizar fotos,
            descripciones detalladas y características de cada inmueble, lo que te permitirá tomar
            decisiones informadas desde la comodidad de tu hogar. Lo que nos diferencia es que todos
            los inmuebles disponibles en nuestro portal son de nuestra administración directa, lo
            que garantiza que cada propiedad es real y está verificada. Evitamos los riesgos de
            fraudes y estafas relacionadas con inmuebles fantasmas, brindándote seguridad y
            confianza en todo el proceso. Adicionalmente, contamos con una oficina física en un
            punto estratégico de Segovia, para aquellos clientes que deseen una atención más
            personalizada o necesiten mayor cercanía y seguridad al realizar sus gestiones. En
            Inmobiliaria Aguirre, garantizamos un servicio transparente, seguro y eficiente para que
            tu experiencia de arrendamiento sea sencilla y confiable.
          </p>
        </div>
        <div class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">Venta de inmuebles</h2>
          <hr />
          <p class="text-justify mt-4">
            En Inmobiliaria Aguirre, ofrecemos un servicio de corretaje de inmuebles eficiente y
            transparente, tanto para quienes desean vender como para quienes buscan comprar
            propiedades en Segovia. Nos encargamos de todo el proceso de promocion y gestion del
            inmueble hasta la negociación y la gestión de la documentación necesaria, asegurando una
            transacción clara y segura. Gracias a nuestra experiencia en el mercado local, conocemos
            las necesidades de la comunidad y trabajamos para que cada venta se realice de manera
            ágil y sin complicaciones. Además, todos los inmuebles que gestionamos están debidamente
            verificados, lo que elimina riesgos de fraudes o problemas legales, brindando
            tranquilidad a nuestros clientes. Si estás interesado en comprar o vender, en
            Inmobiliaria Aguirre te ofrecemos un servicio integral que te acompaña en cada paso, con
            un enfoque profesional y confiable. Alianza en Servicios de Asesoría y Trámites
            Arquitectónicos ° En Inmobiliaria Aguirre, contamos con una alianza estratégica con un
            arquitecto local especializado en la gestión de trámites técnicos y profesionales. Esta
            colaboración nos permite ofrecer a nuestros clientes servicios adicionales como el
            desenglobamiento de terrenos y otros trámites técnicos relacionados con propiedades.
          </p>
          <p class="text-justify mt-4">
            Nuestro objetivo es garantizar que todos los procesos, desde la subdivisión de predios
            hasta la regularización de documentos legales y técnicos, se realicen de manera
            eficiente, rápida y conforme a la normativa vigente. Con esta alianza, brindamos un
            servicio más completo y seguro para quienes necesiten realizar gestiones adicionales,
            eliminando la incertidumbre y garantizando la legalidad de cada transacción. Alianza con
            Avaluador de Valoración Profesional de Inmuebles ° En Inmobiliaria Aguirre, contamos con
            una alianza estratégica con un avaluador profesional para ofrecerte una valoración
            precisa y objetiva de tus propiedades. Ya sea que necesites conocer el valor comercial
            de un inmueble para venta, compra o arrendamiento, nuestro experto en avalúos te
            proporcionará un informe detallado y ajustado a las condiciones del mercado local,
            garantizando transparencia y seguridad en cada transacción.
          </p>
        </div>
        <div class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/asesoria-alquiler-maquinaria.png"
              alt="Venta de inmuebles"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Venta de inmuebles')"
            />
          </div>
        </div>
        <div v-if="isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">
            Servicio de Corretaje para Captación de Inquilinos
          </h2>
          <hr />
          <p class="text-justify mt-4">
            En INMOBILIARIA AGUIRRE L Y C, entendemos que muchos propietarios prefieren mantener el
            control directo sobre la administración de sus inmuebles, pero desean contar con
            respaldo profesional a la hora de encontrar un inquilino confiable. Por eso ofrecemos
            nuestro servicio de corretaje especializado en la captación de arrendatarios, diseñado
            para facilitarle este proceso clave sin necesidad de delegar la administración del
            inmueble. ¿En qué consiste este servicio? Nos encargamos de todo el proceso de
            promoción, evaluación y selección del arrendatario ideal, asegurando que cumpla con
            todos los requisitos establecidos por nuestra inmobiliaria en términos de solvencia
            económica, estabilidad laboral y antecedentes. Una vez seleccionado el inquilino,
            realizamos: Publicación y difusión del inmueble en canales especializados. Visitas
            programadas y atención personalizada a interesados.
          </p>

          <p class="text-justify mt-4">
            Recopilación y análisis de documentación del arrendatario. Verificación de referencias
            personales, laborales y comerciales. Entrega al propietario del expediente completo del
            inquilino aprobado. ¿Qué recibe el propietario? Un inquilino cuidadosamente evaluado y
            validado por nuestro equipo. El primer canon de arrendamiento, como pago por el servicio
            de corretaje. Toda la documentación necesaria para firmar directamente el contrato de
            arrendamiento y asumir la administración del inmueble. Este modelo permite al
            propietario conservar el control total sobre su inmueble, mientras se asegura de iniciar
            la relación arrendaticia con una persona confiable y financieramente sólida.
          </p>
        </div>
        <div v-if="isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/paisajismo.png"
              alt="Servicio de Corretaje para Captación de Inquilinos"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de Corretaje para Captación de Inquilinos')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/paisajismo.png"
              alt="Servicio de Corretaje para Captación de Inquilinos"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de Corretaje para Captación de Inquilinos')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">
            Servicio de Corretaje para Captación de Inquilinos
          </h2>
          <hr />
          <p class="text-justify mt-4">
            En INMOBILIARIA AGUIRRE L Y C, entendemos que muchos propietarios prefieren mantener el
            control directo sobre la administración de sus inmuebles, pero desean contar con
            respaldo profesional a la hora de encontrar un inquilino confiable. Por eso ofrecemos
            nuestro servicio de corretaje especializado en la captación de arrendatarios, diseñado
            para facilitarle este proceso clave sin necesidad de delegar la administración del
            inmueble. ¿En qué consiste este servicio? Nos encargamos de todo el proceso de
            promoción, evaluación y selección del arrendatario ideal, asegurando que cumpla con
            todos los requisitos establecidos por nuestra inmobiliaria en términos de solvencia
            económica, estabilidad laboral y antecedentes. Una vez seleccionado el inquilino,
            realizamos: Publicación y difusión del inmueble en canales especializados. Visitas
            programadas y atención personalizada a interesados.
          </p>

          <p class="text-justify mt-4">
            Recopilación y análisis de documentación del arrendatario. Verificación de referencias
            personales, laborales y comerciales. Entrega al propietario del expediente completo del
            inquilino aprobado. ¿Qué recibe el propietario? Un inquilino cuidadosamente evaluado y
            validado por nuestro equipo. El primer canon de arrendamiento, como pago por el servicio
            de corretaje. Toda la documentación necesaria para firmar directamente el contrato de
            arrendamiento y asumir la administración del inmueble. Este modelo permite al
            propietario conservar el control total sobre su inmueble, mientras se asegura de iniciar
            la relación arrendaticia con una persona confiable y financieramente sólida.
          </p>
        </div>
        <div class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">Servicio de Asesoría Inmobiliaria</h2>
          <hr />
          <p class="text-justify mt-4">
            En INMOBILIARIA AGUIRRE L Y C ofrecemos un servicio integral de asesoría inmobiliaria,
            diseñado para orientar y acompañar a nuestros clientes en cada etapa del proceso de
            compraventa, arriendo o inversión en bienes raíces. Nuestro objetivo es brindar
            información clara, respaldo legal y orientación estratégica para que cada decisión
            inmobiliaria se tome con total confianza y seguridad. ¿A quién va dirigido? Propietarios
            que desean vender o arrendar su inmueble. Compradores o arrendatarios que buscan
            asesoría para tomar la mejor decisión. Inversionistas interesados en maximizar la
            rentabilidad de sus activos inmobiliarios.
          </p>

          <p class="text-justify mt-4">
            ¿Qué incluye nuestra asesoría? Análisis del mercado: Estudio de precios, demanda y
            oportunidades según zona y tipo de inmueble. Valoración comercial: Estimación
            profesional del valor real del inmueble. Asesoría legal y documental: Revisión de
            títulos, contratos, promesas de compraventa, cláusulas, etc. Recomendaciones para la
            puesta en valor del inmueble: Tips para mejorar presentación, fotografía, y percepción
            del bien. Acompañamiento en procesos notariales y registrales, si aplica. Orientación
            personalizada según el objetivo del cliente (vender, comprar, arrendar, invertir). Con
            nuestra asesoría, nuestros clientes acceden a conocimiento especializado, experiencia
            del mercado y respaldo profesional para tomar decisiones acertadas, minimizar riesgos y
            lograr los mejores resultados.
          </p>
        </div>
        <div class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/asesoria-tributaria.png"
              alt="Servicio de Asesoría Inmobiliaria"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de Asesoría Inmobiliaria')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/paisajismo.png"
              alt="Servicio de Asesoría Inmobiliaria"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de Asesoría Inmobiliaria')"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">
            Servicio de Trámite de Certificados de Libertad y Tradición
          </h2>
          <hr />
          <p class="text-justify mt-4">
            Facilitamos a nuestros clientes la obtención rápida y segura del Certificado de Libertad
            y Tradición, documento indispensable para conocer el estado legal de un inmueble y
            avanzar con seguridad en procesos de compraventa, arrendamiento o trámites notariales.
            ¿Qué es el Certificado de Libertad y Tradición? Es un documento oficial emitido por la
            Oficina de Registro de Instrumentos Públicos, que contiene el historial legal del
            inmueble: propietarios anteriores, embargos, hipotecas, limitaciones al dominio, entre
            otros datos relevantes. ¿A quién va dirigido este servicio? Propietarios que necesitan
            actualizar sus documentos. Compradores que quieren revisar el estado legal de un
            inmueble antes de firmar. Inversionistas o abogados que requieren respaldo documental
            para análisis. Agentes inmobiliarios que agilizan sus procesos con documentos
            actualizados. ¿Qué incluye nuestro servicio? Solicitud formal ante la Oficina de
            Registro correspondiente. Pago de tasas o derechos de expedición. Entrega digital o
            física del certificado. Asesoría básica sobre la lectura e interpretación del documento
            (opcional).
          </p>
        </div>
        <div v-if="isMobile" class="col-12 md:col-8">
          <h2 id="avaluoComercial" class="text-3xl font-bold">
            Servicio de Trámite de Certificados de Libertad y Tradición
          </h2>
          <hr />
          <p class="text-justify mt-4">
            Facilitamos a nuestros clientes la obtención rápida y segura del Certificado de Libertad
            y Tradición, documento indispensable para conocer el estado legal de un inmueble y
            avanzar con seguridad en procesos de compraventa, arrendamiento o trámites notariales.
            ¿Qué es el Certificado de Libertad y Tradición? Es un documento oficial emitido por la
            Oficina de Registro de Instrumentos Públicos, que contiene el historial legal del
            inmueble: propietarios anteriores, embargos, hipotecas, limitaciones al dominio, entre
            otros datos relevantes. ¿A quién va dirigido este servicio? Propietarios que necesitan
            actualizar sus documentos. Compradores que quieren revisar el estado legal de un
            inmueble antes de firmar. Inversionistas o abogados que requieren respaldo documental
            para análisis. Agentes inmobiliarios que agilizan sus procesos con documentos
            actualizados. ¿Qué incluye nuestro servicio? Solicitud formal ante la Oficina de
            Registro correspondiente. Pago de tasas o derechos de expedición. Entrega digital o
            física del certificado. Asesoría básica sobre la lectura e interpretación del documento
            (opcional).
          </p>
        </div>
        <div v-if="isMobile" class="col-12 md:col-4">
          <div class="text-center servicio">
            <img
              src="/servicios/paisajismo.png"
              alt="Servicio de Asesoría Inmobiliaria"
              Width="100%"
            />
            <ButtonPrime
              class="my-4"
              severity="primary"
              label="Escríbenos"
              icon="pi pi-whatsapp"
              @click="abrirChatWhatsappAsesor('Servicio de Asesoría Inmobiliaria')"
            />
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

const authStore = useAuthStore()
const { isMobile } = useMobileDetection()

const companyData = computed(() => authStore.getCompanyData)

const abrirChatWhatsappAsesor = (servicio: string) => {
  window.open(
    `https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola,%20me%20interesa%20el%20servicio%20${servicio},%20que%20vi%20en%20su%20sitio%20web`,
    '_blank'
  )
}
</script>

<style scoped>
.servicio {
  position: relative;
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
  transition: 0.8s;
  transform: scale(1.05) translate(-50%, -50%);
}
</style>
