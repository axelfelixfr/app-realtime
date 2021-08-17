<template>
  <v-container fluid>
    <Header />
    <v-main id="main_section">
      <router-view name="sectionView" v-if="loggedUser"></router-view>
    </v-main>
    <Footer />
  </v-container>
</template>

<script>
import Header from "../components/Home/Header.vue";
import Footer from "../components/Home/Footer.vue";
export default {
  name: "HomeView",
  data() {
    return {
      loggedUser: false
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    // Otra forma de suscribirnos a una publicación es con this.$subscribe
    this.$subscribe("roles", []); // Se pasa arreglo vacío ya que no necesita argumentos la publicación
  },
  watch: {
    "$subReady.roles"(newValue) {
      if (newValue) {
        this.loggedUser = true;
      }
    }
  }
};
</script>

<style>
#main_section {
  margin-bottom: 80px;
  position: relative;
}
</style>