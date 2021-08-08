import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import vuetify from "../../ui/plugins/vuetify";
import '../../ui/plugins/index';


// Main app
import App from '/imports/ui/App';

// Montamos el componente App en Meteor
Meteor.startup(()=>{
    new Vue ({
        vuetify,
        render:h=>h(App) // Renderizamos el componente App.vue
    }).$mount("app"); // Lo montamos en el html, en la etiqueta <app></app>
})