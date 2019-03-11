import Station from '../../collections/station'

export default {
     Query : {
          allStation(obj, arg, {user} ){
            if(userId) {
                return Station.find({userId}).fetch();
            }
            throw new Error('Unauthorized');
          }
     }
};