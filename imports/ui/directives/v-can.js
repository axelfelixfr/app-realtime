import Vue from "vue";
import { Roles } from "meteor/alanning:roles";

// Función para reemplazar el elemento HTML por un comentario, como <!--  -->
function commentNode(el, vnode) {
  const comment = document.createComment(" ");

  Object.defineProperty(comment, "setAttribute", {
    value: () => undefined
  });

  vnode.text = " ";
  vnode.elm = comment;
  vnode.isComment = true;
  vnode.context = undefined;
  vnode.tag = undefined;
  vnode.data.directives = undefined;

  if (vnode.componentInstance) {
    vnode.componentInstance.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}

// Para crear directivas en Vue, usamos directive()
// El primer argumento es el nombre de la directiva "can"
Vue.directive("can", function (el, binding, vnode) {
  // Si el modificador es disable (ej: v-can:edit.disable) entonces se pone el atributo disable, de lo que contrario será hide
  const behaviour = binding.modifiers.disable ? "disable" : "hide";

  // Usamos el métdo userIsInRole para saber si tiene permisos el usuario para ver dicho elemento en el HTML
  // El segundo argumento es el permiso a evaluar para saber si lo puede acceder a ver el usuario
  // Con biding.value accedemos al valor de nuestra directiva, ejemplos: "users", "profiles"
  // Con biding.arg son los argumentos que se pondran de nuestra directiva, ejemplos: "view", "edit", "delete"
  // Se le concatena "-" para ver el permiso correctamenet, un ejemplo sería así: "users-view"
  const ok = Roles.userIsInRole(
    Meteor.userId(),
    `${binding.value}-${binding.arg}`,
    Meteor.user().profile.profile
  ); // El último argumento es el scope de dicho usuario, para ver los permisos de su perfil

  // Si no tiene el permiso entrará a la condición
  if (!ok) {
    // Ahora se preguntara si quiere usar "hide" o "disable"
    if (behaviour === "hide") {
      // Reemplazara el elemento HTML por el comentario con la funcion commentNode
      commentNode(el, vnode);
    } else if (behaviour === "disable") {
      el.disabled = true;
    }
  }
});
