import LikedAudio from '../../collections/likedAudio'

export default {
    
    Mutation: {
        removeLikedAudio(obj, { audioId }, { user }) {
            const userId=user._id;
            if(userId) {
                    const result = LikedAudio.remove({
                    userId: userId,
                    audioId: audioId,                     
                });
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}