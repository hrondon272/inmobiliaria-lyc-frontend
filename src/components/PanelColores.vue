<template>
  <h2 class="mt-2 mb-4">Configure los colores del sitio</h2>
  <div
    class="formgrid grid w-12 md:w-10 mx-auto p-3 md:p-4"
    :style="{ backgroundColor: companyData?.colorPrimario }"
  >
    <div class="field col-12 md:col-6 lg:col-4 mt-2 text-center">
      <span>{{ colorPrimarioFormateado }}</span>
      <label for="cp-primario" class="font-bold block mb-2"> Color primario </label>
      <ColorPicker
        v-model="form.colorPrimario"
        inputId="cp-primario"
        format="hex"
        class="mb-4"
        inline
      />
    </div>
    <div class="field col-12 md:col-6 lg:col-4 mt-2 text-center">
      <span>{{ colorSecundarioFormateado }}</span>
      <label for="cp-secundario" class="font-bold block mb-2"> Color secundario </label>
      <ColorPicker
        v-model="form.colorSecundario"
        inputId="cp-secundario"
        format="hex"
        class="mb-4"
        inline
      />
    </div>
    <div class="field col-12 md:col-6 lg:col-4 mt-2 text-center">
      <span>{{ colorTerciarioFormateado }}</span>
      <label for="cp-terciario" class="font-bold block mb-2"> Color terciario </label>
      <ColorPicker
        v-model="form.colorTerciario"
        inputId="cp-terciario"
        format="hex"
        class="mb-4"
        inline
      />
    </div>
    <div class="col-12 text-center my-2">
      <ButtonPrime
        icon="pi pi-save"
        aria-label="Actualizar colores"
        label="Actualizar colores"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useToast } from '../plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import { useUsuarioStore } from '@/stores/usuario'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { showMessage } = useToast()
const loaderStore = useLoaderStore()
const useStore = useUsuarioStore()

const companyData = computed(() => authStore.getCompanyData)

const form = ref({
  colorPrimario: '',
  colorSecundario: '',
  colorTerciario: ''
})

const rules = {
  colorPrimario: { required },
  colorSecundario: { required },
  colorTerciario: { required }
}

const colorPrimarioFormateado = computed(() => {
  return formatearColor(form.value.colorPrimario)
})

const colorSecundarioFormateado = computed(() => {
  return formatearColor(form.value.colorSecundario)
})

const colorTerciarioFormateado = computed(() => {
  return formatearColor(form.value.colorTerciario)
})

const formatearColor = (color) => {
  return color.startsWith('#') ? color : `#${color}`
}

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    showMessage('warn', 'Error', 'Verifique el formulario', 10000)
    return
  }

  form.value.colorPrimario = formatearColor(form.value.colorPrimario)
  form.value.colorSecundario = formatearColor(form.value.colorSecundario)
  form.value.colorTerciario = formatearColor(form.value.colorTerciario)

  await loaderStore?.setLoading(true)
  const status = await useStore.updateColors(form.value)
  await loaderStore?.setLoading(false)

  if (status === 200) {
    showMessage('success', 'Éxito', 'Se han actualizado los colores correctamente', 5000)
  } else {
    showMessage(
      'error',
      'Error',
      'Por favor vuelva a intentar o comuníquese con nuestro equipo',
      10000
    )
  }
}

watchEffect(() => {
  if (companyData.value) {
    form.value.colorPrimario = companyData.value.colorPrimario
    form.value.colorSecundario = companyData.value.colorSecundario
    form.value.colorTerciario = companyData.value.colorTerciario
  }
})
</script>
