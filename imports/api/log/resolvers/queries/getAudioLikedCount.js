import LikedAudio from '../../collections/likedAudio'

export default {
    Query : {
        audioLikedCount(obj, { audioId }, {user} ){
            const userId=user._id;
            if(userId) {
                return LikedAudio.find({audioId}).count();
            }
            throw new Error('Unauthorized');
        }
    }
};