import AudioData from '../../collections/audioData'
import AudioFile from '../../collections/audioFile'
import AudioCoverImage from '../../collections/audioCoverImage'

export default {
    
    Mutation: {
        insertAudioContent(obj, { title, artist, album, duration, dataformat, audioFile, coverImage }, {userId}) {
            if(userId) {
                try {
                    const songId = AudioData.insert({
                        userId,
                        title,
                        artist,
                        album,
                        duration,
                        dataformat
                    });
                } catch (e) {
                    console.log("data insert problem");
                }
                try {
                    AudioFile.insert({
                        songId,
                        audioFile
                    });
                } catch (e) {
                    console.log("file insert problem");
                }
                try {
                    AudioCoverImage.insert({
                        songId,
                        coverImage
                    });
                } catch (e) {
                    console.log("image insert problem");
                }
                return AudioData.findOne(songId);
            }
            throw new Error('Unauthorized');
        }
    }

}