import FollowedStation from '../../collections/followedStation'

export default {
    
    Mutation: {
        removeFollowedStation(obj, { stationId }, { user }) {
            const userId=user._id;
            if(userId) {
                const result = FollowedStation.remove({
                    userId: userId,
                    stationId: stationId,                     
                });
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}