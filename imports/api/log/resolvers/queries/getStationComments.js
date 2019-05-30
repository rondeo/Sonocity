import StationComment from '../../collections/stationComment'
import Station from '../../../station/collections/station'

export default {
    Query : {
        async stationComment(obj, {}, {user} ){
            const userId=user._id;
            if(userId) {
                const result = await Station.findOne({userId:userId});
                return StationComment.find({stationId: result._id}, {sort: {timeStamp:-1}, limit: 50}).fetch();
            }
            throw new Error('Unauthorized');
        }
    }
};