import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

const checkPermission = function (methodArgs, methodOptions) {
  // Accedemos al id del usuario
  const idUser = this.userId;
  // De igual forma guardamos los permisos en una constante
  const permissions = methodOptions.permissions;
  // hasPermission es una bandera para saber si tiene los permisos necesarios el usuario
  let hasPermission = false;
  // Si es posible acceder al id del usuario, accede a la condición
  if (idUser !== null) {
    // Accedemos al nombre de perfil que tenga
    const profileName = Meteor.user().profile.profile;
    // Después, dependiendo del perfil que tenga, se buscaran sus permisos
    hasPermission = Roles.userIsInRole(idUser, permissions, profileName);
  }

  // Si no tiene los permisos necesarios, entonces retorna un error de Meteor
  if (!hasPermission) {
    throw new Meteor.Error(
      "403",
      "Acceso denegado",
      "No tienes permiso para ejecutar esta acción"
    );
  }

  // Se retornaran los args de la función
  return methodArgs;
};

// Exportamos la función
export default { checkPermission };
