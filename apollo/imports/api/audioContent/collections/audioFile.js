import { Mongo } from "meteor/mongo";

// const AudioFile = new Mongo.Collection("audioFile");

import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

    const AudioFile = new FilesCollection({
        storagePath: "/C:/Users/geoff/Desktop/iVMusic/ivMusic/apollo/data/uploads/audioFile",
        collectionName: 'AudioFile',
        allowClientCode: true,
        debug: true,
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

// export default AudioFile;