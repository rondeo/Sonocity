import gql from 'graphql-tag';

const GET_STATION_DATA_BY_ID = gql`
    query GET_STATION_DATA_BY_ID ($_id: String!) {
        station (_id: $_id) {
            name
            coverUrl
            description
            currentAudio
            timeStamp
            upNext
            status
        }
    }
`;

export default GET_STATION_DATA_BY_ID;