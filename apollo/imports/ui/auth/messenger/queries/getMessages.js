import gql from 'graphql-tag';

const GET_MESSAGES = gql`
    query GET_MESSAGES($chatroomId: String!) {
        messages(chatroomId: $chatroomId) {
            senderId
            content
            timeStamp
        }
    }
`;

export default GET_MESSAGES;