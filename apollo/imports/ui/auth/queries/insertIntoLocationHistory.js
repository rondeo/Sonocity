import gql from 'graphql-tag';

const INSERT_INTO_LOCATION_HISTORY = gql`
    mutation INSERT_INTO_LOCATION_HISTORY($timeStamp: Float!, $latitude: Float!, $longitude: Float!) {
        insertLocHistoryAndUpdatePosition(timeStamp: $timeStamp, latitude: $latitude, longitude: $longitude)
    }
`;

export default INSERT_INTO_LOCATION_HISTORY;