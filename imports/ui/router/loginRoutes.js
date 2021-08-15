const AuthView = () => import("../views/AuthView.vue");
const Login = () => import("../components/Auth/Login.vue");
const ForgotPassword = () => import("../components/Auth/ForgotPassword.vue");
const ResetPassword = () => import("../components/Auth/ResetPassword.vue");
const SetInitialPassword = () =>
  import("../components/Auth/SetInitialPassword.vue");

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
