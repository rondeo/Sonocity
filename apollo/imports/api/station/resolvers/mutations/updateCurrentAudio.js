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
                    try{
                        const userStation = await getUserStation();
                        const timeStamp = Date.now();
                        const upNextO = userStation.upNext[0]
                        if(upNextO) {
                            Station.update(
                                { userId: userId },
                                { $set:
                                    {
                                        currentAudio: upNextO,
                                        timeStamp: timeStamp
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
                    } catch (e) {
                        console.log(e)
                    }
                }
                
                return runMutation();

            }
            throw new Error('Unauthorized');
        }
    }
}