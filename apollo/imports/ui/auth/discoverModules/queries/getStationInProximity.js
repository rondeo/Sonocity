import gql from 'graphql-tag';

const GET_STATION_IN_PROXIMITY = gql`
    query GET_STATION_IN_PROXIMITY ($latMinRange: Float!, $latMaxRange: Float!, $longMinRange: Float!, $longMaxRange: Float!) {
        stationInProximity (latMinRange: $latMinRange, latMaxRange: $latMaxRange, longMinRange: $longMinRange, longMaxRange: $longMaxRange ) {
            _id
        }
    }
`;

export default GET_STATION_IN_PROXIMITY;