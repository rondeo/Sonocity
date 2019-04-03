import AudioData from '../../collections/audioData'

export default {
     Query : {
          userAudioId(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
               return AudioData.find({userId:userId},{sort: { timeStamp:-1}}).fetch();
            }
            throw new Error('Unauthorized');
          }
     }
};