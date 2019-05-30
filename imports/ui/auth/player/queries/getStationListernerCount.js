import gql from 'graphql-tag';

const GET_STATION_LISTENER_COUNT = gql`
    query GET_STATION_LISTENER_COUNT ($ressourceId: String!) {
        stationListenCount(ressourceId: $ressourceId)
    }
`;

export default GET_STATION_LISTENER_COUNT;