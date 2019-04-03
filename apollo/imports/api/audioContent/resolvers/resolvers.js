import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetAllAudioId from "./queries/getAllAudioId"
import GetAudioDataByAudioId from "./queries/getAudioDataByAudioId"
import GetUserAudioId from "./queries/getUserAudioId"
import GetAudioIdLikeTitle from "./queries/getAudioIdLikeTitle"
import GetAudioIdLikeArtist from "./queries/getAudioIdLikeArtist"

const resolvers = merge(Upload, GetAllAudioId, GetAudioDataByAudioId, GetUserAudioId, GetAudioIdLikeTitle, GetAudioIdLikeArtist);

export default resolvers;