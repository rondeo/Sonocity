import gql from 'graphql-tag';

const GET_ALL_ONLINE_STATION_ID = gql`
    query GET_ALL_ONLINE_STATION_ID {
        onlineStations {
            _id
            currentAudio
            timeStamp
            upNext
        }
    }
`;

export default GET_ALL_ONLINE_STATION_ID;