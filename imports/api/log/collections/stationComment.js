import { Mongo } from "meteor/mongo";

const StationComment = new Mongo.Collection("stationComment");

Meteor.startup( () => { StationComment._ensureIndex({ stationId: 1 });});

export default StationComment;