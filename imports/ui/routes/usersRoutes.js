import UsersView from "../views/UsersView.vue";
import SaveUser from "../views/SaveUser.vue";
export default {
  name: "users",
  path: "usuarios",
  components: {
    sectionView: UsersView
  },
  children: [
    {
      name: "createUser",
      path: "crear",
      components: {
        usersOptionsView: SaveUser
      }
    }
  ]
};
