import gql from 'graphql-tag';

const GET_CHATROOMS = gql`
    query GET_CHATROOMS {
        chatRooms {
            _id
            userId0
            userId1
        }
    }
`;

export default GET_CHATROOMS;