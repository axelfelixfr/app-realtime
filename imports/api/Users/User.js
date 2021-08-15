// Creamos un index para la propiedad "profile" del objeto "profile"
Meteor.users.rawCollection().createIndex({ "profile.profile": 1 });
