<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api'; // Importa a API para fazer chamadas ao backend

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem!';
    return;
  }

  try {
    const response = await api.post('/users', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    alert('Cadastro realizado com sucesso!');
    router.push('/login'); // Redireciona para a tela de login após o cadastro
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Erro ao registrar usuário';
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Cadastro</h2>
      
      <div class="space-y-4">
        <input v-model="name" placeholder="Nome" type="text" class="input-field" />
        <input v-model="email" placeholder="E-mail" type="email" class="input-field" />
        <input v-model="password" placeholder="Senha" type="password" class="input-field" />
        <input v-model="confirmPassword" placeholder="Confirme a senha" type="password" class="input-field" />

        <button @click="register" class="btn-primary">Cadastrar</button>

        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>
      </div>

      <p class="text-center mt-4 text-gray-600">
        Já tem uma conta?
        <router-link to="/login" class="text-blue-600 hover:underline">Faça login</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300;
}

.btn-primary {
  @apply w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300;
}
</style>
