import AudioData from '../../collections/audioData'
// import AudioFile from '../../collections/audioFile'
import AudioCoverImage from '../../collections/audioCoverImage'

export default {
    
    Mutation: {
        insertAudioContent(obj, { title, artist, album, duration, dataformat, fileUrl, coverImage, imgMimeType }, { user }) {
            // console.log(user);
            const userId=user._id;
            if(userId) {
                // const songId = null;
                // try {
                    // AudioData.remove({});
                    const audioId = AudioData.insert({
                        userId: userId,
                        title: title,
                        artist: artist,
                        album: album,
                        duration: duration,
                        dataformat: dataformat,
                        fileUrl: fileUrl
                    });
                // } catch (e) {
                //     console.log("data insert problem");
                // }
                // try {
                    //AudioFile.remove({});
                    // const fileId = AudioFile.insert({
                        // audioId: audioId,
                        // file: audioFile
                    // });
 
                // } catch (e) {
                //     console.log("file insert problem");
                // }
                // try {
                    // AudioCoverImage.remove({});
                    const coverId = AudioCoverImage.insert({
                        audioId: audioId,
                        file: coverImage,
                        dataformat: imgMimeType
                    });

                // } catch (e) {
                //     console.log("image insert problem");
                // }
                return AudioData.findOne(audioId);
            }
            throw new Error('Unauthorized');
        }
    }

}
