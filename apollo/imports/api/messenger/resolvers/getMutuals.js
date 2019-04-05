import FollowedStation from '../../log/collections/followedStation'
import Station from '../../station/collections/station'

export default {
    Query : {
        mutuals(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {

                const getUserStationId = async () => {
                    return await Station.findOne({userId:userId});
                }

                const getUserFollowedStation = async () => {
                    return await FollowedStation.find({userId:userId}).fetch();
                }

                const getFollowedStationUserId = async followedStationId => {
                    return await Station.find({
                        _id: { $in : followedStationsId }
                    }).fetch();
                }

                const getMutuals = async mutualsUserId => {
                    return FollowedStation.find({
                        userId: { $in : followedStationUserId},
                        stationId: userStationId
                    })
                }


            }
            throw new Error('Unauthorized');
        }
    }
};