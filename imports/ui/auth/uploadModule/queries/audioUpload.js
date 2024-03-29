import gql from 'graphql-tag';

const UPLOAD_SONG = gql`
    mutation UPLOAD_SONGS($title: String!, $artist: String!, $album: String, $duration: Float!, $dataformat: String!, $fileUrl: String!, $coverUrl: String!) {
        insertAudioContent(title: $title, artist: $artist, album: $album, duration: $duration, dataformat: $dataformat, fileUrl: $fileUrl, coverUrl: $coverUrl) {
            _id
        }
    }
`;

export default UPLOAD_SONG;