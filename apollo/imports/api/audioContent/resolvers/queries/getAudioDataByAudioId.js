import AudioData from '../../collections/audioData'

export default {
    Query : {
        audioData(obj, { audioId }, { user } ) {
            return AudioData.findOne({
                _id: audioId
            });
        }
    }
};