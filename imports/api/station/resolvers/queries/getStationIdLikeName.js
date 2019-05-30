import Station from '../../collections/station'

export default {
     Query : {
          stationLikeName(obj, { expression }, {user} ){
            const userId=user._id;
            if(userId) {
                return result = Station.find(
                    { 
                        userId: { $ne: userId },
                        status: true,
                        name: { $regex: new RegExp(".*"+expression+".*", "i") }
                    },
                    {
                        sort: {name:1},
                        limit: 200
                    }                    
                ).fetch();   
            }
            throw new Error('Unauthorized');
        }
    }
}