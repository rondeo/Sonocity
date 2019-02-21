import gql from 'graphql-tag';

const GET_USER_SETTINGS = gql`
    query GET_USER_SETTINGS {
        userSettings {
            security_lvl
        }
    }
`;

export default GET_USER_SETTINGS;