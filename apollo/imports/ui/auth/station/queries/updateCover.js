import gql from 'graphql-tag';

const UPDATE_COVER = gql`
    mutation UPDATE_COVER($coverUrl: String!) {
        updateCover(coverUrl: $coverUrl)
    }
`;

export default UPDATE_COVER;