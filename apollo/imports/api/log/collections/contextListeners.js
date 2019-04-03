import { Mongo } from "meteor/mongo";

const ContextListeners = new Mongo.Collection("contextListeners");

export default ContextListeners;