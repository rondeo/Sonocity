import AudioData from '../../collections/audioData'

export default {
     Query : {
          allAudioId(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
               const result = AudioData.find({},{
                    sort: {timeStamp:-1},
                    limit: 200
                } ).fetch();
               //  console.log(result)
                return result;
            }
            throw new Error('Unauthorized');
          }
     }
};