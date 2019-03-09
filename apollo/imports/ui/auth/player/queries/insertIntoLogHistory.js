import gql from 'graphql-tag';

const INSERT_LH_LOG = gql`
    mutation INSERT_LH_LOG($audioId: String!) {
        insertLhLog(audioId: $audioId) {
            _id
        }
    }
`;

export default INSERT_LH_LOG;