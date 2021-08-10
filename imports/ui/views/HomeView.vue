<template>
  <v-container fluid>
    <Header />
    <v-main>
      <router-view name="sectionView"></router-view>
    </v-main>
    <Footer />
  </v-container>
</template>

<script>
import Header from "../components/Home/Header.vue";
import Footer from "../components/Home/Footer.vue";
export default {
  name: "HomeView",
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>