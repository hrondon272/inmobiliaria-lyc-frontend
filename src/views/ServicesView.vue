<template>
  <div class="card">
    <div
      class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-3xl md:text-5xl p-4"
      :style="{ backgroundColor: companyData?.colorPrimario }"
    >
      NUESTROS SERVICIOS
    </div>
    <div
      class="w-12 md:w-10 mx-auto p-4"
      :style="{ backgroundColor: companyData?.colorPrimario, color: '#2c3e50' }"
    >
      <ServicioItem
        v-for="(servicio, i) in servicios"
        :key="servicio.titulo"
        :titulo="servicio.titulo"
        :descripcion="servicio.descripcion"
        :imagen="servicio.imagen"
        :invertir="i % 2 !== 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ServicioItem from '@/components/ServiceItem.vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const companyData = computed(() => authStore.getCompanyData)

const servicios = [
  {
    titulo: 'Administración de Inmuebles',
    imagen: '/imagenes-servicios/administracion.png',
    descripcion: [
      `En Inmobiliaria Aguirre, facilitamos el proceso de arrendar propiedades con un enfoque claro y directo. Ofrecemos asesoría personalizada,
      gestionamos los trámites legales y nos encargamos de la administración de pagos. Sabemos que el arrendamiento puede tener desafíos,
      pero estamos aquí para ofrecer soluciones rápidas y transparentes, tanto para arrendadores como para arrendatarios.`,
      'Nuestro compromiso es hacer el proceso lo más sencillo y seguro posible.'
    ]
  },
  {
    titulo: 'Servicio de arrendamiento',
    imagen: '/imagenes-servicios/arrendamiento.jpg',
    descripcion: [
      `En Inmobiliaria Aguirre, te brindamos una solución integral para el arrendamiento de inmuebles en Segovia. A través de nuestra plataforma digital, podrás acceder a un portafolio completo de propiedades disponibles, eliminando la necesidad de realizar búsquedas puerta a puerta. Gracias a la virtualidad, podrás visualizar fotos, descripciones detalladas y características de cada inmueble, lo que te permitirá tomar decisiones informadas desde la comodidad de tu hogar. Lo que nos diferencia es que todos los inmuebles disponibles en nuestro portal son de nuestra administración directa, lo que garantiza que cada propiedad es real y está verificada.`,
      `Evitamos los riesgos de fraudes y estafas relacionadas con inmuebles fantasmas, brindándote seguridad y confianza en todo el proceso. Adicionalmente, contamos con una oficina física en un punto estratégico de Segovia, para aquellos clientes que deseen una atención más personalizada o necesiten mayor cercanía y seguridad al realizar sus gestiones. En Inmobiliaria Aguirre, garantizamos un servicio transparente, seguro y eficiente para que tu experiencia de arrendamiento sea sencilla y confiable.`
    ]
  },
  {
    titulo: 'Venta de inmuebles',
    imagen: '/imagenes-servicios/venta.png',
    descripcion: [
      `En Inmobiliaria Aguirre, ofrecemos un servicio de corretaje de inmuebles eficiente y transparente, tanto para quienes desean vender como para quienes buscan comprar propiedades en Segovia. Nos encargamos de todo el proceso de promocion y gestion del inmueble hasta la negociación y la gestión de la documentación necesaria, asegurando una transacción clara y segura. Gracias a nuestra experiencia en el mercado local, conocemos las necesidades de la comunidad y trabajamos para que cada venta se realice de manera ágil y sin complicaciones. Además, todos los inmuebles que gestionamos están debidamente verificados, lo que elimina riesgos de fraudes o problemas legales, brindando tranquilidad a nuestros clientes.`,
      `Si estás interesado en comprar o vender, en Inmobiliaria Aguirre te ofrecemos un servicio integral que te acompaña en cada paso, con un enfoque profesional y confiable. Alianza en Servicios de Asesoría y Trámites Arquitectónicos ° En Inmobiliaria Aguirre, contamos con una alianza estratégica con un arquitecto local especializado en la gestión de trámites técnicos y profesionales. Esta colaboración nos permite ofrecer a nuestros clientes servicios adicionales como el desenglobamiento de terrenos y otros trámites técnicos relacionados con propiedades.`,
      `Nuestro objetivo es garantizar que todos los procesos, desde la subdivisión de predios hasta la regularización de documentos legales y técnicos, se realicen de manera eficiente, rápida y conforme a la normativa vigente. Con esta alianza, brindamos un servicio más completo y seguro para quienes necesiten realizar gestiones adicionales, eliminando la incertidumbre y garantizando la legalidad de cada transacción. Alianza con Avaluador de Valoración Profesional de Inmuebles ° En Inmobiliaria Aguirre, contamos con una alianza estratégica con un avaluador profesional para ofrecerte una valoración precisa y objetiva de tus propiedades. Ya sea que necesites conocer el valor comercial de un inmueble para venta, compra o arrendamiento, nuestro experto en avalúos te proporcionará un informe detallado y ajustado a las condiciones del mercado local, garantizando transparencia y seguridad en cada transacción.`
    ]
  },
  {
    titulo: 'Servicio de Corretaje para Captación de Inquilinos',
    imagen: '/imagenes-servicios/captacion.jpeg',
    descripcion: [
      `En INMOBILIARIA AGUIRRE L Y C, entendemos que muchos propietarios prefieren mantener el control directo sobre la administración de sus inmuebles, pero desean contar con respaldo profesional a la hora de encontrar un inquilino confiable. Por eso ofrecemos nuestro servicio de corretaje especializado en la captación de arrendatarios, diseñado para facilitarle este proceso clave sin necesidad de delegar la administración del inmueble. ¿En qué consiste este servicio? Nos encargamos de todo el proceso de promoción, evaluación y selección del arrendatario ideal, asegurando que cumpla con todos los requisitos establecidos por nuestra inmobiliaria en términos de solvencia económica, estabilidad laboral y antecedentes. Una vez seleccionado el inquilino, realizamos: Publicación y difusión del inmueble en canales especializados. Visitas programadas y atención personalizada a interesados.`,
      `Recopilación y análisis de documentación del arrendatario. Verificación de referencias personales, laborales y comerciales. Entrega al propietario del expediente completo del inquilino aprobado. ¿Qué recibe el propietario? Un inquilino cuidadosamente evaluado y validado por nuestro equipo. El primer canon de arrendamiento, como pago por el servicio de corretaje. Toda la documentación necesaria para firmar directamente el contrato de arrendamiento y asumir la administración del inmueble. Este modelo permite al propietario conservar el control total sobre su inmueble, mientras se asegura de iniciar la relación arrendaticia con una persona confiable y financieramente sólida.`
    ]
  },
  {
    titulo: 'Servicio de Asesoría Inmobiliaria',
    imagen: '/imagenes-servicios/asesoria.png',
    descripcion: [
      `En INMOBILIARIA AGUIRRE L Y C ofrecemos un servicio integral de asesoría inmobiliaria, diseñado para orientar y acompañar a nuestros clientes en cada etapa del proceso de compraventa, arriendo o inversión en bienes raíces. Nuestro objetivo es brindar información clara, respaldo legal y orientación estratégica para que cada decisión inmobiliaria se tome con total confianza y seguridad. ¿A quién va dirigido? Propietarios que desean vender o arrendar su inmueble. Compradores o arrendatarios que buscan asesoría para tomar la mejor decisión. Inversionistas interesados en maximizar la rentabilidad de sus activos inmobiliarios.`,
      `¿Qué incluye nuestra asesoría? Análisis del mercado: Estudio de precios, demanda y oportunidades según zona y tipo de inmueble. Valoración comercial: Estimación profesional del valor real del inmueble. Asesoría legal y documental: Revisión de títulos, contratos, promesas de compraventa, cláusulas, etc. Recomendaciones para la puesta en valor del inmueble: Tips para mejorar presentación, fotografía, y percepción del bien. Acompañamiento en procesos notariales y registrales, si aplica. Orientación personalizada según el objetivo del cliente (vender, comprar, arrendar, invertir). Con nuestra asesoría, nuestros clientes acceden a conocimiento especializado, experiencia del mercado y respaldo profesional para tomar decisiones acertadas, minimizar riesgos y lograr los mejores resultados.`
    ]
  },
  {
    titulo: 'Trámite de Certificados de Libertad y Tradición',
    imagen: '/imagenes-servicios/certificado.jpg',
    descripcion: [
      `Facilitamos a nuestros clientes la obtención rápida y segura del Certificado de Libertad y Tradición, documento indispensable para conocer el estado legal de un inmueble y avanzar con seguridad en procesos de compraventa, arrendamiento o trámites notariales. ¿Qué es el Certificado de Libertad y Tradición? Es un documento oficial emitido por la Oficina de Registro de Instrumentos Públicos, que contiene el historial legal del inmueble: propietarios anteriores, embargos, hipotecas, limitaciones al dominio, entre otros datos relevantes. ¿A quién va dirigido este servicio? Propietarios que necesitan actualizar sus documentos.`,
      `Compradores que quieren revisar el estado legal de un inmueble antes de firmar. Inversionistas o abogados que requieren respaldo documental para análisis. Agentes inmobiliarios que agilizan sus procesos con documentos actualizados. ¿Qué incluye nuestro servicio? Solicitud formal ante la Oficina de Registro correspondiente. Pago de tasas o derechos de expedición. Entrega digital o física del certificado. Asesoría básica sobre la lectura e interpretación del documento (opcional).`
    ]
  }
]
</script>
