import gql from 'graphql-tag';

const GET_AUTH_CONFIRM = gql`
    query GET_AUTH_CONFIRM {
        user {
            _id
        }
    }
`;

export default GET_AUTH_CONFIRM;