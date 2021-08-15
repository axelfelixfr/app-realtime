import { PublishEndpoint } from "meteor/peerlibrary:middleware";
import { PermissionMiddleware } from "../../middlewares/PermissionMiddleware";
import Permissions from "../../startup/server/helpers/Permissions";
import { Profile } from "./Profile";
import ProfilesServices from "./ProfilesServices";

// Nuevo endpoint para listar los perfiles
const profilesPublication = new PublishEndpoint("listProfile", function () {
  // Se retornan los profiles excepto los perfiles estáticos con "$nin" se logra excluir dichos perfiles
  return Profile.find({
    name: { $nin: ProfilesServices.getStaticProfilesName() }
  });
});

profilesPublication.use(
  new PermissionMiddleware([Permissions.PROFILES.LIST.VALUE])
);
