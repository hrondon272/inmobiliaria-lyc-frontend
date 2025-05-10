<template>
    <div v-if="isLoading" id="loader" class="card flex justify-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
            animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLoaderStore } from '@/stores/loader';

const loaderStore = useLoaderStore();
const isLoading = computed(() => loaderStore.isLoading);
</script>

<style scoped>
    #loader{
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f2f2f25e;
        position: fixed;
        z-index: 2500;
    }
</style>