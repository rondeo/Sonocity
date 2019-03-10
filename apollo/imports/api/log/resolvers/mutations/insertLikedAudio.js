import LikedAudio from '../../collections/likedAudio'

export default {
    
    Mutation: {
        insertLikedAudio(obj, { audioId }, { user }) {
            const userId=user._id;
            if(userId) {
                const laId = LikedAudio.insert({
                    userId: userId,
                    audioId: audioId,                     
                });
                return LikedAudio.findOne(laId);
            }
            throw new Error('Unauthorized');
        }
    }

}