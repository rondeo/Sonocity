import gql from 'graphql-tag';

const FOLLOWED_COUNT = gql`
    query FOLLOWED_COUNT ($stationId: String!) {
        followedStationCount(stationId: $stationId)
    }
`;

export default FOLLOWED_COUNT;