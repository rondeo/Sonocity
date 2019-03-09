import AudioData from '../../collections/audioData'

export default {
    
    Mutation: {
        insertAudioContent(obj, { title, artist, album, duration, dataformat, fileUrl, coverUrl}, { user }) {
            const userId=user._id;
            if(userId) {
                // try {
                    //AudioData.remove({});
                    const audioId = AudioData.insert({
                        userId: userId,
                        title: title,
                        artist: artist,
                        album: album,
                        duration: duration,
                        dataformat: dataformat,
                        fileUrl: fileUrl,
                        coverUrl: coverUrl
                    });
                return AudioData.findOne(audioId);
            }
            throw new Error('Unauthorized');
        }
    }

}
