import gql from 'graphql-tag';

const getUserSettings = gql`
    query getUserSettings {
        getUserSettings {
            security_lvl
        }
    }
`;

export default getUserSettings;