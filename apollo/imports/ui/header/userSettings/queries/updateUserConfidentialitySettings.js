import gql from 'graphql-tag';

const UPDATE_USER_CONFIDENTIALITY_SETTINGS = gql`
    mutation UPDATE_USER_CONFIDENTIALITY_SETTINGS($userId: String!, $security_lvl: String!) {
        updateUserConfidentialitySettings(userId: $userId, security_lvl: $security_lvl) {
            _id
        }
    }
`;

export default UPDATE_USER_CONFIDENTIALITY_SETTINGS;