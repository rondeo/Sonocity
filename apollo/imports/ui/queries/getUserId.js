import gql from 'graphql-tag';

export const getUserId = gql`
    query getUserId {
        user {
            _id
        }
    }
`;