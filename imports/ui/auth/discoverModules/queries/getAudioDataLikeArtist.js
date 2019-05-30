import gql from 'graphql-tag';

const GET_AUDIO_DATA_LIKE_ARTIST = gql`
    query GET_AUDIO_DATA_LIKE_ARTIST ($expression: String!) {
        audioLikeArtist (expression: $expression) {
            _id
        }
    }
`;

export default GET_AUDIO_DATA_LIKE_ARTIST;