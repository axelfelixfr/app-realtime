import loginRoutes from "./loginRoutes";
import HomeView from "../views/HomeView.vue";
import Main from "../components/Home/Main.vue";
import ConfigureAccount from "../components/Account/ConfigureAccount.vue";

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
          sectionView: ConfigureAccount
        }
      }
    ]
  }
];
