import Station from '../../../station/collections/station'
import FollowedStation from '../../collections/followedStation'

export default {
     Query : {
        userOnlineFollowedStation(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {

                async function getFollowedStations() {
                    try{
                        const followedStations = FollowedStation.find({
                            userId:  userId
                        }).fetch();    
                        return followedStations;
                    } catch (e) {
                        console.log(e)
                    } 
                } 

                async function runQuery() {
                    try{
                        const followedStations = await getFollowedStations();  
                        
                        const followedStationsId = [];
                        await followedStations.forEach(element => {
                            followedStationsId.push(element.stationId);
                        });

                        if(followedStationsId.length > 0) {
                            return Station.find({ 
                                _id: { $in : followedStationsId },
                                status: true
                            }).fetch();  
                        } else {
                            return null;
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                
                return runQuery();

            }
            throw new Error('Unauthorized');
        }
    }
}