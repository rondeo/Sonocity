import gql from 'graphql-tag';

const getUserSettings = gql`
    query getUserSettings($userId: String) {
        getUserSettings(userId: $userId) {
            security_lvl
        }
    }
`;

export default getUserSettings;