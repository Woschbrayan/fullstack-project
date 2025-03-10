<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import VideoCard from "@/components/VideoCard.vue";

const videos = ref([]);

const fetchVideos = async () => {
  try {
    const response = await api.get("/videos");
    videos.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar vídeos", error);
  }
};

onMounted(() => {
  fetchVideos();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">🎥 Biblioteca de Vídeos</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
    </div>
  </div>
</template>
