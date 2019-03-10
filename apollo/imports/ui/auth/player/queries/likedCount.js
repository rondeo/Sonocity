import gql from 'graphql-tag';

const LIKED_COUNT = gql`
    query LIKED_COUNT ($audioId: String!) {
        audioLikedCount (audioId: $audioId)
    }
`;

export default LIKED_COUNT;