import { PublishEndpoint } from "meteor/peerlibrary:middleware";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";
import Permissions from "../../startup/server/helpers/Permissions";
import { Profile } from "./Profile";
import ProfilesServices from "./ProfilesServices";

// Nuevo endpoint para listar los perfiles
const notStaticProfilesPublication = new PublishEndpoint(
  "listNotStacticProfiles",
  function () {
    // Se retornan los profiles excepto los perfiles estáticos con "$nin" se logra excluir dichos perfiles
    return Profile.find({
      name: { $nin: ProfilesServices.getStaticProfilesName() }
    });
  }
);

// Devolvera TODOS los perfiles que existan, incluyendo los estáticos
const profilesPublication = new PublishEndpoint("listAllProfiles", function () {
  return Profile.find();
});

// Usamos el middleware para los permisos PublishEndpoint y accedemos al valor de PROFILES.LIST para las publicaciones
notStaticProfilesPublication.use(
  new PermissionMiddleware([Permissions.PROFILES.LIST.VALUE])
);

profilesPublication.use(
  new PermissionMiddleware([Permissions.PROFILES.LIST.VALUE])
);
