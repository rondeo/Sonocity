import gql from 'graphql-tag';

const CREATE_STATION = gql`
    mutation CREATE_STATION {
        createStation {
            _id
        }
    }
`;

export default CREATE_STATION;