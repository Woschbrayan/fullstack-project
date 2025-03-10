<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();

const isOpen = ref(false); // Controla o menu mobile

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Computed para verificar se o usuário está autenticado
const isAuthenticated = computed(() => !!authStore.token);

const logout = () => {
  
  router.push("/login"); // Redireciona para login após logout
};
</script>

<template>
  <nav class="bg-gray-900 text-white shadow-lg w-full">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-white">
        WatchBrasil
      </router-link>

      <!-- Menu Desktop -->
      <div v-if="isAuthenticated" class="hidden md:flex space-x-6">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/categories" class="nav-link">Categorias</router-link>
        <router-link to="/videos" class="nav-link">Vídeos</router-link>
        <button @click="logout" class="btn-logout">Logout</button>
      </div>

      <!-- Botão Mobile -->
      <button v-if="isAuthenticated" @click="toggleMenu" class="md:hidden text-white">
        ☰
      </button>
    </div>

    <!-- Menu Mobile -->
    <div v-if="isOpen && isAuthenticated" class="md:hidden bg-gray-800">
      <router-link to="/dashboard" class="mobile-link">Dashboard</router-link>
      <router-link to="/categories" class="mobile-link">Categorias</router-link>
      <router-link to="/videos" class="mobile-link">Vídeos</router-link>
      <button @click="logout" class="mobile-link">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply text-lg font-semibold text-gray-300 hover:text-white transition;
}

.btn-logout {
  @apply bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition;
}

.mobile-link {
  @apply block px-4 py-3 text-white hover:bg-gray-700 transition;
}
</style>
