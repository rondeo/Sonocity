import FollowedStation from '../../collections/followedStation'

export default {
    Query : {
        followedStationCount(obj, { stationId }, {user} ){
            const userId=user._id;
            if(userId) {
                return FollowedStation.find({stationId}).count();
            }
            throw new Error('Unauthorized');
        }
    }
};