import Station from '../../collections/station'

export default {
     Query : {
        userStationById(obj, {userId}, {user} ){
               const userI=user._id;
               if(userI) {
                    return Station.findOne({userId: userId});
               }
            throw new Error('Unauthorized');
          }
     }
};