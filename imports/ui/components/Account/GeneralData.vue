<template>
  <v-form @submit.prevent="saveUser">
    <v-card class="py-3">
      <v-card-title>
        <div class="subtitle-2">Datos generales</div>
      </v-card-title>
      <v-col>
        <v-card-text>
          <v-text-field
            v-model="user.profile.name"
            id="inputName"
            name="name"
            label="Nombre completo"
          ></v-text-field>
          <v-text-field
            v-model="user.username"
            id="inputUsername"
            name="username"
            label="Usuario"
          ></v-text-field>
          <v-text-field
            v-model="user.emails[0].address"
            id="inputEmail"
            name="email"
            label="Correo electrónico"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn type="submit" color="primary" rounded depressed>
              Guardar
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-card>
  </v-form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "GeneralData",
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [
          {
            address: null,
            verified: false
          }
        ],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      }
    };
  },
  created() {
    const user = this.$store.state.user.user;
    this.user = {
      _id: user._id,
      username: user.username,
      emails: user.emails,
      profile: user.profile
    };
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    saveUser() {
      this.$loader.activate("Actualizando datos...");
      Meteor.call("updatePersonalDataUser", this.user, (error, success) => {
        this.$loader.desactivate();
        if (error) {
          this.$alert.showAlertSimple("error", error.reason);
          console.log("error", error);
        } else {
          this.setUser(Meteor.user());
          this.$root.$emit("setUserLogged");
          this.$alert.showAlertSimple("success", success.message);
        }
      });
    }
  }
};
</script>

