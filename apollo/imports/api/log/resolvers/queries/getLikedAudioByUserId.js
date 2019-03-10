import LikedAudio from '../../collections/likedAudio'

export default {
    Query : {
        userLikedAudio(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
                return LikedAudio.find({userId}).fetch();
            }
            throw new Error('Unauthorized');
        }
    }
};