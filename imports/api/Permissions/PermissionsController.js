import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ResponseMessage } from "./../../startup/server/utilities/ResponseMessage";
import { Meteor } from "meteor/meteor";
import Permissions from "../../startup/server/helpers/Permissions";
import AuthGuardian from "../../middlewares/AuthGuardian";

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
      console.log("listPermissions: ", exception);
      throw new Meteor.Error("500", "Ocurrió un error al obtener los permisos");
    }

    return responseMessage;
  }
});
