import ContextListeners from '../../collections/contextListeners'
import Station from '../../../station/collections/station'

export default {
    Query : {
        popStations(obj, { ressourceId }, {user}){
            const userId=user._id; 
            if(userId) {
                const userStation = Station.findOne({userId: userId});
                const result = ContextListeners.aggregate([{$match: { ressourceId: { $nin: ["playlist", userStation._id]}}},
                    {"$group": {_id: "$ressourceId", count:{$sum:1}}},
                    {$sort:{"count":-1}}, { $limit : 100 }]);
                return result;
            }
            throw new Error('Unauthorized');
        }
    }
};

