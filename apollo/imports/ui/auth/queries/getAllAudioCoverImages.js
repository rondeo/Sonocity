import gql from 'graphql-tag';

const GET_ALL_AUDIO_COVER = gql`
    query GET_ALL_AUDIO_COVER {
        audioCoverImages {
            _id
            audioId
            file
        }
    }
`;

export default GET_ALL_AUDIO_COVER;