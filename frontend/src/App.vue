<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue"; // Se houver um sidebar
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

// Verifica se o usuário está autenticado
const isAuthenticated = computed(() => !!authStore.token);

// Esconde a navbar nas telas de login e cadastro
const hideNavbar = computed(() => {
  return route.path === "/login" || route.path === "/register";
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar apenas se o usuário estiver autenticado -->
    <Sidebar v-if="isAuthenticated" />

    <div class="flex-1">
      <!-- Exibe a Navbar apenas se o usuário estiver logado -->
      <Navbar v-if="isAuthenticated && !hideNavbar" />

      <!-- Área principal -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
