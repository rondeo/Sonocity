import gql from 'graphql-tag';

const UPDATE_STATION_CURRENT_AUDIO = gql`
    mutation UPDATE_STATION_CURRENT_AUDIO {
        updateCurrentAudio{
            duration
        }
    }
`;

export default UPDATE_STATION_CURRENT_AUDIO;