import gql from 'graphql-tag';

const UPLOAD_SONG = gql`
    mutation UPLOAD_SONGS($title: String!, $artist: String!, $album: String, $duration: Float!, $dataformat: String!, $audioFile: String!, $coverImage: String!) {
        insertAudioContent(title: $title, artist: $artist, album: $album, duration: $duration, dataformat: $dataformat, audioFile: $audioFile, coverImage: $coverImage) {
            _id
        }
    }
`;

export default UPLOAD_SONG;