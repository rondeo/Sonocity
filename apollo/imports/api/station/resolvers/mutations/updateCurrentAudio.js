import Station from '../../collections/station'

export default {
    
    Mutation: {
        updateCurrentAudio(obj, { timeStamp }, { user }) {
            const userId=user._id;
            if(userId) {
                const userStation = Station.findOne({userId: userId});
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
            throw new Error('Unauthorized');
        }
    }
}