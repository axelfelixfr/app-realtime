import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check, Match } from "meteor/check";

new ValidatedMethod({
  name: "saveUser",
  validate(user) {
    try {
      check(user, {
        _id: Match.OneOf(String, null),
        username: String,
        emails: [{ address: String, verified: Boolean }],
        profile: {
          profile: String,
          name: String,
          path: Match.OneOf(String, null)
        }
      });
    } catch (exception) {
      console.log("saveUser: ", exception);
      throw new Meteor.Error("403", "Los datos son incorrectos");
    }
  },
  run({ username, emails, profile }) {
    console.log("user: ", { username, emails, profile });
    let responseMessage = "";
    try {
      Accounts.createUser({
        username,
        email: emails[0].address,
        profile
      });
      responseMessage = "Se ha creado el usuario correctamente";
    } catch (exception) {
      console.log("saveUser: ", exception);
      throw new Meteor.Error("500", "Ocurrió un error al crear el usuario");
    }
    return responseMessage;
  }
});
