import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
    mutation SEND_MESSAGE($chatroomId: String!, $content: String!, $timeStamp:Float!) {
        newMessage(chatroomId: $chatroomId, content: $content, timeStamp: $timeStamp)
    }
`;

export default SEND_MESSAGE;