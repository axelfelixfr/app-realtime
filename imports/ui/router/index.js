import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
// Rutas
import loginRoutes from "./loginRoutes";
import profilesRoutes from "./profilesRoutes";
import usersRoutes from "./usersRoutes";
// Componentes principales para rutas
const HomeView = () => import("../views/HomeView.vue");
const Main = () => import("../components/Home/Main.vue");
const ConfigureAccountView = () => import("../views/ConfigureAccountView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  // Rutas para login
  loginRoutes,
  {
    // A partir de la ruta "/", se pedirá autentificación con "requireAuth: true" en meta
    path: "/",
    components: {
      allPageView: HomeView
    },
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "main",
        path: "",
        components: {
          sectionView: Main
        }
      },
      {
        name: "account",
        path: "account",
        components: {
          sectionView: ConfigureAccountView
        }
      },
      // Rutas para CRUD de usuarios
      usersRoutes,
      // Rutas para CRUD de perfiles
      profilesRoutes
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLogged = store.state.user.isLogged;
  if (!requiresAuth && isLogged && to.name === "login") {
    next("/");
  } else if (requiresAuth && !isLogged) {
    next("/login");
  } else {
    next();
  }
});

export default router;
