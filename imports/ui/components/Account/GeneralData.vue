<template>
  <v-form>
    <v-card class="py-3">
      <v-card-title>
        <div class="subtitle-2">Datos generales</div>
      </v-card-title>
      <v-col>
        <v-card-text>
          <v-text-field
            v-model="user.name"
            id="inputName"
            name="name"
            disabled
            label="Nombre completo"
          ></v-text-field>
          <v-text-field
            v-model="user.username"
            id="inputUsername"
            name="username"
            disabled
            label="Usuario"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            id="inputEmail"
            name="email"
            disabled
            label="Correo electrónico"
          ></v-text-field>
          <v-text-field
            v-model="user.profile"
            id="inputProfile"
            name="profile"
            disabled
            label="Perfil"
          ></v-text-field>
        </v-card-text>
      </v-col>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "GeneralData",
  data() {
    return {
      user: {
        _id: null,
        name: null,
        username: null,
        email: null,
        profile: null
      }
    };
  }
};
</script>

<style>
</style>