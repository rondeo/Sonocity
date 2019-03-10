import gql from 'graphql-tag';

const IS_AUDIO_LIKED = gql`
    query IS_AUDIO_LIKED ($audioId: String!) {
        isAudioLiked (audioId: $audioId)
    }
`;

export default IS_AUDIO_LIKED;