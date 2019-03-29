import FollowedStation from '../../collections/followedStation'

export default {
    
    Mutation: {
        insertFollowedStation(obj, { stationId }, { user }) {
            const userId=user._id;
            if(userId) {
                const fsId = FollowedStation.insert({
                    userId: userId,
                    stationId: stationId,                     
                });
                return FollowedStation.findOne(fsId);
            }
            throw new Error('Unauthorized');
        }
    }

}