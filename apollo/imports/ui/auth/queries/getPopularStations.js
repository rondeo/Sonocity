import gql from 'graphql-tag';

const GET_POPULAR_STATIONS = gql`
    query GET_POPULAR_STATIONS  {
        popStations {
            _id
        }
    }
`;

export default GET_POPULAR_STATIONS;