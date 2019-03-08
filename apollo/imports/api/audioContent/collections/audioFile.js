import { Mongo } from "meteor/mongo";

// const AudioFile = new Mongo.Collection("audioFile");

import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

    const AudioFile = new FilesCollection({
        collection: new Mongo.Collection("audioFile"),
        collectionName: 'AudioFile',
    });


    if (Meteor.isServer) {
        AudioFile.allowClient();
    }
      
      // Example: Subscribe:
    if (Meteor.isClient) {
        Meteor.subscribe('files.audioFile.all');
    }
      
      // Example: Publish:
    if (Meteor.isServer) {
        Meteor.publish('files.audioFile.all', function () {
            return AudioFile.find().cursor;
        });
    }