<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const videos = ref([]);
const errorMessage = ref("");

// Função para buscar os vídeos cadastrados
const fetchVideos = async () => {
  try {
    const response = await api.get("/videos");
    videos.value = response.data;
  } catch (error) {
    errorMessage.value = "Erro ao carregar os vídeos.";
    console.error("❌ Erro ao buscar vídeos:", error);
  }
};

onMounted(() => {
  fetchVideos();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
  
    <!-- Mensagem de erro -->
    <p v-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</p>

    <!-- Lista de vídeos em formato de cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="video in videos" :key="video.id" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <iframe
          class="w-full h-48"
          :src="video.url.replace('watch?v=', 'embed/')"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div class="p-4">
          <h3 class="text-xl font-semibold text-gray-900">{{ video.title }}</h3>
          <p class="text-gray-700 text-sm">{{ video.description }}</p>
          <span class="text-blue-600 text-sm font-medium">📌 Categoria: {{ video.category.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply w-[90%] max-w-6xl mx-auto;
}
</style>
