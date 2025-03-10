<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

const videos = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const videoForm = ref({ id: null, title: "", url: "", categoryId: null });
const successMessage = ref("");
const errorMessage = ref("");
const categories = ref([]);

// Função para buscar vídeos
const fetchVideos = async () => {
  try {
    const response = await api.get("/videos");
    videos.value = response.data;
  } catch (error) {
    errorMessage.value = "Erro ao buscar vídeos.";
  }
};

// Função para buscar categorias
const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    categories.value = response.data;
  } catch (error) {
    errorMessage.value = "Erro ao buscar categorias.";
  }
};

// Função para abrir o formulário de edição
const editVideo = (video) => {
  videoForm.value = { ...video };
  isEditing.value = true;
  isCreating.value = false;
};

// Função para abrir o formulário de criação
const createVideo = () => {
  videoForm.value = { id: null, title: "", url: "", categoryId: null };
  isCreating.value = true;
  isEditing.value = false;
};

// Função para salvar vídeo (criação ou edição)
const saveVideo = async () => {
  if (!videoForm.value.title || !videoForm.value.url || !videoForm.value.categoryId || !videoForm.value.description) {
    errorMessage.value = "Todos os campos são obrigatórios!";
    return;
  }

  try {
    console.log("📌 Enviando dados:", videoForm.value);

    const response = await api.post("/videos", {
      title: videoForm.value.title,
      description: videoForm.value.description, // 🔹 Adicionado `description`
      url: videoForm.value.url,
      categoryId: Number(videoForm.value.categoryId),
    });

    successMessage.value = response.data.message || "Vídeo criado com sucesso!";
    fetchVideos();
    videoForm.value = { id: null, title: "", description: "", url: "", categoryId: null }; // 🔹 Limpa o formulário
    isCreating.value = false;
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Erro ao criar vídeo.";
    console.error("❌ Erro ao criar vídeo:", error);
  }
};


// Função para excluir vídeo
const deleteVideo = async (id) => {
  if (!confirm("Tem certeza que deseja excluir este vídeo?")) return;

  try {
    await api.delete(`/videos/${id}`);
    successMessage.value = "Vídeo excluído com sucesso!";
    fetchVideos();  // Atualiza a lista de vídeos
  } catch (error) {
    errorMessage.value = "Erro ao excluir vídeo.";
    console.error(error);
  }
};

onMounted(() => {
  fetchVideos();
  fetchCategories();
});
</script>

<template>
  <div class="page-container">
    <!-- Botão Novo Vídeo -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Gestão de Vídeos</h2>
      <button @click="createVideo" class="btn-primary">+ Novo Vídeo</button>
    </div>

    <!-- Mensagens de Sucesso e Erro -->
    <p v-if="successMessage" class="text-white bg-green-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-white bg-red-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ errorMessage }}
    </p>

    <!-- Tabela de Vídeos -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table class="table-auto min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Título</th>
            <th class="border px-4 py-2 text-left">Categoria</th>
            <th class="border px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id">
            <td class="border px-4 py-2">{{ video.title }}</td>
            <td class="border px-4 py-2">{{ video.category.name }}</td>
            <td class="border px-4 py-2 flex space-x-2 justify-center">
              <button @click="editVideo(video)" class="icon-btn">
                <PencilIcon class="w-5 h-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button @click="deleteVideo(video.id)" class="icon-btn">
                <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulário de Edição/Criação -->
    <div v-if="isEditing || isCreating" class="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold">{{ isEditing ? 'Editar Vídeo' : 'Novo Vídeo' }}</h3>
      <form @submit.prevent="saveVideo">
        <div class="grid grid-cols-1 gap-4 mt-4">
          <input v-model="videoForm.title" placeholder="Título" class="input-field" required />
          <input v-model="videoForm.description" placeholder="Descrição" class="input-field" required />
          <input v-model="videoForm.url" placeholder="URL" class="input-field" required />
          <select v-model="videoForm.categoryId" class="input-field" required>
            <option value="" disabled>Escolha a categoria</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <button type="submit" class="btn-primary w-full">
            {{ isEditing ? "Salvar Alterações" : "Criar Vídeo" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  @apply w-[90%] max-w-4xl h-[auto] p-6 bg-white rounded-lg shadow-md mx-auto;
}

th, td {
  @apply border px-4 py-2;
}

.icon-btn {
  @apply p-2 rounded-full hover:bg-gray-100 transition;
}

.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition;
}

@media (max-width: 768px) {
  .table-auto {
    @apply text-sm;
  }
  .icon-btn {
    @apply p-2;
  }
}
</style>
