import LocationHistory from '../../collections/locationHistory'
import Station from '../../../station/collections/station'

export default {
    
    Mutation: {
        insertLocHistoryAndUpdatePosition(obj, { timeStamp, latitude , longitude }, { user }) {
            const userId=user._id;
            if(userId) {

                LocationHistory.insert({
                    userId: userId,
                    latitude: latitude,
                    longitude: longitude,
                    timeStamp: timeStamp                      
                });

                Station.update(
                    { userId: userId },
                    { $set:
                        {
                            lastKnownLat: latitude,
                            lastKnownLon: longitude
                        }
                     }
                );

                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}
