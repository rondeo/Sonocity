export default {
    Query : {
        userOnline(obj, { userId }, {user} ){
            const userI=user._id;
            if(userI) {
                const result = Meteor.users.findOne({_id: userId, "status.online": true})
                if(result) { return true } else { return false } 
            }
            throw new Error('Unauthorized');
        }
    }
};