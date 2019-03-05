import gql from 'graphql-tag';

const INSERT_USER_DEFAULT_DATA = gql`
    mutation INSERT_USER_DEFAULT_DATA($security_lvl: String!) {
        insertUserSettings(security_lvl: $security_lvl) {
            security_lvl
        },

    }
`;

export default INSERT_USER_DEFAULT_DATA;