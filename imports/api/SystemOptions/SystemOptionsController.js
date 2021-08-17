import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { ResponseMessage } from "../../startup/server/utilities/ResponseMessage";
import { Roles } from "meteor/alanning:roles";
import SystemOptions from "./SystemOptions";
import AuthGuardian from "../../middlewares/AuthGuardian";

new ValidatedMethod({
  name: "getSystemOptionsUser",
  mixins: [MethodHooks],
  beforeHooks: [AuthGuardian.isUserLogged],
  validate: null,
  run() {
    const responseMessages = new ResponseMessage();
    const userLogged = Meteor.user();
    const userRoles = Roles.getRolesForUser(
      userLogged._id,
      userLogged.profile.profile
    );
    const optionsForUser = SystemOptions.reduce((accumulator, systemOption) => {
      if (
        !systemOption.permission ||
        !!userRoles.find(role => role === systemOption.permission)
      ) {
        accumulator.push(systemOption);
      }
      return accumulator;
    }, []);
    responseMessages.create(
      "Opciones del usuario sobre el sistema",
      null,
      optionsForUser
    );
    return responseMessages;
  }
});
