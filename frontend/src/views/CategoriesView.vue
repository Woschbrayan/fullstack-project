<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

const categories = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const categoryForm = ref({ id: null, name: "" });
const successMessage = ref("");
const errorMessage = ref("");

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
const editCategory = (category) => {
  categoryForm.value = { ...category };
  isEditing.value = true;
  isCreating.value = false;
};

// Função para abrir o formulário de criação
const createCategory = () => {
  categoryForm.value = { id: null, name: "" };
  isCreating.value = true;
  isEditing.value = false;
};

// Função para salvar categoria (criação ou edição)
const saveCategory = async () => {
  try {
    if (categoryForm.value.id) {
      await api.put(`/categories/${categoryForm.value.id}`, {
        name: categoryForm.value.name,
      });
      successMessage.value = "Categoria atualizada com sucesso!";
    } else {
      await api.post("/categories", {
        name: categoryForm.value.name,
      });
      successMessage.value = "Categoria criada com sucesso!";
    }

    isEditing.value = false;
    isCreating.value = false;
    fetchCategories();  // Atualiza a lista de categorias
  } catch (error) {
    errorMessage.value = "Erro ao salvar categoria.";
    console.error(error);
  }
};

// Função para excluir categoria
const deleteCategory = async (id) => {
  if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

  try {
    await api.delete(`/categories/${id}`);
    successMessage.value = "Categoria excluída com sucesso!";
    fetchCategories();  // Atualiza a lista de categorias
  } catch (error) {
    errorMessage.value = "Erro ao excluir categoria.";
    console.error(error);
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="page-container">
    <!-- Botão Nova Categoria -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Gestão de Categorias</h2>
      <button @click="createCategory" class="btn-primary">+ Nova Categoria</button>
    </div>

    <!-- Mensagens de Sucesso e Erro -->
    <p v-if="successMessage" class="text-white bg-green-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-white bg-red-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ errorMessage }}
    </p>

    <!-- Tabela de Categorias -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table class="table-auto min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Nome</th>
            <th class="border px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td class="border px-4 py-2">{{ category.name }}</td>
            <td class="border px-4 py-2 flex space-x-2 justify-center">
              <button @click="editCategory(category)" class="icon-btn">
                <PencilIcon class="w-5 h-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button @click="deleteCategory(category.id)" class="icon-btn">
                <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulário de Edição/Criação -->
    <div v-if="isEditing || isCreating" class="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold">{{ isEditing ? 'Editar Categoria' : 'Nova Categoria' }}</h3>
      <form @submit.prevent="saveCategory">
        <div class="grid grid-cols-1 gap-4 mt-4">
          <input v-model="categoryForm.name" placeholder="Nome" class="input-field" required />

          <button type="submit" class="btn-primary w-full">
            {{ isEditing ? "Salvar Alterações" : "Criar Categoria" }}
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
