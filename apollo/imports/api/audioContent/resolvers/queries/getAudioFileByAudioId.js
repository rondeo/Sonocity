import AudioFile from '../../collections/audioFile'

export default {
    Query : {
        audioFile(obj, { audioId }, { user } ) {
            return AudioFile.findOne({
                audioId: audioId
            });
        }
    }
};