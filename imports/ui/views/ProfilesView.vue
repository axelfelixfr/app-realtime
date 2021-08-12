<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12" sm="8" md="6" lg="5" xl="5">
        <v-data-table
          :headers="headers"
          :items="profiles"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="info" v-on="on" small class="mr-2">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="error" v-on="on" small class="mr-2">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProfilesView",
  data() {
    return {
      headers: [
        { value: "description", text: "Nombre del perfil", sortable: true },
        { value: "action", text: "Opciones", sortable: false }
      ],
      profiles: [
        {
          _id: 1,
          name: "admin",
          username: "Administrador"
        },
        {
          _id: 2,
          name: "chat",
          username: "Usuario chat"
        }
      ]
    };
  }
};
</script>