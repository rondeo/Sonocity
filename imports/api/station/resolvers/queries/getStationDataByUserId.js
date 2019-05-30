import Station from '../../collections/station'

export default {
     Query : {
          userStation(obj, arg, {user} ){
               const userId=user._id;
               if(userId) {
                    return Station.findOne({userId: userId});
               }
            throw new Error('Unauthorized');
          }
     }
};