import gql from 'graphql-tag';

const updateUserSettings = gql`
    mutation updateUserSettings($userId: String!, $security_lvl: String!) {
        updateUserSettings(userId: $userId, security_lvl: $security_lvl) {
            _id
        }
    }
`;

export default updateUserSettings;