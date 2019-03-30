import { Mongo } from "meteor/mongo";

const LocationHistory = new Mongo.Collection("locationHistory");

export default LocationHistory;