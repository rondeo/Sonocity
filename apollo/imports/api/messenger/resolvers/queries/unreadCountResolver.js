// import Messages from '../../collections/messages'

// export default {
//     Chatroom : {
//         unreadCount(obj, { chatroomId }, {user} ){
//             const userId=user._id;
//             if(userId) {
//                 return Messages.find({chatroomId: chatroomId, seen:false, senderId: {$ne: userId}}).count();
//             }
//             throw new Error('Unauthorized');
//         }
//     }
// };


// return Messages.find({chatroomId: chatroomId, seen:false, senderId: {$ne: userId}}).count();
