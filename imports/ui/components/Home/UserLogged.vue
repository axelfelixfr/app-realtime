<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="default" dark text v-on="on" class="mr-5">
        {{ user.username }}
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item :to="{ name: 'account' }">Cuenta</v-list-item>
      <v-list-item @click="closeSession">Cerrar sesión</v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "UserLogged",
  data() {
    return {
      user: {
        username: null
      },
      onLogoutHook: null
    };
  },
  created() {
    this.setSession();
  },
  mounted() {
    this.onLogoutHook = Accounts.onLogout(() => {
      this.closeFrotendSession();
    });
  },
  methods: {
    ...mapMutations("user", ["logout"]),
    closeSession() {
      this.onLogoutHook.stop();
      Meteor.logout();
      this.logout();
      this.$router.push({ name: "login" });
    },
    closeFrotendSession() {
      this.onLogoutHook.stop();
      this.logout();
      this.$router.push({ name: "login" });
    },
    setSession() {
      if (Meteor.userId() !== null) {
        this.user = this.$store.state.user.user;
      } else {
        this.closeSession();
      }
    }
  }
};
</script>

