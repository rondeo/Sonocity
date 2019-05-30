import gql from 'graphql-tag';

const INSERT_STATION_COMMENT = gql`
    mutation INSERT_STATION_COMMENT($stationId: String!, $content: String!) {
        sendComment(stationId: $stationId, content: $content)
    }
`;

export default INSERT_STATION_COMMENT;