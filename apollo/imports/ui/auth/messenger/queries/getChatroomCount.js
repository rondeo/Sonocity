import gql from 'graphql-tag';

const GET_CHATROOM_UNREAD_COUNT = gql`
    query GET_CHATROOM_UNREAD_COUNT ($chatroomId: String!) {
        ureadCount (chatroomId: $chatroomId)
    }
`;

export default GET_CHATROOM_UNREAD_COUNT;