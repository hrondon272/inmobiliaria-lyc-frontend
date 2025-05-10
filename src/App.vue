<template>
  <LoadingIndicator />
  <Header /> 
  <main>
    <RouterView />
  </main>

  <Footer />

  <ToastPrime position="bottom-left" />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/layouts/HeaderBase.vue';
import Footer from './components/layouts/FooterBase.vue';
import LoadingIndicator from './components/LoaderPrime.vue';
</script>