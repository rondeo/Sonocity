import { Mongo } from "meteor/mongo";

const UserSettings = new Mongo.Collection("userSettings");

export default UserSettings;