import gql from 'graphql-tag';

const GET_STATION_LIKE_NAME = gql`
    query GET_STATION_LIKE_NAME ($expression: String!) {
        stationLikeName (expression: $expression) {
            _id
        }
    }
`;

export default GET_STATION_LIKE_NAME;