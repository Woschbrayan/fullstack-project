<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid"; // Ajuste para versão 2

const users = ref([]);
const isEditing = ref(false);
const isCreating = ref(false);
const userForm = ref({ id: null, name: "", email: "", password: "" });
const successMessage = ref("");
const errorMessage = ref("");

// Função para buscar usuários
const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    users.value = response.data;
  } catch (error) {
    errorMessage.value = "Erro ao buscar usuários.";
  }
};

// Função para abrir o formulário de edição
const editUser = (user) => {
  userForm.value = { ...user, password: "" }; // Preenche o formulário sem a senha
  isEditing.value = true;
  isCreating.value = false;
};

// Função para abrir o formulário de criação
const createUser = () => {
  userForm.value = { id: null, name: "", email: "", password: "" }; // Formulário vazio
  isCreating.value = true;
  isEditing.value = false;
};

// Função para salvar usuário (criação ou edição)
const saveUser = async () => {
  try {
    if (userForm.value.id) {
      await api.put(`/users/${userForm.value.id}`, {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password, // Verifique se precisa atualizar a senha
      });
      successMessage.value = "Usuário atualizado com sucesso!";
    } else {
      await api.post("/users", {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
      });
      successMessage.value = "Usuário criado com sucesso!";
    }

    // Limpar os campos e esconder o formulário
    isEditing.value = false;
    isCreating.value = false;
    fetchUsers(); // Atualiza a lista de usuários

    setTimeout(() => {
      successMessage.value = ""; // Limpar a mensagem após 5 segundos
    }, 5000);

  } catch (error) {
    errorMessage.value = "Erro ao salvar usuário.";
    console.error(error); // Para ajudar a debugar
    setTimeout(() => {
      errorMessage.value = ""; // Limpar a mensagem após 5 segundos
    }, 5000);
  }
};

// Função para excluir usuário
const deleteUser = async (id) => {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

  try {
    await api.delete(`/users/${id}`);
    successMessage.value = "Usuário excluído com sucesso!";
    fetchUsers(); // Atualiza a lista de usuários
    setTimeout(() => {
      successMessage.value = ""; // Limpar a mensagem após 5 segundos
    }, 5000);
  } catch (error) {
    errorMessage.value = "Erro ao excluir usuário.";
    console.error(error); // Para ajudar a debugar
    setTimeout(() => {
      errorMessage.value = ""; // Limpar a mensagem após 5 segundos
    }, 5000);
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="page-container">
    <!-- Botão Novo Usuário -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Gestão de Usuários</h2>
      <button @click="createUser" class="btn-primary">+ Novo Usuário</button>
    </div>

    <!-- Mensagens de Sucesso e Erro -->
    <p v-if="successMessage" class="text-white bg-green-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-white bg-red-500 p-2 rounded-lg mb-4 transition-all duration-500">
      {{ errorMessage }}
    </p>

    <!-- Tabela de Usuários -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <table class="table-auto min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Nome</th>
            <th class="border px-4 py-2 text-left">Email</th>
            <th class="border px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2 flex space-x-2 justify-center">
              <button @click="editUser(user)" class="icon-btn">
                <PencilIcon class="w-5 h-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button @click="deleteUser(user.id)" class="icon-btn">
                <TrashIcon class="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulário de Edição/Criação -->
    <div v-if="isEditing || isCreating" class="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold">{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</h3>
      <form @submit.prevent="saveUser">
        <div class="grid grid-cols-1 gap-4 mt-4">
          <input v-model="userForm.name" placeholder="Nome" class="input-field" required />
          <input v-model="userForm.email" placeholder="E-mail" type="email" class="input-field" required />
          <input v-if="isCreating" v-model="userForm.password" placeholder="Senha" type="password" class="input-field" required />

          <button type="submit" class="btn-primary w-full">
            {{ isEditing ? "Salvar Alterações" : "Criar Usuário" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  @apply w-[90%] max-w-4xl h-[auto] p-6 bg-white rounded-lg shadow-md mx-auto;  /* Centraliza e define a largura */
}

th, td {
  @apply border px-4 py-2;
}

.icon-btn {
  @apply p-2 rounded-full hover:bg-gray-100 transition; /* Botões arredondados */
}

.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition;
}

/* Responsividade: Ajusta as larguras para telas pequenas */
@media (max-width: 768px) {
  .table-auto {
    @apply text-sm; /* Diminuir tamanho da fonte para telas menores */
  }
  .icon-btn {
    @apply p-2; /* Diminuir o tamanho dos botões */
  }
}
</style>
