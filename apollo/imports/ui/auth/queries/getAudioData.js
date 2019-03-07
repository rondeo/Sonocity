import gql from 'graphql-tag';

const GET_ALL_AUDIO_DATA = gql`
    query GET_ALL_AUDIO_DATA {
        allAudioCover {
            _id
            audioId
            file
        },
        allAudioData {
            _id
            title
            artist
            duration
        }
    }
`;

export default GET_ALL_AUDIO_DATA;