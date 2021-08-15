<template>
  <v-snackbar
    v-model="snackbar"
    class="v-snack__content"
    :bottom="y === 'bottom'"
    :right="x === 'right'"
    :top="y === 'top'"
    :left="x === 'left'"
    :color="color"
    :multi-line="mode === 'multi-line'"
    :vertical="mode === 'vertical'"
    :timeout="timeout"
  >
    <v-card color="transparent" elevation="0">
      <v-card-title>
        <v-icon v-if="icon" dark left>{{ icon }}</v-icon>
        <span class="white--text">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn dark text small v-on="on" @click="snackbar = false">
              <v-icon small>mdi-window-close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text v-if="text">
        <span class="white--text">{{ text }}</span>
      </v-card-text>
    </v-card>
  </v-snackbar>
</template>

<script>
export default {
  name: "AlertMessage",
  data() {
    return {
      snackbar: false,
      x: "",
      y: "",
      color: "",
      mode: "",
      icon: null,
      title: "",
      text: "",
      timeout: 6000
    };
  },
  mounted() {
    // Le agregamos al prototype de Vue, la variable $alert que contendra todo el componente (con this)
    // De esta forma se puede llamar de forma global
    Vue.prototype.$alert = this;
  },
  methods: {
    /**
     * Configuración principal de la alerta
     * @param color 'Color de la alerta': success, error, info, primary, warning
     * @param title 'Título de la alerta'
     */
    showAlertSimple(color, title) {
      this.color = color;
      this.title = title;
      this.x = "right";
      this.y = "bottom";
      if (color === "success") {
        this.icon = "mdi-check-outline";
      } else if (color === "error") {
        this.icon = "mdi-close-octagon-outline";
      } else if (color === "info") {
        this.icon = "mdi-information-outline";
      } else if (color === "warning") {
        this.icon = "mdi-alert-outline";
      }
      this.text = "";
      this.mode = "";
      this.timeout = 6000;
      this.snackbar = true;
    },
    /**
     * Configuración avanzada de la alerta
     * @param icon 'Icono de la alerta'
     * @param color 'Color de la alerta': success, info, warning, error
     * @param title 'Título de la alerta'
     * @param mode 'Modo de la alerta': vertical, multi-line (por defecto)
     * @param timeout 'Tiempo de duración': 0 es indefinido
     * @param x 'Posición en x de la alerta': left, right o string vacío para center
     * @param y 'Posición en y de la alerta': top, bottom
     * @param text 'Contenido de la alerta'
     *
     */
    showAlertFull(icon, color, title, mode, timeout, x, y, text = null) {
      this.icon = icon;
      this.color = color;
      this.title = title;
      this.mode = mode;
      this.timeout = timeout;
      this.x = x;
      this.y = y;
      this.text = text;
      this.snackbar = true;
    }
  }
};
</script>

<style>
.v-snack__content {
  padding: 0 !important;
}
</style>