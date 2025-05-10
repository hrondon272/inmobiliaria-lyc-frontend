import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileDetection() {
    const isMobile = ref(false);

    const handleResize = () => {
        isMobile.value = window.matchMedia('(max-width: 576px)').matches;
    };

    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    return { isMobile };
}