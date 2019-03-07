import AudioCoverImage from '../../collections/audioCoverImage'

export default {
     Query : {
        audioCoverImages(obj, arg, { user } ) {
             return AudioCoverImage.find({}).fetch();
         }
     }
};