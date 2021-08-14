import { Profile } from "./Profile";
import { StaticProfiles } from "./ProfileSeeder";

export default {
  validateName(nameProfile, idProfile) {
    // Buscamos el name que llego por los parámetros con findOne()
    const existsName = Profile.findOne({ nameProfile });

    // Si el idProfile existe, significa que se trata de una actualización, UPDATE
    if (idProfile) {
      // Desestructuramos el profile que se obtuvo con el metodo findOne
      const { name: nameDB } = Profile.findOne(idProfile);

      // Comparamos el name de la base de datos (nameDB) con el nameProfile
      // Además de que comprobamos de que exista el name
      if (nameDB !== nameProfile && existsName) {
        // Lanza el error
        throw new Meteor.Error("403", "El nuevo nombre de perfil ya existe");
      }
      // Si no entro a la primera condición, se trata se un nuevo registro, INSERT
    } else if (existsName) {
      // Lanza el error
      throw new Meteor.Error("403", "El nombre de perfil ya existe");
    }
  },
  getUsersByProfile(idProfile) {
    const { name } = Profile.findOne(idProfile);
    return Meteor.users.find({ "profile.profile": name }).fetch();
  },
  setUserRoles(idUser, profileName) {
    const permissions = Profile.findOne({ name: profileName }).permissions;
    Meteor.roleAssigment.remove({ "user._id": idUser });
    Roles.setUserRoles(idUser, permissions, profileName);
  },
  updateProfileUsers(users, profileName) {
    users.forEach(user => {
      this.setUserRoles(user._id, profileName);
    });
  },
  getStaticProfilesName() {
    return Object.keys(StaticProfiles).map(staticProfileName => {
      return StaticProfiles[staticProfileName].name;
    });
  }
};
