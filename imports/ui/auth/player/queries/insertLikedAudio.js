import gql from 'graphql-tag';

const INSERT_LIKED_AUDIO = gql`
    mutation INSERT_LIKED_AUDIO($audioId: String!) {
        insertLikedAudio(audioId: $audioId) {
            _id
        }
    }
`;

export default INSERT_LIKED_AUDIO;