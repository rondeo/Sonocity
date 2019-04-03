import gql from 'graphql-tag';

const SET_USER_LISTENING_CONTEXT = gql`
    mutation SET_USER_LISTENING_CONTEXT ($ressourceId: String!) {
        userListeningContext(ressourceId: $ressourceId)
    }
`;

export default SET_USER_LISTENING_CONTEXT;