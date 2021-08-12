import loginRoutes from "./loginRoutes";
import usersRoutes from "./usersRoutes";
const HomeView = () => import("../views/HomeView.vue");
const Main = () => import("../components/Home/Main.vue");
const ConfigureAccountView = () => import("../views/ConfigureAccountView.vue");

export default [
  {
    path: "*",
    redirect: "/login"
  },
  loginRoutes,
  {
    path: "/",
    components: {
      allPageView: HomeView
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
      usersRoutes
    ]
  }
];
