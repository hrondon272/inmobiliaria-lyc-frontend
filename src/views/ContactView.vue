<template>
  <div class="card">
    <div class="w-12 md:w-10 mx-auto text-black-alpha-90 font-semibold text-5xl p-4">
      CONTÁCTANOS
    </div>
    <div
      class="w-12 md:w-10 mx-auto"
      :style="{ backgroundColor: companyData?.colorPrimario, minHeight: '500px' }"
    >
      <div class="formgrid grid w-12 md:w-8 mx-auto p-3 md:p-4">
        <div class="field col-12 md:col-6 mt-2 md:mt-6 mx-auto">
          <FloatLabel>
            <InputText v-model="form.nombre" :class="{ 'p-invalid': v$.nombre.$error }" fluid />
            <label>Nombre</label>
          </FloatLabel>
          <div class="p-error" v-for="error of v$.nombre.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="field col-12 md:col-6 mt-2 md:mt-6 mx-auto">
          <FloatLabel>
            <InputText v-model="form.telefono" :class="{ 'p-invalid': v$.telefono.$error }" fluid />
            <label>WhatsApp</label>
          </FloatLabel>
          <div class="p-error" v-for="error of v$.telefono.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="field col-12 mt-2 mx-auto">
          <FloatLabel>
            <InputText v-model="form.email" :class="{ 'p-invalid': v$.email.$error }" fluid />
            <label>Correo</label>
          </FloatLabel>
          <div class="p-error" v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="field col-12 mt-2 mx-auto">
          <FloatLabel variant="in">
            <TextareaPrime
              v-model="form.descripcion"
              rows="4"
              :class="{ 'p-invalid': v$.descripcion.$error }"
              fluid
            />
            <label>Descripción</label>
          </FloatLabel>
          <div class="p-error" v-for="error of v$.descripcion.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="col-12 text-center my-4">
          <ButtonPrime
            icon="pi pi-save"
            aria-label="Enviar"
            label="Enviar"
            @click="onSubmit"
            :style="{
              backgroundColor: companyData?.colorSecundario,
              borderColor: companyData?.colorSecundario
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, maxLength, helpers } from '@vuelidate/validators'
import { useUsuarioStore } from '@/stores/usuario'
import { useToast } from '../plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const useUsuario = useUsuarioStore()
const loaderStore = useLoaderStore()
const { showMessage } = useToast()

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  descripcion: ''
})

const companyData = computed(() => authStore.getCompanyData)

const rules = {
  nombre: { required: helpers.withMessage('El nombre es obligatorio', required) },
  email: {
    required: helpers.withMessage('El correo es obligatorio', required),
    email: helpers.withMessage('Debe ser un correo válido', email)
  },
  telefono: { required: helpers.withMessage('El teléfono es obligatorio', required) },
  descripcion: {
    maxLength: helpers.withMessage('El límite es de 500 palabras', maxLength(500))
  }
}

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    showMessage('warn', 'Error', 'Verifique el formulario', 10000)
    return
  }

  await loaderStore?.setLoading(true)
  const status = await useUsuario.sendContactMail(form.value)
  await loaderStore?.setLoading(false)

  if (status === 200) {
    showMessage('success', 'Éxito', 'Tu correo ha sido enviado', 10000)
    limpiarFormulario()
  } else {
    showMessage(
      'error',
      'Error',
      'Por favor vuelva a intentar o comuníquese con nuestro equipo',
      10000
    )
  }
}

const limpiarFormulario = () => {
  form.value = {
    nombre: '',
    email: '',
    telefono: '',
    descripcion: ''
  }
  v$.value.$reset()
}
</script>
