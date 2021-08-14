import { Profile } from "../Profiles/Profile";
import Permissions, {
  permissionsArray
} from "../../startup/server/helpers/Permissions";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

// Se crea un índice de la propiedad 'name'
Profile.rawCollection().createIndex({ name: 1 }, { unique: true });

// Creamos el perfil admin que sera el único perfil estático
export const StaticProfiles = {
  admin: {
    name: "admin",
    description: "Administrador",
    permissions: permissionsArray.map(p => p.VALUE)
  }
  // Con la función map() podemos iterar la propiedad VALUE de cada uno de los permisos
  // Se agregaran todos los permison al ser un perfil de administrador
};

// Si esta en ambiente de desarrollo entra a esta condición
if (Meteor.isDevelopment) {
  // Si existen configuraciones en 'private' y si esta en 'true' la propiedad 'REFRESH_STATIC_PROFILES' entra a la condición
  if (
    Meteor.settings.private &&
    Meteor.settings.private.REFRESH_STATIC_PROFILES
  ) {
    // Se realiza el console.log que se esta subiendo los perfiles estáticos
    console.log("Updating static profiles. . .");

    // El método Object.keys() devuelve un array de las propiedades names (como 'name', 'description' y 'permissions') de un objeto, en el mismo orden como se obtienen en un loop normal
    // Iteramos cada con un forEach
    Object.keys(StaticProfiles).forEach(staticProfileName => {
      // Accedemos a la collección Profile
      // Upsert es igual a un insert (si NO existe) y un update
      // Insert a New Document if No Match Exists (Upsert)
      // Con "name: StaticProfiles[staticProfileName].name" == "name: 'admin'"
      Profile.upsert(
        { name: StaticProfiles[staticProfileName].name },
        {
          // se inserta la description y los permissions accediendo al objeto
          $set: {
            description: StaticProfiles[staticProfileName].description,
            permissions: StaticProfiles[staticProfileName].permissions
          }
        }
      );

      Meteor.users
        .find({ "profile.profile": StaticProfiles[staticProfileName].name })
        .fetch()
        .forEach(user => {
          Meteor.roleAssignment.remove({ "user._id": user._id });
          if (StaticProfiles[staticProfileName].permissions.length) {
            Roles.setUserRoles(
              user._id,
              StaticProfiles[staticProfileName].permissions,
              StaticProfiles[staticProfileName].name
            );
          }
        });
    });
  }
}
