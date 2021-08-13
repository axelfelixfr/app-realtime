import { Meteor } from "meteor/meteor";
import { PublishEndpoint } from "meteor/peerlibrary:middleware";

// Con PublishEndpoint puedes asignarle middlewares a la publicación, con Meteor.publish no
new PublishEndpoint("listUser", function () {
  return Meteor.users.find(
    {},
    {
      sort: { createdAt: -1 },
      limit: 2
    }
    // En sort: 1 es igual a "ascendente", -1 es igual a "descendente"
  );
});
