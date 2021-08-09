<template>
  <div>
    <div class="d-flex flex-row justify-start">
      <v-btn color="primary" icon :to="{ name: 'login' }">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <div class="title">Olvide mi contraseña</div>
    </div>
    <v-form @submit.prevent="forgotPassword">
      <v-text-field
        v-model="user.email"
        id="inputEmail"
        name="email"
        type="email"
        label="Correo electrónico"
      ></v-text-field>
      <v-btn type="submit" color="primary" rounded>Recuperar</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      user: {
        email: null
      }
    };
  },
  methods: {
    forgotPassword() {
      console.log(this.user);
    }
  }
};
</script>

<style>
</style>