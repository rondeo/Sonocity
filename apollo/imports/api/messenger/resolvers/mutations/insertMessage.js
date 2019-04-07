import Messages from '../../collections/messages'

export default {
    
    Mutation: {
        newMessage(obj, { chatroomId }, { user }) {
            const userId=user._id;
            const timeStamp = Date.now();
            if(userId) {
                Messages.insert({
                        chatroomId: chatroomId,
                        senderId: userId,
                        seen: false,
                        timeStamp: timeStamp                    
                    });
                return true;
            }
            throw new Error('Unauthorized');
        }
    }

}