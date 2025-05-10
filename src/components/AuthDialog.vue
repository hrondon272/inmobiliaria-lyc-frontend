<template>
  <DialogPrime v-model:visible="internalVisible" modal header="Iniciar sesión" @hide="closeDialog()"
    :style="{ width: '25rem' }">
    <div class="flex justify-content-center gap-3 mb-4 my-2">
      <label for="email" class="font-semibold w-3">Correo</label>
      <InputText id="email" v-model="form.email" />
    </div>
    <div class="flex justify-content-center gap-3 mb-2">
      <label for="password" class="font-semibold w-3">Contraseña</label>
      <Password id="password" v-model="form.password" />
    </div>
    <ul v-if="v$.email.$errors.length" class="input-errors-list ml-4">
      <li v-for="error of v$.email.$errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>
    <ul v-if="v$.password.$errors.length" class="input-errors-list ml-4">
      <li v-for="error of v$.password.$errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>
    <div class="flex justify-content-end gap-2 mt-4">
      <ButtonPrime type="button" label="Cerrar" severity="secondary" @click="closeDialog()" />
      <ButtonPrime type="button" label="Acceder" @click="login()" />
    </div>
  </DialogPrime>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useLoaderStore } from '@/stores/loader'
import { useToast } from '../plugins/useToast';

const { showMessage } = useToast();

const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
  visible: Boolean
})
const internalVisible = ref(props.visible)

const emit = defineEmits(['update:visible'])
const loaderStore = useLoaderStore();

const form = ref({
  email: '',
  password: ''
})

const rules = {
  email: {
    required: helpers.withMessage('El correo es obligatorio', required),
    email: helpers.withMessage('El correo no es valido', email)
  },
  password: {
    required: helpers.withMessage('La contraseña es obligatoria', required)
  }
}

const v$ = useVuelidate(rules, form)

watch(
  () => props.visible,
  (newVal) => {
    internalVisible.value = newVal
  }
)

const closeDialog = () => {
  emit('update:visible', false)
  v$.value.$reset()
}

const login = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  await loaderStore?.setLoading(true)
  const status = await authStore.login(form.value)
  await loaderStore?.setLoading(false)

  if (status === 200) {
    internalVisible.value = false
    router.push('/dashboard')
  } else if (status === 401) {
    showMessage('warn', '', 'Contraseña incorrecta', 6000);
  } else {
    showMessage('error', 'Error', 'Por favor vuelva a intentar o comuníquese con nuestro equipo', 10000);
  }
}
</script>
