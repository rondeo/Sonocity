import Chatroom from '../../collections/chatroom'

export default {
    Query : {
        chatRooms(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {
                return existingChatrooms = Chatroom.find({ $or : [ { userId0 : userId }, { userId1: userId } ] } ).fetch();
            }
            throw new Error('Unauthorized');
        }
    }
};