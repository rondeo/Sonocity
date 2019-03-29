import FollowedStation from '../../collections/followedStation'

export default {
    Query : {
        isStationFollowed(obj, { stationId }, {user} ){
            const userId=user._id;
            if(userId) {
                rep = FollowedStation.findOne({
                    userId: userId,    
                    stationId: stationId    
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