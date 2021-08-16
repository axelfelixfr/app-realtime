<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
      <v-col cols="2">
        <!-- La propiedad "form" es necesario ya que el boton submit esta fuera del formulario, por lo que hace referencia al form "saveProfile" -->
        <v-btn
          block
          type="submit"
          form="saveProfile"
          color="primary"
          v-text="dataView.targetButton"
        ></v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form
          @submit.prevent="saveProfile"
          id="saveProfile"
          autocomplete="off"
        >
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="profile.name"
                id="inputName"
                name="name"
                label="Nombre del perfil"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="profile.description"
                id="inputDescription"
                name="description"
                label="Descripción del perfil"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Permisos de este perfil</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchSelfPermission"
              placeholder="Buscar..."
              id="inputSearchSelfPermission"
              name="profileName"
            ></v-text-field>
          </v-card-text>
          <!-- v-sheet para la parte responsive, al colocarle un scroll-bar -->
          <v-sheet
            id="scrolling-techniques-2"
            class="overflow-y-auto"
            max-height="500"
          >
            <v-list style="height: 400px">
              <v-list-item-group>
                <draggable
                  :list="filteredSelfPermissions"
                  @change="ev => onChangeDragList(ev, 'selfPermissions')"
                  group="permissions"
                >
                  <v-list-item
                    v-for="permission in filteredSelfPermissions"
                    :key="permission._id"
                    v-text="permission.publicName"
                  >
                  </v-list-item>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Todos los permisos</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchPermission"
              placeholder="Buscar..."
              id="inputSearchPermission"
              name="profileName2"
            ></v-text-field>
          </v-card-text>
          <!-- v-sheet para la parte responsive, al colocarle un scroll-bar -->
          <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            max-height="500"
          >
            <v-list style="height: 400px">
              <v-list-item-group>
                <draggable
                  :list="filteredPermissions"
                  @change="ev => onChangeDragList(ev, 'allPermissions')"
                  group="permissions"
                >
                  <v-list-item
                    v-for="permission in filteredPermissions"
                    :key="permission._id"
                    v-text="permission.publicName"
                  >
                  </v-list-item>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "SaveProfile",
  components: {
    draggable
  },
  data() {
    return {
      profile: {
        _id: null,
        name: null,
        description: null,
        permissions: []
      },
      dataView: {
        title: "",
        targetButton: ""
      },
      searchSelfPermission: "",
      searchPermission: "",
      selfPermissions: [],
      allPermissions: [
        // { _id: "users-view" },
        // { _id: "users-create" },
        // { _id: "users-edit" },
        // { _id: "users-delete" }
      ]
    };
  },
  created() {
    if (this.$router.currentRoute.name.includes("create")) {
      this.dataView.title = "Crear perfil";
      this.dataView.targetButton = "Crear";
      this.listAllPermissions();
    } else if (this.$router.currentRoute.name.includes("edit")) {
      this.dataView.title = "Editar perfil";
      this.dataView.targetButton = "Editar";
    }
  },
  methods: {
    onChangeDragList(event, propData) {
      if (event.hasOwnProperty("removed")) {
        this[propData] = this[propData].filter(
          permission => permission._id !== event.removed.element._id
        );
      } else if (event.hasOwnProperty("added")) {
        this[propData].splice(event.added.newIndex, 0, event.added.element);
      }
    },
    saveProfile() {
      this.$loader.activate("Guardando perfil...");
      this.profile.permissions = this.selfPermissions.map(
        permission => permission._id
      );
      Meteor.call("saveProfile", this.profile, (error, response) => {
        this.$loader.desactivate();
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
        } else {
          this.$alert.showAlertSimple("success", response.message);
        }
      });
    },
    listAllPermissions() {
      Meteor.call("listPermissions", (error, response) => {
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
        } else {
          // data son los permissions
          this.allPermissions = response.data;
          // this.$alert.showAlertSimple("success", response.message)
        }
      });
    }
  },
  computed: {
    filteredSelfPermissions() {
      return this.selfPermissions.filter(permission => {
        return permission.publicName
          .toLowerCase()
          .includes(this.searchSelfPermission.toLowerCase());
      });
    },
    filteredPermissions() {
      return this.allPermissions.filter(permission => {
        return permission.publicName
          .toLowerCase()
          .includes(this.searchPermission.toLowerCase());
      });
    }
  }
};
</script>
