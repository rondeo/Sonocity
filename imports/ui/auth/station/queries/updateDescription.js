import gql from 'graphql-tag';

const UPDATE_DESCRIPTION = gql`
    mutation UPDATE_DESCRIPTION($description: String!) {
        updateDescription(description: $description)
    }
`;

export default UPDATE_DESCRIPTION;