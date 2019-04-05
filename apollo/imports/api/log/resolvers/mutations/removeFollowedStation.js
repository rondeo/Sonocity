import FollowedStation from '../../collections/followedStation'
import Station from '../../../station/collections/station'
import Chatroom from '../../../messenger/collections/chatroom'

export default {
    
    Mutation: {
        removeFollowedStation(obj, { stationId }, { user }) {
            const userId=user._id;
            if(userId) {
                const result = FollowedStation.remove({
                    userId: userId,
                    stationId: stationId,                     
                });

                const stationData = Station.findOne({_id: stationId});  
                
                Meteor.users.update(
                    { _id:userId },
                    { $pull: 
                        { 
                            follows:  stationData.userId,
                        }
                    }
                );

                Meteor.users.update(
                    { _id:stationData.userId },
                    { $pull: 
                        { 
                            followed:  userId
                        }
                    }
                );

                if(Meteor.users.findOne({followed: stationData.userId})) {

                    Chatroom.remove({ $or : [ { userId0 : userId }, { userId1: userId } ] })

                }

                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}