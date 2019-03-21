import Station from '../../collections/station'

export default {
     Query : {
          station(obj, {_id}, {user} ){
               const userId=user._id;
               if(userId) {
                    return Station.findOne({_id: _id});
               }
            throw new Error('Unauthorized');
          }
     }
};