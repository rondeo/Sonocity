import gql from 'graphql-tag';

const GET_STATION_DATA_BY_USERID = gql`
    query GET_STATION_DATA_BY_USERID ($userId: String!) {
        userStationById (userId: $userId) {
            name
            coverUrl
        }
    }
`;

export default GET_STATION_DATA_BY_USERID;