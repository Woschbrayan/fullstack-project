import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import api from "../services/api.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await api.post("/login", { email, password });
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
        return true;
      } catch (error) {
        return false;
      }
    },

    logout() {
      const router = useRouter(); // Obtém o roteador
      this.token = "";
      localStorage.removeItem("token");
      router.push("/login"); // Redireciona para a tela de login
    },
  },

  getters: {
    isAuthenticated() {
      return !!this.token; // Retorna `true` se houver token armazenado
    },
  },
});
