<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";
import {
  HomeIcon,
  FolderIcon,
  VideoCameraIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/vue/24/solid";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref(true);

// Computed para verificar se está na página de login
const isLoginPage = computed(() => route.path === "/login" || route.path === "/register");

// Alternar sidebar aberta/fechada
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Logout e redirecionamento
const logout = () => {

  router.push("/login");
};
</script>

<template>
  <!-- Esconder sidebar no login -->
  <div v-if="!isLoginPage" class="flex">
    <!-- Sidebar -->
    <aside
      :class="{
        'w-64': isOpen,
        'w-16': !isOpen,
      }"
      class="h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col"
    >
      <div class="flex justify-between items-center p-4">
        <h1 v-if="isOpen" class="text-lg font-bold">WatchBrasil</h1>
        <button @click="toggleSidebar" class="text-gray-300 hover:text-white">
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Links da Sidebar -->
      <nav class="flex flex-col space-y-4 mt-4">
        <router-link to="/dashboard" class="sidebar-link">
          <HomeIcon class="w-6 h-6" />
          <span v-if="isOpen">Home</span>
        </router-link>

        <router-link v-if="authStore.token" to="/users" class="sidebar-link">
          <UsersIcon class="w-6 h-6" />
          <span v-if="isOpen">Usuários</span>
        </router-link>

        <router-link v-if="authStore.token" to="/categories" class="sidebar-link">
          <FolderIcon class="w-6 h-6" />
          <span v-if="isOpen">Categorias</span>
        </router-link>

        <router-link v-if="authStore.token" to="/videos" class="sidebar-link">
          <VideoCameraIcon class="w-6 h-6" />
          <span v-if="isOpen">Vídeos</span>
        </router-link>
      </nav>

      <!-- Logout (Ajustado para sumir o texto se sidebar estiver fechada) -->
      <div class="mt-auto p-4">
        <button
          v-if="authStore.token"
          @click="logout"
          class="flex items-center justify-center w-full text-white bg-red-600 hover:bg-red-700 p-3 rounded-md transition"
        >
          <ArrowRightOnRectangleIcon class="w-6 h-6" />
          <span v-if="isOpen" class="ml-2">Logout</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.sidebar-link {
  @apply flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 rounded-md;
}
</style>
