import gql from 'graphql-tag';

const IS_STATION_FOLLOWED = gql`
    query IS_STATION_FOLLOWED ($stationId: String!) {
        isStationFollowed (stationId: $stationId)
    }
`;

export default IS_STATION_FOLLOWED;