import gql from 'graphql-tag';

const REMOVE_LIKED_AUDIO = gql`
    mutation REMOVE_LIKED_AUDIO($audioId: String!) {
        removeLikedAudio(audioId: $audioId)
    }
`;

export default REMOVE_LIKED_AUDIO;