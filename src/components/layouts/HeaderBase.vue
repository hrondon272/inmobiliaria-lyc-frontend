<template>
  <header
    class="p-1 text-white"
    :style="{ backgroundColor: companyData?.colorPrimario, zIndex: 2, position: 'relative' }"
  >
    <div class="w-10 m-auto">
      <div class="grid pt-2 pb-0">
        <div class="col-12 md:col-12 flex justify-content-center md:justify-content-end gap-1">
          <div v-for="(item, index) in companyData?.redes_sociales" :key="index">
            <ButtonPrime
              :icon="item.icono"
              :style="{ backgroundImage: item.color, color: '#FFF' }"
              :aria-label="item.nombre"
              v-tooltip.bottom="item.nombre"
              outlined
              text
              raised
              target="_blank"
              rel="noopener"
              @click="navegarA(item.link)"
            />
          </div>
          <ButtonPrime
            :icon="iconLogin"
            v-tooltip.bottom="!isAuthenticated ? 'Iniciar sesión' : 'Cerrar sesión'"
            aria-label="Iniciar sesión"
            :style="{
              backgroundColor: companyData?.colorSecundario,
              borderColor: companyData?.colorSecundario,
              color: '#000'
            }"
            @click="actionLoginButton"
          />
        </div>
      </div>
      <Divider class="mt-2" />
      <MenuBar
        :model="items"
        class="flex justify-content-between align-items-center border-none"
        :style="{ backgroundColor: companyData?.colorSecundario }"
      >
        <template #start>
          <div class="flex align-items-center">
            <a v-if="urlLogo" href="/">
              <img :src="urlLogo" alt="Logo" height="50" />
            </a>
          </div>
        </template>

        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a
              class="text-black-alpha-90 font-semibold"
              :href="href"
              v-bind="props.action"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            class="text-black-alpha-90 font-semibold"
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
      </MenuBar>
    </div>
    <ButtonPrime
      icon="pi pi-whatsapp text-4xl p-2"
      v-tooltip="'Escríbenos 😎'"
      :style="{
        borderRadius: '50%',
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.2rem',
        width: '60px',
        height: '60px'
      }"
      @click="abrirChatWhatsapp"
    />
  </header>
  <AuthDialog v-model:visible="visible" />
  <hr />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, computed, ref, watch } from 'vue'
import AuthDialog from '../AuthDialog.vue'
import { useLoaderStore } from '@/stores/loader'
import { resolveURLFiles } from '@/helpers/randomFunctions'
import { useConfirm } from '@/plugins/useConfirm'
import type { CompanyStructure, menuItem } from '@/interfaces/types'

const authStore = useAuthStore()
const loaderStore = useLoaderStore()
const { showConfirmDefault } = useConfirm()

const companyData = computed(() => authStore.getCompanyData)

const urlLogo = computed(() => {
  return companyData.value && companyData.value.urlLogo
    ? resolveURLFiles(companyData.value.urlLogo)
    : ''
})

const isAuthenticated = computed(() => authStore.isAuthenticated)
const iconLogin = computed(() => {
  return isAuthenticated.value ? 'pi pi-sign-out' : 'pi pi-sign-in'
})

const visible = ref(false)
const items = ref<menuItem[]>([])

watch(
  () => companyData.value,
  (newVal) => {
    if (newVal) items.value = buildMenu(newVal)
  },
  { immediate: true }
)

onMounted(() => {
  authStore.init()
  if (!authStore.getCompanyData) {
    authStore.fetchCompany()
  }
})

const buildMenu = (company: CompanyStructure): menuItem[] => {
  const baseItems: menuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/' },
    { label: 'Ubica tu inmueble', icon: 'pi pi-map-marker', route: '/ubica-tu-inmueble' },
    { label: 'Servicios', icon: 'pi pi-briefcase', route: '/servicios' },
    {
      label: 'Nosotros',
      icon: 'pi pi-id-card',
      items: [
        { label: '¿Quiénes somos?', icon: 'pi pi-users', route: '/quienes-somos' },
        { label: 'Misión y Visión', icon: 'pi pi-bullseye', route: '/mision-vision' }
      ]
    },
    { label: 'Contacto', icon: 'pi pi-envelope', route: '/contacto' }
  ]

  if (company.esPro) {
    baseItems.push({
      label: 'Publica tu inmueble',
      icon: 'pi pi-warehouse',
      route: '/publica-tu-inmueble'
    })
  }
  return baseItems
}

const actionLoginButton = async () => {
  if (isAuthenticated.value) {
    showConfirmDefault(async () => {
      await loaderStore?.setLoading(true)
      await authStore.logout()
      await loaderStore?.setLoading(false)
    })
  } else {
    visible.value = true
  }
}

const abrirChatWhatsapp = async () => {
  const url = `https://api.whatsapp.com/send?phone=${companyData?.value?.telefono}&text=Hola! estoy interesad@ en tus servicios de inmobiliaria`
  window.open(url, '_blank')
}

const navegarA = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
.input-errors-list {
  list-style-type: disc;
}

.input-errors-list li {
  font-size: 0.875rem;
}
</style>
