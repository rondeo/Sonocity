import Messages from '../../collections/messages'

export default {
    Query : {
        messages(obj, {chatroomId}, {user} ){
            const userId=user._id;
            if(userId) {
                return Messages.find({ chatroomId: chatroomId }).fetch();
            }
            throw new Error('Unauthorized');
        }
    }
};