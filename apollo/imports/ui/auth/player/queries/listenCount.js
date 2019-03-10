import gql from 'graphql-tag';

const LISTEN_COUNT = gql`
    query LISTEN_COUNT ($audioId: String!) {
        audioListenCount (audioId: $audioId)
    }
`;

export default LISTEN_COUNT;