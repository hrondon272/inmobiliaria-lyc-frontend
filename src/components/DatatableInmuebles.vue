<template>
    <div class="card">
        <DataTable 
            v-model:filters="filters" 
            :value="inmuebles" 
            paginator
            :rows="rowsPerPage"               
            :rowsPerPageOptions="[5, 10, 20, 50, 100]"
            dataKey="id" 
            :loading="isLoading"
            stripedRows            
            removableSort
            @page="updatePage($event)"
            :totalRecords="totalInmuebles"
            paginatorPosition="bottom"
            filterDisplay="row"
            lazy
        >
            <template #empty> No se encontraron inmuebles. </template>
            <Column header="Acciones" style="min-width: 8rem">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <ButtonPrime class="text-sm" icon="pi pi-pencil" @click="editarInmueble(data.id)"
                            v-tooltip.left="'Editar'" severity="warn" size="small" />
                        <ButtonPrime class="text-sm" icon="pi pi-trash" @click="eliminarInmueble(data.id)"
                            v-tooltip.bottom="'Eliminar'" severity="danger" size="small" />
                        <ButtonPrime class="text-sm" icon="pi pi-image" @click="mostrarDialogoImagenes(data.id)"
                            v-tooltip="'Ver fotos'" size="small" />
                        <ButtonPrime class="text-sm" icon="pi pi-video" @click="mostrarDialogoVideos(data.id)"
                            v-tooltip="'Ver videos'" size="small" />
                    </div>
                </template>
            </Column>

            <Column header="Foto principal" style="min-width: 8rem">
                <template #body="{ data }">
                    <img :src="getFotoPrincipal(data)" alt="Imagen Principal" style="width: 50px; height: auto;" />
                </template>
            </Column>

            <Column v-for="col of columnas" :key="col.field" :field="col.field" :header="col.header" sortable
                :showClear="true">
                <template #body="{ data }">
                    <div style="max-height: 50px; overflow: hidden; white-space: normal; word-break: break-word;">
                        <span v-if="col.field === 'disponible'">
                            {{ data[col.field] === true ? 'Disponible' : 'No disponible' }}
                        </span>
                        <span v-else-if="col.field === 'precio'">
                            <p class="text-lg">$ {{ getPrecio(parseFloat(data[col.field] || '0')) }}</p>
                        </span>
                        <span v-else>
                            {{ data[col.field] }}
                        </span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <slot
                        :filterModel="filterModel"
                        :filterCallback="filterCallback"
                        :model="filters"
                        :name="'filter_' + col.field"
                    >
                        <InputText
                            type="search"
                            v-model="filterModel.value"
                            @keydown.enter="filterCallback()"
                             @input="updateFilter(col.field, filterModel.value)"
                            class="p-column-filter p-inputtext-sm py-1"
                            :style="{ ...col.styleAll }"
                        />
                    </slot>
                </template>
            </Column>
            <template #footer> En total hay {{ inmuebles ? totalInmuebles : 0 }} inmuebles. </template>
        </DataTable>
        <DialogPrime class="w-12 md:w-11 mx-auto" v-model:visible="visibleEditInfo" modal
            header="Edite la información del inmueble">
            <create-edit-inmueble v-model="modeloInfo" :isEditing="isEditing"
                @update:visible="visibleEditInfo = $event" />
        </DialogPrime>
        <DialogPrime class="w-12 md:w-11 mx-auto" v-model:visible="visibleEditImages" modal
            header="Visualice y edite las fotos del inmueble">
            <edit-images-inmueble v-model="modeloFotos" :idInmueble="idInmuebleSeleccionado" />
        </DialogPrime>
        <DialogPrime class="w-12 md:w-11 mx-auto" v-model:visible="visibleEditVideos" modal
            header="Añada o remueva los videos del inmueble">
            <edit-videos-inmueble v-model="modeloVideos" :idInmueble="idInmuebleSeleccionado" />
        </DialogPrime>
    </div>
</template>

<script setup>
import { 
    ref,
    computed,
    onMounted
} from 'vue'
import { useInmuebleStore } from '@/stores/inmueble'
import { useToast } from '@/plugins/useToast'
import { useLoaderStore } from '@/stores/loader'
import CreateEditInmueble from '@/components/CreateEditInmueble.vue'
import EditImagesInmueble from '@/components/EditImagesInmueble.vue'
import EditVideosInmueble from '@/components/EditVideosInmueble.vue'
import { useConfirm } from '@/plugins/useConfirm'
import { getFotoPrincipal, getPrecio } from '@/helpers/randomFunctions'

const { showConfirmDelete } = useConfirm();
const loaderStore = useLoaderStore();
const useInmueble = useInmuebleStore();
const { showMessage } = useToast()

const modeloInfo = ref(null);
const modeloFotos = ref(null);
const modeloVideos = ref(null);
const visibleEditInfo = ref(false);
const visibleEditImages = ref(false);
const visibleEditVideos = ref(false);
const isEditing = ref(false);
const idInmuebleSeleccionado = ref('');
const page = ref(1);
const rowsPerPage = ref(10);
const isLoading = ref(false);

const inmuebles = computed(() => useInmueble.lista);
const totalInmuebles = computed(() => useInmueble.totalInmuebles)

const columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'disponible', header: 'Disponible' },
    { field: 'precio', header: 'Precio' },
    { field: 'ciudad', header: 'Ciudad' },
    { field: 'tipo', header: 'Tipo de inmueble' },
    { field: 'autor', header: 'Asesor' },
]

const filters = ref({
    nombre: { value: null },
    ciudad: { value: null },
    precio: { value: null },
    disponible: { value: null },
    tipo: { value: null },
    caracteristicas: { value: null },
    autor: { value: null },
    cantidadBanos: { value: null },
    cantidadDormitorios: { value: null },
    direccion: { value: null }
});

onMounted(async () => {
    await fetchInmuebles()
});

const fetchInmuebles = async () => {
    await loaderStore?.setLoading(true);
    const status = await useInmueble.fetchInmuebles(null, page.value, rowsPerPage.value);
    await loaderStore?.setLoading(false);

    if (status !== 200) showMessage('error', 'Ha ocurrido un error', 'Por favor recarge la página', 8000);
};

const editarInmueble = async (id) => {

    await loaderStore?.setLoading(true)
    const { data, status } = await useInmueble.buscar(id)
    await loaderStore?.setLoading(false)

    if (status === 200) {
        modeloInfo.value = data.data;
        visibleEditInfo.value = true;
        isEditing.value = true;
    }
};

const eliminarInmueble = (id) => {
    showConfirmDelete(async() => {
        await loaderStore?.setLoading(true)
        const status = await useInmueble.eliminar(id)
        await loaderStore?.setLoading(false)

        if (status === 204) {
            showMessage('success', '', 'El inmueble ha sido eliminado', 6000)
        }
    })
};

const mostrarDialogoImagenes = async (id) => {

    await loaderStore?.setLoading(true)
    const { data, status } = await useInmueble.buscarFotos(id)
    await loaderStore?.setLoading(false)

    if (status === 200) {
        modeloFotos.value = data.data;
        visibleEditImages.value = true;
        idInmuebleSeleccionado.value = id;
    }
};

const mostrarDialogoVideos = async (id) => {

    await loaderStore?.setLoading(true)
    const { data, status } = await useInmueble.buscarVideos(id)
    await loaderStore?.setLoading(false)

    if (status === 200) {
        modeloVideos.value = data;
        visibleEditVideos.value = true;
        idInmuebleSeleccionado.value = id;
    }
};

const updatePage = (event) => {
    if(rowsPerPage.value !== event.rows){
        rowsPerPage.value = event.rows;
        page.value = 1;
    }else{
        page.value = event.page + 1;        
    }
    fetchInmuebles()
};

const updateFilter = (field, value) => {
    filters.value[field].value = value;
};

</script>
