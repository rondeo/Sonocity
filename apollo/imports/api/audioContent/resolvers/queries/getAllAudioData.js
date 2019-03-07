import AudioCoverImage from '../../collections/audioCoverImage'
import AudioData from '../../collections/audioData'
import AudioFile from '../../collections/audioFile'

export default {
     Query : {
          allAudioCover(obj, arg, { user } ) {
               return AudioCoverImage.find({}).fetch();
          },
          allAudioData(obj, arg, {user} ){
               return AudioData.find({}).fetch();
          }
     }
};