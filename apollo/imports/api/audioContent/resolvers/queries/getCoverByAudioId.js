import AudioCoverImage from '../../collections/audioCoverImage'

export default {
     Query : {
        audioCoverImage(obj, { audioId }, { user } ) {
            return AudioCoverImage.findOne({
                audioId: audioId
            });
         }
     }
};