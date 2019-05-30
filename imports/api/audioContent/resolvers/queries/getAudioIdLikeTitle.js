import AudioData from '../../collections/audioData'

export default {
     Query : {
          audioLikeTitle(obj, { expression }, {user} ){
            const userId=user._id;
            if(userId) {
               return result = AudioData.find(
                { 
                    title: { $regex: new RegExp(".*"+expression+".*", "i") }
                },
                {
                    sort: {title:1},
                    limit: 200
                } 
                
               ).fetch();
            }
            throw new Error('Unauthorized');
          }
     }
};