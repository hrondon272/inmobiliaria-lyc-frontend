import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});