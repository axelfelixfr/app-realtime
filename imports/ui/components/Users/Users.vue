<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="10" lg="8" xl="5">
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="name"
          class="elevation-1"
        >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      headersFilter: {
        name: "",
        username: "",
        email: ""
      },
      users: [
        {
          name: "Peter parker",
          username: "Spider-man",
          email: "spidy@correo.com"
        },
        {
          name: "Tony Stark",
          username: "iron-man",
          email: "ironman@correo.com"
        },
        {
          name: "Steve Rogers",
          username: "Capitan america",
          email: "capi@correo.com"
        }
      ]
    };
  },
  computed: {
    headers() {
      return [
        // La propiedad "sortable" es para ordenar la columna, de forma ascendente o descendente
        {
          value: "name",
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
          value: "email",
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
        }
      ];
    }
  }
};
</script>

<style>
</style>