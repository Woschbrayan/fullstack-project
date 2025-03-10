import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import UsersView from "@/views/UsersView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import VideosView from "@/views/VideosView.vue";

// Função que verifica se o usuário está autenticado
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;  // Supondo que você armazene o token no localStorage
};

const routes = [
  { path: '/', redirect: '/login' },  // Redireciona para login se o usuário acessar a página inicial
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: "/users", component: UsersView, meta: { requiresAuth: true } },
  { path: "/categories", component: CategoriesView, meta: { requiresAuth: true } },
  { path: "/videos", component: VideosView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFoundView }, // Rota 404
];

// Criando o router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protegendo rotas que exigem autenticação
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Se o usuário tentar acessar uma rota protegida sem estar autenticado, redireciona para o login
    next('/login');
  } else {
    next(); // Permite a navegação
  }
});

export default router;
