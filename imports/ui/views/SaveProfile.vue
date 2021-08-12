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
                label="Descripci´ón del perfil"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SaveProfile",
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
      }
    };
  },
  created() {
    if (this.$router.currentRoute.profile.includes("create")) {
      this.dataView.title = "Crear perfil";
      this.dataView.targetButton = "Crear";
    } else if (this.$router.currentRoute.profile.includes("edit")) {
      this.dataView.title = "Editar perfil";
      this.dataView.targetButton = "Editar";
    }
  },
  methods: {
    saveProfile() {
      console.log(this.profile);
    }
  }
};
</script>
