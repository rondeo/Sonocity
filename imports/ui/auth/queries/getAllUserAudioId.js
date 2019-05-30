import gql from 'graphql-tag';

const GET_ALL_USER_AUDIO_ID = gql`
    query GET_ALL_USER_AUDIO_ID {
        userAudioId {
            _id
        }
    }
`;

export default GET_ALL_USER_AUDIO_ID;