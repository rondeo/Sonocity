import Station from '../../collections/station'

export default {
     Query : {
          stationInProximity(obj, { latMinRange, latMaxRange, longMinRange, longMaxRange }, {user} ){
            const userId=user._id;
            if(userId) {
                return Station.find({ 
                        userId: { $ne: userId },
                        status: true,
                        lastKnownLat: { $gt: latMinRange, $lt: latMaxRange },
                        lastKnownLon: { $gt: longMinRange, $lt: longMaxRange }
                }).fetch();    
            }
            throw new Error('Unauthorized');
        }
    }
}