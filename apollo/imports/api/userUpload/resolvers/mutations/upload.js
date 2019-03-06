import AudioData from '../mongoCollection/audioData'
import AudioFile from '../mongoCollection/audioFile'
import AudioCoverImage from '../mongoCollection/audioCoverImage'

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
            }
            throw new Error('Unauthorized');
        }
    }

}
