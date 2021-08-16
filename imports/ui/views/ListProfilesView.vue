<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="6" lg="5" xl="5">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                color="success"
                v-on="on"
                fab
                dark
                :to="{ name: 'createProfile' }"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar perfil</span>
          </v-tooltip>
        </div>
        <v-data-table
          :headers="headers"
          :items="profiles"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="info"
                  v-on="on"
                  small
                  class="mr-2"
                  @click="openEditProfile(item)"
                >
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  v-on="on"
                  small
                  class="mr-2"
                  @click="openRemoveModal(item)"
                >
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <ModalRemove
          ref="refModalRemove"
          v-bind:modalData="profileTemp"
          @id_element="deleteProfile"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalRemove from "../components/Utilities/ModalRemove.vue";
import { Profile } from "../../api/Profiles/Profile";

export default {
  name: "ListProfilesView",
  components: {
    ModalRemove
  },
  data() {
    return {
      headers: [
        { value: "description", text: "Nombre del perfil", sortable: true },
        { value: "action", text: "Opciones", sortable: false }
      ],
      // profiles: [
      //   {
      //     _id: 1,
      //     name: "admin",
      //     description: "Administrador"
      //   },
      //   {
      //     _id: 2,
      //     name: "chat",
      //     description: "Usuario chat"
      //   }
      // ],
      profileTemp: {
        preposition: "el",
        typeElement: "perfil",
        mainNameElement: "",
        _id: null,
        element: {}
      }
    };
  },
  methods: {
    openEditProfile(profile) {
      // Editar perfil
      console.log(profile);
      this.$router.push({ name: "editProfile" });
    },
    openRemoveModal(profile) {
      console.log("Perfil", profile);
      this.profileTemp.element = profile;
      this.profileTemp._id = profile._id;
      this.profileTemp.mainNameElement = profile.description;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteProfile(idProfile) {
      this.$loader.activate("Eliminando perfil...");
      Meteor.call("deleteProfile", { idProfile }, (error, response) => {
        this.$loader.desactivate();
        if (error) {
          if (error.details) {
            this.$alert.showAlertFull(
              "warning",
              "warning",
              error.reason,
              "multi-line",
              5000,
              "right",
              "bottom",
              error.details
            );
          } else {
            this.$alert.showAlertSimple("error", error.reason);
          }
        } else {
          this.$alert.showAlertSimple("success", response.message);
        }
      });
    }
  },
  meteor: {
    $subscribe: {
      listNotStacticProfiles: []
    },
    profiles() {
      return Profile.find().fetch();
    }
  }
};
</script>