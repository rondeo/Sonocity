import { Mongo } from "meteor/mongo";

const ContextListeners = new Mongo.Collection("contextListeners");

Meteor.startup(() => {ContextListeners._ensureIndex({ ressourceId: 1 });});

export default ContextListeners;