import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.indigo.darken4,
        accent: colors.red.accent4,
        error: colors.red.darken1,
        info: colors.lightBlue.lighten1,
        success: colors.green,
        warning: colors.amber.darken1
      }
    },
    icons: {
      iconfont: "mdi"
    },
    lang: {
      locales: {
        es
      },
      current: "es"
    }
  }
});
