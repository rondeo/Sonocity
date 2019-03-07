import AudioFile from '../../collections/audioFile'

export default {
     Query : {
        audioFile(obj, { audioId }, { user } ) {
               return AudioFile.find({
                   audioId: audioId
                }).fetch();
         }
     }
};