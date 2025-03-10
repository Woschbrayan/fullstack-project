<script setup>
import { defineProps } from "vue";

const props = defineProps(["video"]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
    <iframe
      :src="video.url"
      class="w-full h-40 rounded-lg"
      allowfullscreen
    ></iframe>
    <h3 class="text-xl font-semibold mt-2">{{ video.title }}</h3>
    <p class="text-gray-500 text-sm">{{ video.category.name }}</p>
    <div class="mt-4 flex justify-between">
      <button class="bg-blue-500 px-3 py-1 rounded hover:bg-blue-700">Editar</button>
      <button class="bg-red-500 px-3 py-1 rounded hover:bg-red-700">Excluir</button>
    </div>
  </div>
</template>
