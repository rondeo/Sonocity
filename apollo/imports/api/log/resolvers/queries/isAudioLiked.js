import LikedAudio from '../../collections/likedAudio'

export default {
    Query : {
        isAudioLiked(obj, { audioId }, {user} ){
            const userId=user._id;
            if(userId) {
                rep = LikedAudio.findOne({
                    userId: userId,    
                    audioId: audioId    
                });    
                if(rep) {
                    return true;
                } else {
                    return false;
                }
            }
            throw new Error('Unauthorized');
        }
    }
};