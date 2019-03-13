import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateCurrentAudio(obj, { timeStamp }, { user }) {
            const userId=user._id;
            if(userId) {

                async function getUserStation() {
                    try{
                        const userStation = Station.findOne({userId: userId});
                        return userStation;
                    } catch (e) {
                        console.log(e)
                    } 
                }

                async function runMutation() {
                    try{
                        const userStation = await getUserStation();
                        if(userStation.upNext[0]) {
                            Station.update(
                                { userId: userId },
                                { $set:
                                    {
                                        currentAudio: userStation.upNext[0],
                                        timeStamp: timeStamp
                                    },
                                $pop: 
                                    { 
                                        upNext: -1 
                                    }   
                                }
                            );
                            return true;
                        } else {
                            Station.update(
                                { userId: userId },
                                { $set: 
                                    {
                                        status: false
                                    }
                                }
                            );
                            return false;
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                
                runMutation();

            }
            throw new Error('Unauthorized');
        }
    }
}