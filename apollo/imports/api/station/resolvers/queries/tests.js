import Station from '../../collections/station'

export default {
     Query : {
          allStation(obj, arg, {user} ){
               const userId=user._id;
               if(userId) {
                    return Station.find({}).fetch();
               }
            throw new Error('Unauthorized');
          }
     }
};