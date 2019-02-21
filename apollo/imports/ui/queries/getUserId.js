import gql from 'graphql-tag';

const getUserId = gql`
    query getUserId {
        user {
            _id
        }
    }
`;

export default getUserId;