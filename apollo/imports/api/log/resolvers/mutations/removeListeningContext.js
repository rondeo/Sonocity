import ContextListeners from '../../collections/contextListeners'

export default {
    
    Mutation: {
        removeListeningContext(obj, args, { user }) {
            const userId=user._id;
            if(userId) {
                    const result = ContextListeners.remove({
                    userId: userId,
                });
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}