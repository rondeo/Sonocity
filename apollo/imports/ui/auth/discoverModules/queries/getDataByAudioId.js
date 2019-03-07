import gql from 'graphql-tag';

const GET_AUDIO_DATA_BY_ID = gql`
    query GET_AUDIO_DATA_BY_ID ($audioId: String!) {
        audioData (audioId: $audioId) {
            title
            artist
            album
        }
    }
`;

const GET_COVER_BY_AUDIO_ID = gql`
    query GET_COVER_BY_AUDIO_ID ($audioId: String!) {
        audioCoverImage (audioId: $audioId) {
            file
            dataformat
        }
    }
`;

export { 
    GET_AUDIO_DATA_BY_ID,
    GET_COVER_BY_AUDIO_ID
}