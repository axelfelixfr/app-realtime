<template>
  <v-app-bar app dark dense src="./img/background-home.jpg">
    <v-toolbar-title>Scaffold Meteor + Vue</v-toolbar-title>
    <v-spacer></v-spacer>
    <UserLogged />
    <template v-slot:extension>
      <v-tabs v-model="optionSelected" align-with-title>
        <v-tab
          v-for="option in options"
          :key="option.index"
          @click="goToView(option)"
          v-text="option.title"
        ></v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import UserLogged from "./UserLogged.vue";

export default {
  name: "Header",
  components: {
    UserLogged
  },
  data() {
    return {
      optionSelected: 0,
      options: [
        // {
        //   index: 0,
        //   icon: "home",
        //   title: "Inicio",
        //   namePath: "main"
        // },
        // {
        //   index: 1,
        //   icon: "person",
        //   title: "Usuarios",
        //   namePath: "users"
        // },
        // {
        //   index: 2,
        //   icon: "user-tag",
        //   title: "Perfiles",
        //   namePath: "profiles"
        // }
      ]
    };
  },
  watch: {
    $route() {
      this.updateSelectedOption();
    }
  },
  created() {
    Meteor.call("getSystemOptionsUser", (error, response) => {
      if (error) {
        this.$alert.showAlertSimple("error", error.reason);
      } else {
        this.options = response.data;
      }
    });
    this.updateSelectedOption();
  },
  methods: {
    goToView(option) {
      this.$router.push({ name: option.routeName });
    },
    updateSelectedOption() {
      const selectedOption = this.options.find(
        option => option.routeName == this.$route.name
      );
      this.optionSelected = selectedOption
        ? this.options.indexOf(selectedOption)
        : this.optionSelected;
    }
  }
};
</script>

<style>
</style>