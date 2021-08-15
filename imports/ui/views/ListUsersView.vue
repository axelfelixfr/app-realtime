<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="10" lg="8" xl="5">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                color="success"
                v-on="on"
                fab
                dark
                :to="{ name: 'createUser' }"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar usuario</span>
          </v-tooltip>
        </div>
        <v-data-table
          :headers="headers"
          :items="users"
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
                  @click="openEditUser(item)"
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
          <template v-slot:[`body.append`]="{ isMobile }">
            <tr v-if="!isMobile">
              <td>
                <v-text-field
                  v-model="headersFilter.name"
                  type="text"
                  label="Nombre"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.username"
                  type="text"
                  label="Usuario"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="headersFilter.email"
                  type="email"
                  label="Correo"
                ></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
        <ModalRemove
          ref="refModalRemove"
          v-bind:modalData="userTemp"
          @id_element="deleteUser"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalRemove from "../components/Utilities/ModalRemove.vue";

export default {
  name: "ListUsersView",
  components: {
    ModalRemove
  },
  data() {
    return {
      headersFilter: {
        name: "",
        username: "",
        email: ""
      },
      // users: [
      //   {
      //     _id: 1,
      //     name: "Peter parker",
      //     username: "Spider-man",
      //     email: "spidy@correo.com"
      //   },
      //   {
      //     _id: 2,
      //     name: "Tony Stark",
      //     username: "iron-man",
      //     email: "ironman@correo.com"
      //   },
      //   {
      //     _id: 3,
      //     name: "Steve Rogers",
      //     username: "Capitan america",
      //     email: "capi@correo.com"
      //   }
      // ],
      userTemp: {
        preposition: "al",
        typeElement: "usuario",
        mainNameElement: "",
        _id: null,
        element: {}
      }
    };
  },
  computed: {
    headers() {
      return [
        // La propiedad "sortable" es para ordenar la columna, de forma ascendente o descendente
        {
          value: "profile.name",
          text: "Nombre",
          sortable: true,
          filter: value => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.name.toLocaleLowerCase()) !== -1
            );
          }
        },
        {
          value: "username",
          text: "Usuario",
          sortable: true,
          filter: value => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.username.toLocaleLowerCase()) !== -1
            );
          }
        },
        {
          value: "emails[0].address",
          text: "Correo electrónico",
          sortable: true,
          filter: value => {
            return (
              value != null &&
              typeof value === "string" &&
              value
                .toString()
                .toLocaleLowerCase()
                .indexOf(this.headersFilter.email.toLocaleLowerCase()) !== -1
            );
          }
        },
        {
          value: "action",
          text: "Opciones",
          sortable: false
        }
      ];
    }
  },
  methods: {
    openEditUser(user) {
      // Editar usuario
      console.log(user);
      this.$router.push({ name: "editUser" });
    },
    openRemoveModal(user) {
      console.log("Usuario", user);
      this.userTemp.element = user;
      this.userTemp._id = user._id;
      this.userTemp.mainNameElement = user.name;
      this.$refs.refModalRemove.dialog = true;
    },
    deleteUser(idUser) {
      console.log("Usuario a eliminar :", idUser);
    }
  },
  meteor: {
    $subscribe: {
      // Se maneja como arreglo vacío ya que el endpoint no necesita argumentos
      listUser: []
    },
    users() {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
    }
  }
};
</script>
