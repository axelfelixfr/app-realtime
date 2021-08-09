import { Meteor } from "meteor/meteor";
import Vue from "vue";
import vuetify from "../../ui/plugins/vuetify";
import "../../ui/plugins/index";

// Main app
import App from "/imports/ui/App";
import router from "../../ui/router";

// Montamos el componente App en Meteor
Meteor.startup(() => {
  new Vue({
    router,
    vuetify,
    render: h => h(App) // Renderizamos el componente App.vue
  }).$mount("app"); // Lo montamos en el html, en la etiqueta <app></app>
});
