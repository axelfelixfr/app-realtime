import AuthView from "../views/AuthView.vue";
import Login from "../components/Auth/Login.vue";
import ForgotPassword from "../components/Auth/ForgotPassword.vue";

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
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      components: {
        sectionView: ForgotPassword
      }
    }
  ]
};
