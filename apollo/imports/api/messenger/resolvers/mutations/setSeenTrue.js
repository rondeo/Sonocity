import Messages from '../../collections/messages'

export default {
    
    Mutation: {
        seen(obj, { chatroomId }, { user }) {
            const userId=user._id;
            if(userId) {
                Messages.update(
                    { senderId: {$ne: userId}, chatroomId: chatroomId, seen: false },
                    { $set:
                        {
                          seen: true
                        }
                     }
                );
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}