import { Mongo } from "meteor/mongo";

const Station = new Mongo.Collection("station");

Meteor.startup(() => {Station._ensureIndex({ stationId: 1 });});

export default Station;