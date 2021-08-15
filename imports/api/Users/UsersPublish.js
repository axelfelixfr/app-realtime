import { Meteor } from "meteor/meteor";
import { PublishEndpoint } from "meteor/peerlibrary:middleware";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";
import Permissions from "../../startup/server/helpers/Permissions";

// Con PublishEndpoint puedes asignarle middlewares a la publicación, con Meteor.publish no
const usersPublication = new PublishEndpoint("listUser", function () {
  // Retornamos los users encontramos
  return Meteor.users.find();
  // return Meteor.users.find(
  // {},
  // {
  //   sort: { createdAt: -1 },
  //   limit: 2
  // }
  // );
  // En sort: 1 es igual a "ascendente", -1 es igual a "descendente"
});

// Usamos el middleware de permisos PermissionMiddleware, para poder acceder a listar los usuarios
usersPublication.use(new PermissionMiddleware([Permissions.USERS.LIST.VALUE]));
