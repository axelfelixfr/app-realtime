import { Accounts } from "meteor/accounts-base";
import ProfilesServices from "../Profiles/ProfilesServices";

export default {
  validateEmail(newEmail, idUser) {
    // Buscamos el correo que llego por los parámetros con findUserByEmail()
    const existsEmail = Accounts.findUserByEmail(newEmail);

    // Si el idUser existe, significa que se trata de una actualización, UPDATE
    if (idUser) {
      // Desestructuramos el user que se obtuvo con idUser
      const { emails: emailsDB } = Meteor.users.findOne(idUser);

      // Comparamos el correo de la base de datos (emailsDB) con el newEmail
      // Además de que comprobamos de que exista el correo
      if (emailsDB[0].address !== newEmail && existsEmail) {
        // Lanza el error
        throw new Meteor.Error("403", "El nuevo email ya existe");
      }

      // Si no entro a la primera condición, se trata se un nuevo registro, INSERT
    } else if (existsEmail) {
      // Lanza el error
      throw new Meteor.Error("403", "El email ya existe");
    }
  },
  validateUsername(newUsername, idUser) {
    // Buscamos el username que llego por los parámetros con findUserByUsername()
    const existsUsername = Accounts.findUserByUsername(newUsername);

    // Si el idUser existe, significa que se trata de una actualización, UPDATE
    if (idUser) {
      // Desestructuramos el user que se obtuvo con el metodo findOne
      const { username: usernameDB } = Meteor.users.findOne(idUser);

      // Comparamos el username de la base de datos (usernameDB) con el newUsername
      // Además de que comprobamos de que exista el username
      if (usernameDB !== newUsername && existsUsername) {
        // Lanza el error
        throw new Meteor.Error("403", "El nuevo nombre de usuario ya existe");
      }
      // Si no entro a la primera condición, se trata se un nuevo registro, INSERT
    } else if (existsUsername) {
      // Lanza el error
      throw new Meteor.Error("403", "El nombre de usuario ya existe");
    }
  },
  createUser(username, emails, profile) {
    // username, email y name (de profile) deben ser únicos, ya que de esta forma lo pide Accounts.createUser()
    const idUser = Accounts.createUser({
      username,
      email: emails[0].address,
      profile
    });
    // Al crear el usuario, actualizamos sus roles de acuerdo a su perfil
    if (idUser) {
      ProfilesServices.setUserRoles(idUser, profile.profile);
    }
  },
  updateUser(_id, username, emails, profile) {
    // Desestructuramos el objeto que nos trae users.findOne() que se obtiene de la base de datos de Mongo
    const {
      _id: idDB,
      username: usernameDB,
      emails: emailsDB
    } = Meteor.users.findOne(_id);
    // Con findOne() nos trae un objeto con el _id que le corresponde en la base de datos

    // Si el email (que se envio) es diferente al email de la base de datos, entra a la condición
    if (emailsDB[0].address !== emails[0].address) {
      // Removemos el email con removeEmail()
      Accounts.removeEmail(idDB, emailsDB[0].address);
      // Le pasamos el id de la base de datos y el correo que queremos remover

      // Agregamos el nuevo email
      Accounts.addEmail(idDB, emails[0].address);
      // Para ello pasamos el id de la base de datos y el nuevo correo que se envio
    }

    // Si el username (que se envio) es diferente al username de la base de datos, entra a la condición
    if (usernameDB !== username) {
      // Accedemos con el id de la base de datos y le pasamos el nuevo username
      Accounts.setUsername(idDB, username);
    }

    // Para cambiar los demás datos del user, usamos Meteor.users.update()
    Meteor.users.update(_id, {
      // Con "$set" insertamos los datos de profile a la base de datos
      $set: {
        profile: {
          profile: profile.profile,
          name: profile.name,
          path: profile.path
        }
      }
    });
    // Al crear el usuario, actualizamos sus roles de acuerdo a su perfil
    ProfilesServices.setUserRoles(_id, profile.profile);
  }
};
