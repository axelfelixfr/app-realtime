import { Roles } from "meteor/alanning:roles";
import { Meteor } from "meteor/meteor";

// Se crean todos los permisos existentes
const Permissions = {
  USERS: {
    LIST: { VALUE: "users-view", TEXT: "Listar usuarios" },
    CREATE: { VALUE: "users-create", TEXT: "Crear usuario" },
    UPDATE: { VALUE: "users-edit", TEXT: "Actualizar usuario" },
    DELETE: { VALUE: "users-delete", TEXT: "Eliminar usuario" }
  },
  PROFILES: {
    LIST: { VALUE: "profiles-view", TEXT: "Listar perfiles" },
    CREATE: { VALUE: "profiles-create", TEXT: "Crear perfil" },
    UPDATE: { VALUE: "profiles-edit", TEXT: "Actualizar perfil" },
    DELETE: { VALUE: "profiles-delete", TEXT: "Eliminar perfil" }
  }
};

// Se hace un array de los permisos
// El método Object.keys() devuelve un array de las propiedades names (como 'name', 'description' y 'permissions') de un objeto, en el mismo orden como se obtienen en un loop normal
export const permissionsArray = Object.keys(Permissions).reduce(
  // El método reduce() ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor
  (accumulator, systemModuleName) => {
    // Inicializamos un array con Permissions[systemModuleName]
    const systemModuleObject = Permissions[systemModuleName];

    // El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos
    const modulePermissions = Object.keys(systemModuleObject).map(
      permission => systemModuleObject[permission]
    ); // Al array le pasamos cada uno de los permisos iterados con map

    // El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array
    // Concatenamos el accumulator con el modulePermissions
    return accumulator.concat(modulePermissions); // Al acumulator se le agregara cada uno de los permisos que se vayan agregando al modulePermissions
  },
  [] // Inicializamos el accumulator en un arreglo vacio []
);

// Si esta en ambiente de desarrollo entra a esta condición
if (Meteor.isDevelopment) {
  // Si existen configuraciones en 'private' y si esta en 'true' la propiedad 'REFRESH_PERMISSIONS' entra la condición
  if (Meteor.settings.private && Meteor.settings.private.REFRESH_PERMISSIONS) {
    // Se envía el console.log indicando que se actualizaran los permisos
    console.log("Updating permissions. . .");

    // Accedemos a Roles del paquete "alanning:roles", y obtenemos todos los roles
    const currentRoles = Roles.getAllRoles().fetch();

    // Iteramos cada uno de los permisos de permissionsArray
    for (let permission of permissionsArray) {
      // Si dentro de currentRoles no esta alguno de los permisos (de la propiedad permission.VALUE)
      // Entonces al no existir en los Roles, se debe crear dicho Rol
      if (!currentRoles.find(_role => _role._id === permission.VALUE)) {
        // Se crea el rol que aun no esta disponible en Roles
        Roles.createRole(permission.VALUE);
      }

      // Ahora accedemos a cada uno de los permisos, a la propiedad VALUE
      Meteor.roles.update(permission.VALUE, {
        // Y le insertamos a cada permiso (con $set), la propiedad 'publicName' que es el permission.TEXT
        $set: {
          publicName: permission.TEXT
        }
      });
    }
  }
}

// Exportamos por default los permisos
export default Permissions;
