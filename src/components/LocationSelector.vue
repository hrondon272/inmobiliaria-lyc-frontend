<template>
    <div>
        <div id="map" style="height: 400px;"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import L from 'leaflet';

const emit = defineEmits(['location-selected']);
const props = defineProps<{
    latitud: number;
    longitud: number;
}>();

let map: L.Map | null = null;
let marker: L.Marker | null = null;

onMounted(() => {
    initMap();
    if (props.latitud && props.longitud) {
        updateCoordinates(props.latitud, props.longitud);
    }
});

const initMap = () => {
    map = L.map('map', {
        center: new L.LatLng(4.733120387754163, -74.08196395655861),
        zoom: 5
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
        const latitud = e.latlng.lat;
        const longitud = e.latlng.lng;
        updateCoordinates(latitud, longitud);
        emit('location-selected', { latitud, longitud });
    });
};

const updateCoordinates = (latitud: number, longitud: number) => {
    const icono = L.icon({
        iconUrl: 'icono.ico',
        iconSize: [50, 50],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    })
    if (marker) map?.removeLayer(marker);
    marker = L.marker([latitud, longitud], { icon: icono }).addTo(map!);
    map?.setView([latitud, longitud], 14);    
};
</script>

<style>
#map {
    width: 100%;
    height: 400px;
}
</style>