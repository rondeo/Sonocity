import gql from 'graphql-tag';

const GET_AUDIO_LINK_BY_ID = gql`
    query GET_AUDIO_LINK_BY_ID ($audioId: String!) {
        audioData (audioId: $audioId) {
            title
            artist
            coverUrl
            fileUrl
            duration
        }
    }
`;

export default GET_AUDIO_LINK_BY_ID;