<template>
  <div class="login-wrapper">
    <div class="title secondary--text">Bienvenido!</div>
    <div class="display-1 mb-0 secondary-text">Iniciar Sesión</div>
    <v-form @submit.prevent="login" autocomplete="off">
      <v-text-field
        id="inputUser"
        v-model="user.userOrEmail"
        autocomplete="off"
        label="Usuario"
        name="email"
        prepend-icon="person"
        color="primary"
        type="text"
      ></v-text-field>

      <v-text-field
        id="inputPassword"
        label="Contraseña"
        name="name"
        prepend-icon="lock"
        v-model="user.password"
        type="password"
      ></v-text-field>

      <div class="d-flex justify-end">
        <v-btn color="primary" text small :to="{ name: 'forgotPassword' }"
          >¿Olvidaste tu contraseña?</v-btn
        >
      </div>

      <div class="d-flex justify-start">
        <v-btn type="submit" rounded color="primary" transition="fade"
          >Entrar</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        userOrEmail: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      console.log(this.user);
      this.$loader.activate();
      setTimeout(() => {
        this.$loader.desactivate();
        this.$alert.showAlertSimple("error", "credenciales incorrectas");
      }, 2000);
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  margin-top: 45px;
}
</style>