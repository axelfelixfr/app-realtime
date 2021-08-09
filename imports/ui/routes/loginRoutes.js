import AuthView from "../views/AuthView.vue";
import Login from "../components/Auth/Login.vue";

export default {
  path: "/login",
  components: {
    allPageView: AuthView
  },
  children: [
    {
      path: "",
      name: "login",
      components: {
        sectionView: Login
      }
    }
  ]
};
