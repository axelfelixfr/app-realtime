import loginRoutes from "./loginRoutes";

export default [
  {
    path: "*",
    redirect: "/login"
  },
  loginRoutes
];
