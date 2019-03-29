import gql from 'graphql-tag';

const GET_ALL_FOLLOWED_STATION = gql`
    query GET_ALL_FOLLOWED_STATION {
        userOnlineFollowedStation {
            _id
        }
    }
`;

export default GET_ALL_FOLLOWED_STATION;