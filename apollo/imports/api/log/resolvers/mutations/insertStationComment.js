import StationComment from '../../collections/stationComment'

export default {
    
    Mutation: {
        sendComment(obj, { stationId, content }, { user }) {
            const userId=user._id;
            const timeStamp = Date.now();
            if(userId) {
                StationComment.insert({
                    userId: userId,
                    stationId: stationId,  
                    content: content,       
                    timeStamp: timeStamp  
                });
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}