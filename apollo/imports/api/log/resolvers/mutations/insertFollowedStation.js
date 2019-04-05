import FollowedStation from '../../collections/followedStation'
import Station from '../../../station/collections/station'
import Chatroom from '../../../messenger/collections/chatroom'

export default {
    
    Mutation: {
        insertFollowedStation(obj, { stationId }, { user }) {
            const userId=user._id;
            if(userId) {
                const fsId = FollowedStation.insert({
                    userId: userId,
                    stationId: stationId,                     
                });

                const stationData = Station.findOne({_id: stationId});  
                
                Meteor.users.update(
                    { _id:userId },
                    { $push: 
                        { 
                            follows:  stationData.userId
                        }
                    }
                );

                Meteor.users.update(
                    { _id:stationData.userId },
                    { $push: 
                        { 
                            followed:  userId
                        }
                    }
                );

                if(Meteor.users.findOne({
                    _id: userId,
                    followed: stationData.userId})) {

                    Chatroom.insert({
                        userId0: userId,
                        userId1: stationData.userId
                    })

                }

                return FollowedStation.findOne(fsId);
            }
            throw new Error('Unauthorized');
        }
    }

}