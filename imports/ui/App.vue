<template>
  <v-app>
    <router-view name="allPageView"></router-view>
    <!-- <v-container>
      <h1>Hola mundo</h1>
      <v-btn color="primary" @click="openAlert">Abrir alerta</v-btn>
      <v-btn color="success" @click="openLoader">Loader</v-btn>
      <v-btn color="error" @click="openModalRemove">Modal</v-btn>
    </v-container>
    <AlertMessage ref="refAlertMessageTest" />
    <Loader ref="refLoaderTest" />
    <ModalRemove
      ref="refModalRemove"
      v-bind:modalData="userTemp"
      @id_element="deleteUser"
    /> -->
  </v-app>
</template>

<script>
// import AlertMessage from "./components/Utilities/Alerts/AlertMessage.vue";
// import Loader from "./components/Utilities/Loaders/Loader.vue";
// import ModalRemove from "./components/Utilities/Modals/ModalRemove.vue";
export default {
  name: "App"
  /*
  components: {
    AlertMessage,
    Loader,
    ModalRemove
  },
  
  data() {
    return {
      userTemp: {
        preposition: "al",
        typeElement: "usuario",
        mainNameElement: "",
        _id: null,
        element: {}
      }
    };
  },
  methods: {
    openAlert() {
      // this.$refs.refAlertMessageTest.showAlertSimple("warning", "Exitoso!!!!");
      this.$refs.refAlertMessageTest.showAlertFull(
        "mdi-close-circle",
        "error",
        "Credenciales incorrectas",
        "",
        5000,
        "right",
        "top",
        "Texto de prueba"
      );
    },
    openLoader() {
      this.$refs.refLoaderTest.activate();
      setTimeout(() => {
        this.$refs.refLoaderTest.desactivate();
      }, 5000);
    },
    openModalRemove() {
      const user = {
        _id: "asdas112",
        name: "Axel",
        lastName: "Flores",
        age: 24,
        country: "México"
      };
      this.userTemp.element = user;
      this.userTemp._id = user._id;
      this.userTemp.mainNameElement = user.name;

      this.$refs.refModalRemove.dialog = true;
    },
    deleteUser(idUser) {
      console.log("Id del usuario a eliminar", idUser);
    }
  }
  */
};
</script>

<style scoped>
</style>