import ListUsersView from "../views/ListUsersView.vue";
import SaveUser from "../views/SaveUser.vue";

export default {
  path: "usuarios",
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [
    {
      name: "users",
      path: "",
      component: ListUsersView
    },
    {
      name: "createUser",
      path: "crear",
      component: SaveUser
    },
    {
      name: "editUser",
      path: "editar",
      component: SaveUser
    }
  ]
};
