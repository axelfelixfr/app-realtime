import { Mongo } from "meteor/mongo";

// Se crea la collección Profile de Mongo
export const Profile = new Mongo.Collection("profiles");
