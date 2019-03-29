import gql from 'graphql-tag';

const INSERT_FOLLOWED_STATION = gql`
    mutation INSERT_FOLLOWED_STATION($stationId: String!) {
        insertFollowedStation(stationId: $stationId) {
            _id
        }
    }
`;

export default INSERT_FOLLOWED_STATION;