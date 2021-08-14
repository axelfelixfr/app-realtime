import { PublishEndpoint } from "meteor/peerlibrary:middleware";
import { Profile } from "./Profile";
import ProfilesServices from "./ProfilesServices";

new PublishEndpoint("listProfile", function () {
  return Profile.find({
    name: { $nin: ProfilesServices.getStaticProfilesName() }
  });
});
