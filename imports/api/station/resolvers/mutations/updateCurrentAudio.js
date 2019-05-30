import Station from '../../collections/station'
import AudioData from '../../../audioContent/collections/audioData'

export default {
    
    Mutation: {
        updateCurrentAudio(obj, arg, { user }) {
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

                async function getAudioData(audioId) {
                    try{
                        const audioData = AudioData.findOne({_id: audioId});
                        return audioData;
                    } catch (e) {
                        console.log(e)
                    } 
                }    

                async function runMutation() {
                  
                        const userStation = await getUserStation();
                        const timeStamp = Date.now();
                        let upNextO = null;
                        try {
                            upNextO = userStation.upNext[0]
                        } catch (error) {
                            
                        }
                        if(upNextO) {
                            Station.update(
                                { userId: userId },
                                { $set:
                                    {
                                        currentAudio: upNextO,
                                        timeStamp: timeStamp,
                                        status: true
                                    },
                                $pop: 
                                    { 
                                        upNext: -1 
                                    }   
                                }
                            );
                            return await getAudioData(upNextO); 
                        } else {
                            Station.update(
                                { userId: userId },
                                { $set: 
                                    {
                                        status: false
                                    }
                                }
                            );
                            return null;
                        }
                
                }
                
                return runMutation();

            }
            throw new Error('Unauthorized');
        }
    }
}