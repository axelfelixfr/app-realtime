import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
const checkPermission = function (methodArgs, methodOptions) {
  const idUser = this.userId;
  const permissions = methodOptions.permissions;
  let hasPermission = false;
  if (idUser !== null) {
    const profileName = Meteor.user().profile.profile;
    hasPermission = Roles.userIsInRole(idUser, permissions, profileName);
  }
  if (!hasPermission) {
    throw new Meteor.Error(
      "403",
      "Acceso denegado",
      "No tienes permiso para ejecutar esta acción"
    );
  }
  return methodArgs;
};

export default { checkPermission };
