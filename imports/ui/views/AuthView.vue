<template>
  <v-row class="my-0">
    <v-col
      xs="12"
      sm="8"
      md="4"
      class="d-flex flex-column justify-space-between pa-12"
    >
      <div class="text-center">
        <img
          src="./img/vue-meteor.png"
          alt="Vue meteor"
          width="auto"
          height="180px"
        />
      </div>
      <!-- RouterView -->
      <div class="my-auto">
        <router-view name="sectionView"></router-view>
      </div>
    </v-col>
    <v-col
      xs="12"
      sm="4"
      md="8"
      class="right-side d-flex flex-column justify-center"
    >
      <div class="display-3 font-weight-medium mr-10 text-right white--text">
        Scaffold Meteor + Vue
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AuthView"
};
</script>

<style>
.display-3 {
  z-index: 2;
  margin-top: 350px;
}
.right-side {
  background-image: url("./img/meteor.jpg");
  background-size: cover;
  height: 100vh;
  position: relative;
}
</style>