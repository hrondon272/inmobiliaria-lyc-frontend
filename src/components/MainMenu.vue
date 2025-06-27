<template>
  <div :class="isHome ? '' : 'custom-bg'">
    <MenuBar
      id="menu-bar"
      :model="items"
      class="w-full flex justify-content-between align-items-center border-none"
      :style="{ backgroundColor: 'transparent', color: 'white', position: 'relative', zIndex: 2 }"
    >
      <template #start>
        <div class="flex align-items-center">
          <a v-if="urlLogo" href="/">
            <img :src="urlLogo" alt="Logo" height="50" />
          </a>
        </div>
      </template>

      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate, isActive }"
          :to="item.route"
          custom
        >
          <a
            :href="href"
            v-bind="props.action"
            @click="navigate"
            :class="{ 'active-menu': isActive }"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2 font-bold" />
        </a>
      </template>
    </MenuBar>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, computed, ref, watch } from 'vue'
import type { CompanyStructure } from '@/interfaces/types'
import { resolveURLFiles } from '@/helpers/randomFunctions'
import type { menuItem } from '@/interfaces/types'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHome = computed(() => route.name === 'home')

const authStore = useAuthStore()

const companyData = computed(() => authStore.getCompanyData)
const items = ref<menuItem[]>([])

const urlLogo = computed(() => {
  return companyData.value && companyData.value.urlLogo
    ? resolveURLFiles(companyData.value.urlLogo)
    : ''
})

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

watch(
  () => companyData.value,
  (newVal) => {
    if (newVal) items.value = buildMenu(newVal)
  },
  { immediate: true }
)
</script>

<style>
@media (max-width: 960px) {
  .p-menubar-mobile .p-menubar-submenu {
    background-color: white !important;
  }
  .p-menubar-submenu .p-menubar-item-link {
    background-color: white !important;
    border: none !important;
    border-radius: 0 !important;
    color: #000000 !important;
  }
}
.p-menubar-item-link {
  background-color: transparent !important;
  color: rgb(255, 255, 255) !important;
  font-weight: bold !important;
}
.p-menubar-submenu .p-menubar-item-link {
  color: rgb(0, 0, 0) !important;
}
.p-menubar-item-link:hover {
  border-radius: 6px !important;
  background-color: rgba(88, 88, 88, 0.623) !important;
  color: rgb(255, 255, 255) !important;
  font-weight: bold !important;
}

.p-menubar-item-link.active-menu {
  border-radius: 6px !important;
  background-color: rgba(185, 184, 184, 0.623) !important;
  color: rgb(44, 62, 80);
  font-weight: bold !important;
}

svg {
  color: white !important;
  height: 20px !important;
  width: 20px !important;
}

.custom-bg {
  background-image: url('/carrusel/carrusel-imagen-2.png');
  background-size: 100% 100%;
  background-position: center;
  background-attachment: fixed;
}

.p-menubar-mobile .p-menubar-root-list {
  background-color: rgb(255, 255, 255) !important;
  border: none !important;
}
.p-menubar-mobile .p-menubar-root-list .p-menubar-item-link {
  color: rgb(0, 0, 0) !important;
  font-weight: bold !important;
}
</style>
