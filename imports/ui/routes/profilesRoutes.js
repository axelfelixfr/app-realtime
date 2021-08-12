import ListProfilesView from "../views/ListProfilesView.vue";
import SaveProfile from "../views/SaveProfile.vue";
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
      component: ListProfilesView
    },
    {
      name: "createProfile",
      path: "crear",
      component: SaveProfile
    },
    {
      name: "editProfile",
      path: "editar",
      component: SaveProfile
    }
  ]
};
