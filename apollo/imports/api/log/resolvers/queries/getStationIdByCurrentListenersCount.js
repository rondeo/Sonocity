import ContextListeners from '../../collections/contextListeners'

export default {
    Query : {
        popStations(obj, { ressourceId }, {user}){
            const userId=user._id; 
            if(userId) {
                const result = ContextListeners.aggregate([{$match: { ressourceId: { $ne: "playlist"}}},
                    {"$group": {_id: "$ressourceId", count:{$sum:1}}},
                    {$sort:{"count":-1}}, { $limit : 100 }]);
                return result;
            }
            throw new Error('Unauthorized');
        }
    }
};

