import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ResponseMessage } from "./../../startup/server/utilities/ResponseMessage";
import { Meteor } from "meteor/meteor";
import Permissions from "../../startup/server/helpers/Permissions";
import AuthGuardian from "../../middlewares/AuthGuardian";
import { check } from "meteor/check";
import { Profile } from "../Profiles/Profile";
import { Roles } from "meteor/alanning:roles";

new ValidatedMethod({
  name: "listPermissions",
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuardian.checkPermission],
  validate: null,
  run() {
    const responseMessage = new ResponseMessage();
    try {
      const permissions = Meteor.roles.find().fetch();
      responseMessage.create(
        "Permisos disponibles en el sistema",
        null,
        permissions
      );
    } catch (exception) {
      console.error("listPermissions: ", exception);
      throw new Meteor.Error("500", "Ocurrió un error al obtener los permisos");
    }

    return responseMessage;
  }
});

new ValidatedMethod({
  name: "listPermissionsByProfile",
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuardian.checkPermission],
  validate({ idProfile }) {
    try {
      check(idProfile, String);
    } catch (exception) {
      console.error("listPermissionsByProfile: ", exception);
      throw new Meteor.Error("403", "La información introducida no es válida");
    }
  },
  run({ idProfile }) {
    const responseMessage = new ResponseMessage();
    try {
      const profile = Profile.findOne(idProfile);
      const permissions = Meteor.roles
        .find({ _id: { $in: profile.permissions } })
        .fetch();
      responseMessage.create("Permisos asociados al perfil", null, permissions);
    } catch (exception) {
      console.log("listPermissionsByProfile: ", exception);
      throw new Meteor.Error(
        "500",
        "Ocurrió un error al obtener los permisos del perfil"
      );
    }

    return responseMessage;
  }
});

new ValidatedMethod({
  name: "listOtherForIdProfile",
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuardian.checkPermission],
  validate({ idProfile }) {
    try {
      check(idProfile, String);
    } catch (exception) {
      console.error("listOtherForIdProfile: ", exception);
      throw new Meteor.Error("403", "La información introducida no es válida");
    }
  },
  run({ idProfile }) {
    const responseMessage = new ResponseMessage();
    try {
      const profile = Profile.findOne(idProfile);
      const permissions = Meteor.roles
        .find({ _id: { $not: { $in: profile.permissions } } })
        .fetch();
      responseMessage.create(
        "Permisos no asociados al perfil",
        null,
        permissions
      );
    } catch (exception) {
      console.log("listOtherForIdProfile: ", exception);
      throw new Meteor.Error(
        "500",
        "Ocurrió un error al obtener los permisos no asociados al perfil"
      );
    }

    return responseMessage;
  }
});

new ValidatedMethod({
  name: "checkPermission",
  mixins: [MethodHooks],
  beforeHooks: [AuthGuardian.isUserLogged],
  validate({ permission }) {
    try {
      check(permission, String);
    } catch (exception) {
      console.error("checkPermission", exception);
      throw new Meteor.Error("403", "La información introducida no es válida");
    }
  },
  run({ permission }) {
    const responseMessage = new ResponseMessage();
    try {
      // Accedemos a la posición 0, ya que los usuarios solo tienen un scope (osea un perfil de usuario)
      const scope = Roles.getScopesForUser(this.userId)[0];
      // El permission es aquel que queremos verificar si tiene el usuario dentro de su scope
      const hasPermission = Roles.userIsInRole(this.userId, permission, scope);
      // Roles.userIsInRole regresa un valor boolean, true si tiene el permiso y viceversa
      responseMessage.create(
        `El usuario ${hasPermission ? "Si" : "No"} tiene el permiso`,
        null,
        { hasPermission }
      );
    } catch (exception) {
      console.log("checkPermission", exception);
      throw new Meteor.Error("500", "Ocurrió un error al verificar el permiso");
    }

    return responseMessage;
  }
});
