import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetAllAudioId from "./queries/getAllAudioId"
import GetAudioDataByAudioId from "./queries/getAudioDataByAudioId"
import GetAudioFileByAudioId from "./queries/getAudioFileByAudioId"
import GetCoverByAudioId from "./queries/getCoverByAudioId"

const resolvers = merge(Upload, GetAllAudioId, GetAudioDataByAudioId, GetAudioFileByAudioId, GetCoverByAudioId);

export default resolvers;