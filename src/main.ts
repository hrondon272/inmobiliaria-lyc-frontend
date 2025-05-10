import './assets/main.css'

import { createApp } from 'vue'
import primevue from './plugins/prime-vue'
import { createPinia } from 'pinia'
import axios from './plugins/axios'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(primevue)
app.use(ToastService)
app.use(ConfirmationService);
app.use(axios)
app.use(router)

app.mount('#app')
