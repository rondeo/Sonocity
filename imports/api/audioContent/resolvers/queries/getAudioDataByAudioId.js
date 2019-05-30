import AudioData from '../../collections/audioData'

export default {
    Query : {
        audioData(obj, { audioId }, { user } ) {
            const userId=user._id;
            if(userId) {
                return AudioData.findOne({_id: audioId});
            }
            throw new Error('Unauthorized');
        }
    }
};