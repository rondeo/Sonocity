import LikedAudio from '../../collections/likedAudio'

export default {
    
    Mutation: {
        insertLikedAudio(obj, { audioId }, { user }) {
            const userId=user._id;
            const timeStamp = Date.now();
            if(userId) {
                const laId = LikedAudio.insert({
                    userId: userId,
                    audioId: audioId,           
                    timeStamp: timeStamp
                });
                return LikedAudio.findOne(laId);
            }
            throw new Error('Unauthorized');
        }
    }

}