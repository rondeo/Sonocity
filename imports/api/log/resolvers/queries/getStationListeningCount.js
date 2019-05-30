import ContextListeners from '../../collections/contextListeners'

export default {
    Query : {
        stationListenCount(obj, { ressourceId }, {user}){
            const userId=user._id;
            if(userId) {
                return ContextListeners.find({ressourceId}).count();
            }
            throw new Error('Unauthorized');
        }
    }
};