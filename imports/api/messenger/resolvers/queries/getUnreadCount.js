import Messages from '../../collections/messages'

export default {
    Query : {
        ureadCount(obj, { chatroomId }, {user} ){
            const userId=user._id;
            if(userId) {
                return Messages.find({chatroomId: chatroomId, seen:false, senderId: {$ne: userId}}).count();
            }
            throw new Error('Unauthorized');
        }
    }
};