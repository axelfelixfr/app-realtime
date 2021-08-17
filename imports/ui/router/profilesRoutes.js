import ListProfilesView from "../views/ListProfilesView.vue";
import SaveProfileView from "../views/SaveProfileView.vue";

export default {
  path: "perfiles",
  components: {
    sectionView: {
      render: c => c("router-view")
    }
  },
  children: [
    {
      name: "profiles",
      path: "",
      component: ListProfilesView,
      meta: {
        permission: "profiles-view"
      }
    },
    {
      name: "createProfile",
      path: "crear",
      component: SaveProfileView,
      meta: {
        permission: "profiles-create"
      }
    },
    {
      name: "editProfile",
      path: "editar",
      component: SaveProfileView,
      meta: {
        permission: "profiles-edit"
      }
    }
  ]
};
