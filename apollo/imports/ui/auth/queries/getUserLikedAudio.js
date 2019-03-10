import gql from 'graphql-tag';

const GET_USER_LIKED_AUDIO = gql`
    query GET_USER_LIKED_AUDIO  {
        userLikedAudio {
            audioId
        }
    }
`;

export default GET_USER_LIKED_AUDIO;