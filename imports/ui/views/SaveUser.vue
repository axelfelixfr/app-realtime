<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Crear usuario</div>
      </v-col>
      <v-col cols="2">
        <!-- La propiedad "form" es necesario ya que el boton submit esta fuera del formulario, por lo que hace referencia al form "saveUser" -->
        <v-btn block type="submit" form="saveUser" color="primary">Crear</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveUser" id="saveUser" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="4">
                  <img
                    src="./img/vue-meteor.png"
                    alt="Subir imagen"
                    width="150px"
                  />
                </v-col>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field
                    v-model="user.name"
                    id="inputName"
                    name="name"
                    label="Nombre"
                  ></v-text-field>
                  <v-select
                    v-model="user.profile"
                    id="selectProfile"
                    label="Perfil"
                    name="profile"
                    :items="profiles"
                    item-text="description"
                    item-value="name"
                  ></v-select>
                  <v-text-field
                    v-model="user.username"
                    id="inputUsername"
                    label="Username"
                    name="username"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.email"
                    id="inputEmail"
                    type="email"
                    label="Correo electrónico"
                    name="email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SaveUser",
  data() {
    return {
      user: {
        _id: null,
        name: null,
        username: null,
        email: null,
        profile: null
      },
      profiles: [
        { name: "admin", description: "Administrador" },
        { name: "chat", description: "Usuario Chat" }
      ]
    };
  },
  methods: {
    saveUser() {
      console.log(this.user);
    }
  }
};
</script>

<style>
</style>