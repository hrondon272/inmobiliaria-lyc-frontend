import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/HomeView.vue'
import LocateView from '../views/LocateView.vue'
import WhoAreWeView from '../views/WhoAreWeView.vue'
import MissionVisionView from '../views/MissionVisionView.vue'
import ContactView from '../views/ContactView.vue'
import PublishPropertyView from '../views/PublishPropertyView.vue'
import ServicesView from '../views/ServicesView.vue'
import PropertiesListView from '../views/PropertiesListView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'
import NotFound404 from '@/components/NotFound404.vue'
import { AuthMiddleware } from '@/middleware/auth';

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ubica-tu-inmueble',
    name: 'ubicaTuInmueble',
    component: LocateView
  },
  {
    path: '/quienes-somos',
    name: 'quienesSomos',
    component: WhoAreWeView
  },
  {
    path: '/mision-vision',
    name: 'misionVision',
    component: MissionVisionView
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: ServicesView
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: ContactView
  },
  {
    path: '/publica-tu-inmueble',
    name: 'publicaTuInmueble',
    component: PublishPropertyView
  },
  {
    path: '/listado-inmuebles',
    name: 'listadoInmuebles',
    component: PropertiesListView
  },
  {
    path: '/detalle-inmueble',
    name: 'detalleInmueble',
    component: PropertyDetailView
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound404',
    component: NotFound404
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach(AuthMiddleware);

export default router
