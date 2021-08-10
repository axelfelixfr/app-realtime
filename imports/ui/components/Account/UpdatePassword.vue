<template>
  <v-form @submit.prevent="updatePassword">
    <v-card>
      <v-card-title>
        <div class="subtitle-2">Cambio de contraseña</div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password.old"
          id="inputPassword"
          :append-icon="showPass.old ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass.old ? 'text' : 'password'"
          name="current_password"
          label="Contraseña actual"
          @click:append="showPass.old = !showPass.old"
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="password.new"
          id="inputNewPassoword"
          :append-icon="showPass.new ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass.new ? 'text' : 'password'"
          name="password"
          label="Nueva contraseña"
          @click:append="showPass.new = !showPass.new"
          autocomplete="new-password"
        ></v-text-field>

        <v-text-field
          v-model="password.confirm"
          id="inputConfirmPassoword"
          :append-icon="showPass.confirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass.confirm ? 'text' : 'password'"
          name="password_confirmation"
          label="Confirmar contraseña"
          @click:append="showPass.confirm = !showPass.confirm"
          autocomplete="new-password"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <!-- <v-row justify="start">
          <v-btn type="submit" color="primary" rounded depressed>Cambiar</v-btn>
        </v-row> -->

        <div class="d-flex start">
          <v-btn type="submit" color="primary" rounded depressed
            >Resetear</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "UpdatePassword",
  data() {
    return {
      password: {
        old: null,
        new: null,
        confirm: null
      },
      showPass: {
        old: null,
        new: null,
        confirm: null
      }
    };
  },
  methods: {
    updatePassword() {}
  }
};
</script>

<style>
</style>