import gql from 'graphql-tag';

const GET_AUDIO_DATA_LIKE_TITLE = gql`
    query GET_AUDIO_DATA_LIKE_TITLE ($expression: String!) {
        audioLikeTitle (expression: $expression) {
            _id
        }
    }
`;

export default GET_AUDIO_DATA_LIKE_TITLE;