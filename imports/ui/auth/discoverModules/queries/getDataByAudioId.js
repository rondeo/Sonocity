import gql from 'graphql-tag';

const GET_AUDIO_DATA_BY_ID = gql`
    query GET_AUDIO_DATA_BY_ID ($audioId: String!) {
        audioData (audioId: $audioId) {
            title
            artist
            coverUrl
        }
    }
`;

export default GET_AUDIO_DATA_BY_ID;