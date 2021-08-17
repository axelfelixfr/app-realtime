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
    const permission = to.meta.permission;
    // Preguntamos si existe esa llave de permission en la ruta que quiere ir, en su atributo meta
    if (permission) {
      Meteor.call("checkPermission", { permission }, (error, response) => {
        if (error) {
          console.log("error", error);
          this.$alert.showAlertSimple("error", error.message);
        } else if (response.data.hasPermission) {
          next();
        } else {
          // next(from.path);
          // router.push({ path: from.path });
          router.replace({ path: from.path }).catch(() => {});
          console.warn("No tienes los permisos para acceder a esta sección");
        }
      });
    } else {
      next();
    }
  }
});

export default router;
