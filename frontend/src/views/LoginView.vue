<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push('/dashboard');
  } else {
    errorMessage.value = 'Credenciais inválidas!';
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
      
      <div class="space-y-4">
        <input 
          v-model="email" 
          placeholder="E-mail" 
          type="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input 
          v-model="password" 
          placeholder="Senha" 
          type="password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button 
          @click="login" 
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Entrar
        </button>

        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>
      </div>

      <p class="text-center mt-4 text-gray-600">
        Não tem conta?
        <router-link to="/register" class="text-blue-600 hover:underline">Cadastre-se</router-link>
      </p>
    </div>
  </div>
</template>
