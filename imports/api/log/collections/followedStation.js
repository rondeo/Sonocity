import { Mongo } from "meteor/mongo";

const FollowedStation = new Mongo.Collection("followedStation");

export default FollowedStation;