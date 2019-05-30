import { Mongo } from "meteor/mongo";

const LikedAudio = new Mongo.Collection("likedAudio");

export default LikedAudio;