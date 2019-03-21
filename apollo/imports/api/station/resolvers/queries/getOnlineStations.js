import Station from '../../collections/station'

export default {
     Query : {
          onlineStations(obj, arg, {user} ){
            const userId=user._id;
            if(userId) {

                async function getOnlineUsers() {
                    try{
                        const onlineUsers = Meteor.users.find({ "status.online": true }).fetch();
                        return onlineUsers;
                    } catch (e) {
                        console.log(e)
                    } 
                } 

                async function runQuery() {
                    try{
                        const onlineUsers = await getOnlineUsers();  
                        
                        const onlineUsersId = [];
                        await onlineUsers.forEach(element => {
                            onlineUsersId.push(element._id);
                        });

                        if(onlineUsersId.length > 0) {
                            return Station.find({ 
                                    userId: { $in : [onlineUsersId] },
                                    status: true 
                                }).fetch();    
                        } else {
                            return null;
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                
                return runQuery();

            }
            throw new Error('Unauthorized');
        }
    }
}