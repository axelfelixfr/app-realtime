import { Meteor } from "meteor/meteor";
import Vue from "vue";

// Plugins
import vuetify from "../../ui/libraries/vuetify";

// Vuex
import store from "../../ui/store";

// Main app
import App from "/imports/ui/App";

// Router
import router from "../../ui/router";

// Directivas
import "../../ui/directives/v-can";

// Montamos el componente App en Meteor
Meteor.startup(() => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App) // Renderizamos el componente App.vue
  }).$mount("app"); // Lo montamos en el html, en la etiqueta <app></app>
});
