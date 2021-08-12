<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Configurar cuenta</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="5">
        <GeneralData />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" offset-xl="1" xl="5">
        <UpdatePassword />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GeneralData from "../components/Account/GeneralData.vue";
import UpdatePassword from "../components/Account/UpdatePassword.vue";
export default {
  name: "ConfigureAccount",
  components: {
    GeneralData,
    UpdatePassword
  }
};
</script>
