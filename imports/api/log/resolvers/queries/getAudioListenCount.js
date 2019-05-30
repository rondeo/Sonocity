import ListeningHistory from '../../collections/listeningHistory'

export default {
    Query : {
        audioListenCount(obj, { audioId }, {user} ){
            const userId=user._id;
            if(userId) {
                return ListeningHistory.find({audioId}).count();
            }
            throw new Error('Unauthorized');
        }
    }
};