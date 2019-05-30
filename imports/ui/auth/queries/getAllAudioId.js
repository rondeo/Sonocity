import gql from 'graphql-tag';

const GET_ALL_AUDIO_ID = gql`
    query GET_ALL_AUDIO_ID {
        allAudioId {
            _id
        }
    }
`;

export default GET_ALL_AUDIO_ID;