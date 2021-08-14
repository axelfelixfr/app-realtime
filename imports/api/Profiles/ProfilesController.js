import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check, Match } from "meteor/check";
import { ResponseMessage } from "./../../startup/server/utilities/ResponseMessage";
import { Profile } from "./Profile";
import ProfilesServices from "./ProfilesServices";

new ValidatedMethod({
  name: "profileSave",
  validate(profile) {
    try {
      check(profile, {
        _id: Match.OneOf(String, null),
        name: String,
        description: String,
        permissions: [String]
      });
    } catch (exception) {
      console.log("profileSave: ", exception);
      throw new Meteor.Error("403", "Información introducida no es válida");
    }
    ProfilesServices.validateName(profile.name, profile._id);
  },
  run({ _id, name, description, permissions }) {
    const responseMessage = new ResponseMessage();

    if (_id !== null) {
      try {
        const { name: nameDB } = Profile.findOne(_id);
        const users = ProfilesServices.getUsersByProfile(_id);

        Profile.update(_id, {
          $set: {
            name,
            description,
            permissions
          }
        });

        if (nameDB !== name) {
          Meteor.users.update(
            { "profile.profile": nameDB },
            {
              $set: {
                "profile.profile": name
              }
            },
            { multi: true }
          );
        }
        ProfilesServices.updateProfileUsers(users, name);

        responseMessage.create("Se actualizo el perfil exitosamente");
      } catch (exception) {
        console.log("profileSave: ", exception);
        throw new Meteor.Error(
          "500",
          "Ocurrió un error al actualizar el perfil"
        );
      }
    } else {
      try {
        Profile.insert({
          name,
          description,
          permissions
        });
        responseMessage.create("Se creo el perfil exitosamente");
      } catch (exception) {
        console.log("profileSave: ", exception);
        throw new Meteor.Error("500", "Ocurrió un error al cargar el perfil");
      }
    }

    return responseMessage;
  }
});

new ValidatedMethod({
  name: "profileDelete",
  validate({ idProfile }) {
    try {
      check(idProfile, String);
    } catch (exception) {
      console.log("profileDelete: ", exception);
      throw new Meteor.Error("403", "La información introducida no es válida");
    }
  },
  run({ idProfile }) {
    const responseMessage = new ResponseMessage();

    try {
      Profile.remove(idProfile);
      responseMessage.create("Perfil eliminado exitosamente");
    } catch (exception) {
      console.log("profileDelete: ", exception);
      throw new Meteor.Error("403", "Ocurrió un error al eliminar el perfil");
    }

    return responseMessage;
  }
});
