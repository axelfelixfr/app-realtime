import ListUsersView from "../views/ListUsersView.vue";
import SaveUserView from "../views/SaveUserView.vue";

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
      component: ListUsersView,
      meta: {
        permission: "users-view"
      }
    },
    {
      name: "createUser",
      path: "crear",
      component: SaveUserView,
      meta: {
        permission: "users-create"
      }
    },
    {
      name: "editUser",
      path: "editar",
      component: SaveUserView,
      meta: {
        permission: "users-edit"
      }
    }
  ]
};
