<template>
  <div
    class="formgrid grid w-12 md:w-10 mx-auto p-3 md:p-4"
    :style="{ backgroundColor: companyData?.colorPrimario }"
  >
    <div class="col-8 sm:col-9 md:col-10" v-if="companyData?.esPro"></div>
    <div class="col-4 sm:col-3 md:col-2" v-if="companyData?.esPro">
      <div class="flex mb-2 gap-2 justify-end">
        <ButtonPrime
          @click="value = '0'"
          rounded
          label="1"
          class="w-8 h-8 p-0"
          :outlined="value !== '0'"
        />
        <ButtonPrime
          @click="value = '1'"
          rounded
          label="2"
          class="w-8 h-8 p-0"
          :outlined="value !== '1'"
        />
        <ButtonPrime
          @click="value = '2'"
          rounded
          label="3"
          class="w-8 h-8 p-0"
          :outlined="value !== '2'"
        />
      </div>
    </div>
    <div class="col-12 md:col-12 my-2">
      <Tabs v-model:value="value" scrollable>
        <TabList>
          <Tab value="0">Lista de inmuebles</Tab>
          <Tab value="1" v-if="companyData?.esPro">Colores del sitio</Tab>
          <Tab value="2" v-if="companyData?.esPro">Perfil</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <datatable-inmuebles />
          </TabPanel>
          <TabPanel value="1" v-if="companyData?.esPro">
            <panel-colores />
          </TabPanel>
          <TabPanel value="2" v-if="companyData?.esPro">
            <panel-perfil />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DatatableInmuebles from '../components/DatatableInmuebles.vue'
import PanelColores from '../components/PanelColores.vue'
import PanelPerfil from '../components/PanelPerfil.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const value = ref('0')

const companyData = computed(() => authStore.getCompanyData)
</script>
