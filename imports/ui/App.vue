<template>
  <v-app>
    <router-view name="allPageView"></router-view>
    <!-- Se ponene los componentes de Utilities en App para usarlos de forma global -->
    <AlertMessage />
    <Loader />
  </v-app>
</template>

<script>
import AlertMessage from "./components/Utilities/AlertMessage.vue";
import Loader from "./components/Utilities/Loader.vue";

export default {
  name: "App",
  components: {
    AlertMessage,
    Loader
  }
};
</script>
