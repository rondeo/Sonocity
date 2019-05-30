import AudioData from '../../collections/audioData'

export default {
     Query : {
          audioLikeArtist(obj, { expression }, {user} ){
            const userId=user._id;
            if(userId) {
               return result = AudioData.find(
                { 
                    artist: { $regex: new RegExp(".*"+expression+".*", "i") }
                },
                {
                    sort: {artist:1, title:1},
                    limit: 200
                } 
                
               ).fetch();
            }
            
            throw new Error('Unauthorized');
          }
     }
};