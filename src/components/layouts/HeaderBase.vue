<template>
  <header
    class="p-1 text-white"
    :style="{ backgroundColor: 'transparent', zIndex: 2, position: 'relative' }"
  >
    <div class="w-12 m-auto p-2">
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
              color: '#FFF'
            }"
            @click="actionLoginButton"
          />
        </div>
      </div>
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
  <MainMenu />
  <AuthDialog v-model:visible="visible" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, computed, ref } from 'vue'
import AuthDialog from '../AuthDialog.vue'
import { useLoaderStore } from '@/stores/loader'
import { useConfirm } from '@/plugins/useConfirm'
import MainMenu from '../MainMenu.vue'

const authStore = useAuthStore()
const loaderStore = useLoaderStore()
const { showConfirmDefault } = useConfirm()

const companyData = computed(() => authStore.getCompanyData)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const iconLogin = computed(() => {
  return isAuthenticated.value ? 'pi pi-sign-out' : 'pi pi-sign-in'
})

const visible = ref(false)

onMounted(() => {
  authStore.init()
  if (!authStore.getCompanyData) {
    authStore.fetchCompany()
  }
})

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
