import { PublishEndpoint } from "meteor/peerlibrary:middleware";
import { Profile } from "./Profile";
import ProfilesServices from "./ProfilesServices";

// Nuevo endpoint para listar los perfiles
new PublishEndpoint("listProfile", function () {
  // Se retornan los profiles excepto los perfiles estáticos con "$nin" se logra excluir dichos perfiles
  return Profile.find({
    name: { $nin: ProfilesServices.getStaticProfilesName() }
  });
});
