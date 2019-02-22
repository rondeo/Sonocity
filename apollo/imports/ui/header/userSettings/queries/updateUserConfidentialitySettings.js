import gql from 'graphql-tag';

const UPDATE_USER_CONFIDENTIALITY_SETTINGS = gql`
    mutation UPDATE_USER_CONFIDENTIALITY_SETTINGS($security_lvl: String!) {
        updateUserConfidentialitySettings(security_lvl: $security_lvl) 
    }
`;

export default UPDATE_USER_CONFIDENTIALITY_SETTINGS;