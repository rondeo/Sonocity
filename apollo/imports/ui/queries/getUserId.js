import gql from 'graphql-tag';

const GET_USER_ID = gql`
    query GET_USER_ID {
        user {
            _id
        }
    }
`;

export default GET_USER_ID;