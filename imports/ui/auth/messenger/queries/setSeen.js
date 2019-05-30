import gql from 'graphql-tag';

const SET_SEEN = gql`
    mutation SET_SEEN($chatroomId: String!) {
        seen(chatroomId: $chatroomId)
    }
`;

export default SET_SEEN;