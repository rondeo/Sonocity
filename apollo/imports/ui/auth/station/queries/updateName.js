import gql from 'graphql-tag';

const UPDATE_NAME = gql`
    mutation UPDATE_NAME($name: String!) {
        updateName(name: $name)
    }
`;

export default UPDATE_NAME;