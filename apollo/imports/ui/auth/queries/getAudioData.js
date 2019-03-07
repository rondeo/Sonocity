import gql from 'graphql-tag';

const GET_ALL_AUDIO_DATA = gql`
    query GET_ALL_AUDIO_DATA {
        allAudioCover {
            _id
            audioId
            file
            dataformat
        },
        allAudioData {
            _id
            title
            artist
            duration
            dataformat
        }
    }
`;

export default GET_ALL_AUDIO_DATA;