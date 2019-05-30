import { Mongo } from "meteor/mongo";

const Messages = new Mongo.Collection("messages");

Meteor.startup(() => {Messages._ensureIndex({ chatroomId: 1 });});

export default Messages;