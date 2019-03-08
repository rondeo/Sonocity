// import { Mongo } from "meteor/mongo";

// const AudioFile = new Mongo.Collection("audioFile");

import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const AudioFile = new FilesCollection({
    storagePath: "C:/Users/geoff/Desktop/iVMusic/ivMusic/apollo/data/uploads/audioFile",
    collectionName: 'AudioFile',
    // onAfterUpload(file) {
    // if (Meteor.isServer) {
    //   // check real mimetype
    //   const { Magic, MAGIC_MIME_TYPE } = require('mmmagic');
    //   const magic = new Magic(MAGIC_MIME_TYPE);
    //   magic.detectFile(file.path, Meteor.bindEnvironment((err, mimeType) => {
    //     if (err || !~mimeType.indexOf('AudioFile')) {
    //       // is not a real image --> delete
    //       console.log('onAfterUpload, not an audio file: ', file.path);
    //       console.log('deleted', file.path);
    //       this.remove(file._id);
    //     }
    //   }));
    // }
//   }
});

export default AudioFile;