import Station from '../../collections/station'

export default {
     Query : {
          onlineStations(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
                return Station.find({ 
                        userId: { $ne: userId },
                        status: true 
                }).fetch();    
            }
            throw new Error('Unauthorized');
        }
    }
}