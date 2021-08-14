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
    // Se valida el name
    ProfilesServices.validateName(profile.name, profile._id);
  },
  run({ _id, name, description, permissions }) {
    const responseMessage = new ResponseMessage();

    // Si "_id" no es "null" significa que se trata de una actualización, UPDATE
    if (_id !== null) {
      try {
        // Buscamos el profile de la base de datos con findOne
        const { name: nameDB } = Profile.findOne(_id); // Extrae el nombre del perfil

        // Buscamos a los usuarios que tienen ese perfil para actualizarlo
        const users = ProfilesServices.getUsersByProfile(_id);

        // Se cambia/actualiza el perfil con el _id
        Profile.update(_id, {
          $set: {
            name,
            description,
            permissions
          }
        });

        // Si name es diferente al de la base de datos, significa que se actualizo igual
        if (nameDB !== name) {
          // Ahora se debe actualizar a los users con ese perfil
          // Se van al objeto profile y a la propiedad profile y despues modifican el name con $set
          Meteor.users.update(
            { "profile.profile": nameDB },
            {
              $set: {
                "profile.profile": name
              }
            },
            { multi: true }
          ); // Debe tener la propiedad "multi" en true para que modifique todos los users con ese profile
        }

        // Se actualizan los perfiles pasandole los users y el nuevo nombre del perfil
        ProfilesServices.updateProfileUsers(users, name);

        // Se crea el mensaje de éxito
        responseMessage.create("Se actualizo el perfil exitosamente");
      } catch (exception) {
        // Si ocurrio una exception, se crea el mensaje de error y el console.log
        console.log("profileSave: ", exception);
        throw new Meteor.Error(
          "500",
          "Ocurrió un error al actualizar el perfil"
        );
      }

      // Si no cumplio la condición, significa que se trata de un nuevo registro, INSERT
    } else {
      try {
        // Se inserta el perfil con el método insert() de Mongo
        Profile.insert({
          name,
          description,
          permissions
        });

        // Se crea el mensaje de éxito
        responseMessage.create("Se creo el perfil exitosamente");
      } catch (exception) {
        // Si ocurrio una exception, se crea el mensaje de error y el console.log
        console.log("profileSave: ", exception);
        throw new Meteor.Error("500", "Ocurrió un error al cargar el perfil");
      }
    }

    // Retorna el mensaje
    return responseMessage;
  }
});

new ValidatedMethod({
  name: "profileDelete",
  // Se valida que haya llegado el id del profile correctamente
  validate({ idProfile }) {
    try {
      check(idProfile, String);
    } catch (exception) {
      console.log("profileDelete: ", exception);
      throw new Meteor.Error("403", "La información introducida no es válida");
    }
  },
  // Se corre el método de eliminación
  run({ idProfile }) {
    // Se crea una instancia del mensaje
    const responseMessage = new ResponseMessage();

    try {
      // Se remueve el profile con el método remove() de Mongo
      Profile.remove(idProfile);

      // Se crea el mensaje de éxito
      responseMessage.create("Perfil eliminado exitosamente");
    } catch (exception) {
      // Si ocurrio una exception, se crea el mensaje de error y el console.log
      console.log("profileDelete: ", exception);
      throw new Meteor.Error("403", "Ocurrió un error al eliminar el perfil");
    }

    // Retorna el mensaje
    return responseMessage;
  }
});
