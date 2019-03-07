import AudioData from '../../collections/audioData'

export default {
     Query : {
          allAudioId(obj, arg, {user} ){
               return AudioData.find({}).fetch();
          }
     }
};