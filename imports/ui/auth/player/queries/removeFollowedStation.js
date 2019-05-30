import gql from 'graphql-tag';

const REMOVE_FOLLOWED_STATION = gql`
    mutation REMOVE_FOLLOWED_STATION($stationId: String!) {
        removeFollowedStation(stationId: $stationId)
    }
`;

export default REMOVE_FOLLOWED_STATION;