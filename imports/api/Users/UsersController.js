import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check, Match } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
import { ResponseMessage } from "../../startup/server/utilities/ResponseMessage";
import UsersServices from "./UsersServices";

new ValidatedMethod({
  name: "saveUser",
  // Primero validamos el user que llego
  validate(user) {
    try {
      // Con check validamos los datos del user
      check(user, {
        // El _id puese ser un string (se trata de actualizar registro, UPDATE) o null (se trata de un nuevo registro, INSERT)
        _id: Match.OneOf(String, null),
        username: String,
        emails: [{ address: String, verified: Boolean }],
        profile: {
          profile: String,
          name: String,
          path: Match.OneOf(String, null)
        }
      });
    } catch (exception) {
      console.error("saveUser: ", exception);
      throw new Meteor.Error("403", "Los datos son incorrectos");
    }
    // Validamos el correo y el username
    UsersServices.validateEmail(user.emails[0].address, user._id);
    UsersServices.validateUsername(user.username, user._id);
  },
  // Después realizamos el proceso de base de datos
  // Desestructuramos user, ya que user = { _id, username, emails, profile }
  run({ _id, username, emails, profile }) {
    console.log("user: ", { username, emails, profile });
    const responseMessage = new ResponseMessage(); // Inicializamos la clase ReponseMessage

    // Si el _id es diferente a null, significa que se trata de una consulta UPDATE
    if (_id !== null) {
      // Realizamos un try/catch para cachar los errores
      try {
        UsersServices.updateUser(_id, username, emails, profile);

        // Creamos el mensaje al finalizar el proceso
        responseMessage.create("Se ha actualizado el usuario correctamente");
      } catch (exception) {
        console.error("saveUser: ", exception);
        throw new Meteor.Error(
          "500",
          "Ocurrió un error al actualizar el usuario"
        );
      }

      // Al no entrar a la primera condición, entonces se trata de un nuevo registro, INSERT
    } else {
      try {
        UsersServices.createUser(username, emails, profile);

        // Creamos el mensaje al finalizar el proceso
        responseMessage.create("Se ha creado el usuario correctamente");
      } catch (exception) {
        console.error("saveUser: ", exception);
        throw new Meteor.Error("500", "Ocurrió un error al crear el usuario");
      }
    }

    // Retornamos el mensaje por último
    return responseMessage;
  }
});

new ValidatedMethod({
  name: "deleteUser",
  validate({ idUser }) {
    try {
      check(idUser, String);
    } catch (exception) {
      console.error("deleteUser: ", exception);
      throw new Meteor.Error("403", "La información introducida es incorrecta");
    }
  },
  run({ idUser }) {
    const responseMessage = new ResponseMessage(); // Inicializamos la clase ReponseMessage
    try {
      Meteor.users.remove(idUser);
      // Creamos el mensaje al finalizar el proceso
      responseMessage.create("Se ha eliminado el usuario correctamente");
    } catch (exception) {
      console.error("deleteUser: ", exception);
      throw new Meteor.Error("500", "Ocurrió un error al eliminar el usuario");
    }

    // Retornamos el mensaje por último
    return responseMessage;
  }
});
