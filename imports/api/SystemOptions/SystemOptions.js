import Permissions from "../../startup/server/helpers/Permissions";

export default [
  {
    title: "Inicio",
    permission: null,
    routeName: "main"
  },
  {
    title: "Usuarios",
    permission: Permissions.USERS.LIST.VALUE,
    routeName: "users"
  },
  {
    title: "Perfiles",
    permission: Permissions.PROFILES.LIST.VALUE,
    routeName: "profiles"
  }
];
