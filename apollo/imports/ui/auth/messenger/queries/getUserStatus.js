import gql from 'graphql-tag';

const GET_USER_STATUS = gql`
    query GET_USER_STATUS ($userId: String!) {
        userOnline (userId: $userId)
    }
`;

export default GET_USER_STATUS;