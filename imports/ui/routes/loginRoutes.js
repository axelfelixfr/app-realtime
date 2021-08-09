import AuthView from "../views/AuthView.vue";
import Login from "../components/Auth/Login.vue";
import ForgotPassword from "../components/Auth/ForgotPassword.vue";
import ResetPassword from "../components/Auth/ResetPassword";
import SetInitialPassword from "../components/Auth/SetInitialPassword";

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
    },
    {
      path: "/reset-password/:token",
      name: "resetPassword",
      components: {
        sectionView: ResetPassword
      }
    },
    {
      path: "/enroll-account/:token",
      name: "enrollAccount",
      components: {
        sectionView: SetInitialPassword
      }
    }
  ]
};
