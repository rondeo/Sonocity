import { Mongo } from "meteor/mongo";

const ListeningHistory = new Mongo.Collection("listeningHistory");

export default ListeningHistory;