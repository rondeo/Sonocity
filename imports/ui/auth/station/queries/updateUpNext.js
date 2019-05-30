import gql from 'graphql-tag';

const UPDATE_UP_NEXT = gql`
    mutation UPDATE_UP_NEXT($upNext: [String]!) {
        updateUpNext(upNext: $upNext)
    }
`;

export default UPDATE_UP_NEXT;