<template>
  <v-app>
    <v-container>
      <h1>Hola mundo</h1>
      <v-btn color="primary" @click="openAlert">Abrir alerta</v-btn>
    </v-container>
    <AlertMessage class="v-snack__content" ref="refAlertMessageTest" />
  </v-app>
</template>

<script>
import AlertMessage from "./components/Utilities/AlertMessage.vue";
export default {
  name: "App",
  components: {
    AlertMessage
  },
  methods: {
    openAlert() {
      this.$refs.refAlertMessageTest.showAlertSimple("success", "Exitoso!!!!");
    }
  }
};
</script>

<style>
.v-snack__content {
  padding: 0 !important;
}
</style>