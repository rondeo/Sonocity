import gql from 'graphql-tag';

const ADD_TO_UP_NEXT = gql`
    mutation ADD_TO_UP_NEXT($audioId: String!) {
        addToUpNext(audioId: $audioId)
    }
`;

export default ADD_TO_UP_NEXT;