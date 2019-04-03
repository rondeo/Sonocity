import ContextListeners from '../../collections/contextListeners'

export default {
    
    Mutation: {
        userListeningContext(obj, { ressourceId }, { user }) {
            const userId=user._id;
            const timeStamp = Date.now();
            if(userId) {
                const result = ContextListeners.upsert(
                    { userId: userId },
                    { 
                        $set:
                        {
                            ressourceId: ressourceId,
                            timeStamp: timeStamp
                        },
                        $setOnInsert: 
                        {
                            userId: userId
                        },
                        
                    }    
                )     
                return ContextListeners.find({ressourceId}).count();

            }
            throw new Error('Unauthorized');
        }
    }

}

