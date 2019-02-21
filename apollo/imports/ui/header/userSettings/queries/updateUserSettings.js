import gql from 'graphql-tag';

const UPDATE_USER_SETTINGS = gql`
    mutation UPDATE_USER_SETTINGS($userId: String!, $security_lvl: String!) {
        updateUserSettings(userId: $userId, security_lvl: $security_lvl) {
            _id
        }
    }
`;

export default UPDATE_USER_SETTINGS;