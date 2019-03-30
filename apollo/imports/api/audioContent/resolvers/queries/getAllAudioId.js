import AudioData from '../../collections/audioData'

export default {
     Query : {
          allAudioId(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
               return AudioData.find({}).fetch();
            }
            throw new Error('Unauthorized');
          }
     }
};