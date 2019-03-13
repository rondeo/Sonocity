import ListeningHistory from '../../collections/listeningHistory'

export default {
    
    Mutation: {
        insertLhLog(obj, { audioId }, { user }) {
            const userId=user._id;
            const timeStamp = Date.now();
            if(userId) {
                    const lhLogId = ListeningHistory.insert({
                        userId: userId,
                        audioId: audioId,
                        timeStamp: timeStamp                      
                    });
                return ListeningHistory.findOne(lhLogId);
            }
            throw new Error('Unauthorized');
        }
    }

}
