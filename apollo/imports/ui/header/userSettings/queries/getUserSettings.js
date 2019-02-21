import gql from 'graphql-tag';

export const getUserSettings = gql`
    query getUserSettings {
        userSettings {
            security_lvl
        }
    }
`;