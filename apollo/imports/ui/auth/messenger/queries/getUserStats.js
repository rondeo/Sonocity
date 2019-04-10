import gql from 'graphql-tag';

const GET_USER_STATS = gql`
    query GET_USER_STATS {
        user {
            follows
            followed
        }
    }
`;

export default GET_USER_STATS;