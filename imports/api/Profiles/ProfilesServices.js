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
  // Método para obtener los usuarios con un perfil específico a través de su id
  getUsersByProfile(idProfile) {
    // Primero se busca el nombre del perfil a través de su id
    const { name } = Profile.findOne(idProfile);
    // Ahora retornamos a los usuarios que tenga ese nombre de perfil en profile.profile
    return Meteor.users.find({ "profile.profile": name }).fetch();
  },
  // Método para cambiar los roles de los usuarios
  setUserRoles(idUser, profileName) {
    // Se obtienen los permisos de los profiles a través de su name, y accediendo a permissions (con .permissions)
    const permissions = Profile.findOne({ name: profileName }).permissions;
    // Removemos los roles asignados a los usuarios con "user.id"
    Meteor.roleAssignment.remove({ "user._id": idUser });
    // Cambiamos los roles de los usuarios, con setUserRoles, pasandole el profileName y los permisos
    Roles.setUserRoles(idUser, permissions, profileName);
  },
  // Método para actualizar los perfiles de los usuarios
  updateProfileUsers(users, profileName) {
    // Accedemos a los users
    users.forEach(user => {
      // Con un forEach cambiamos dichos roles con el método setUserRoles() de arriba
      this.setUserRoles(user._id, profileName);
    });
  },
  // Obtenemos los profiles static
  getStaticProfilesName() {
    // Retornamos el nombre de los perfiles estaticos con la función map
    return Object.keys(StaticProfiles).map(staticProfileName => {
      return StaticProfiles[staticProfileName].name;
    });
  }
};
