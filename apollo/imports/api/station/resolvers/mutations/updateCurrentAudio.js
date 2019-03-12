import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateCurrentAudio(obj, { timeStamp }, { user }) {
            const userId=user._id;
            if(userId) {

                async function getUserStation() {
                    const userStation = Station.findOne({userId: userId});
                    return userStation;
                }

                async function runMutation() {
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
                }
                
                runMutation();

            }
            throw new Error('Unauthorized');
        }
    }
}