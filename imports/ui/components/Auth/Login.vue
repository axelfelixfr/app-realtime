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
import { mapMutations } from "vuex";
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
    ...mapMutations("user", ["setUser"]),
    login() {
      // console.log(this.user);
      // this.$loader.activate();
      // setTimeout(() => {
      //   this.$loader.desactivate();
      //   this.$alert.showAlertSimple("error", "credenciales incorrectas");
      // }, 2000);
      Meteor.loginWithPassword(
        this.user.userOrEmail,
        this.user.password,
        error => {
          if (error) {
            console.log("Error in login", error),
              this.$alert.showAlertSimple("error", "credenciales incorrectas");
          } else {
            Meteor.logoutOtherClients(err => {
              if (err) {
                console.log("Error al cerrar sesión en otros clientes", err);
              }
            });
            this.setUser(Meteor.user());
            this.$router.push({ name: "main" });
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  margin-top: 45px;
}
</style>