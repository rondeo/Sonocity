import gql from 'graphql-tag';

const GET_USER_STATION = gql`
    query GET_USER_STATION  {
        userStation {
            name
            description
            currentAudio
            upNext
            broadcast 
            timeStamp
        }
    }
`;

export default GET_USER_STATION;