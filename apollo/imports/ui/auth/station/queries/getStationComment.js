import gql from 'graphql-tag';

const GET_STATION_COMMENT = gql`
    query GET_STATION_COMMENT {
        stationComment {
            userId
            content
            timeStamp
        }
    }
`;

export default GET_STATION_COMMENT;