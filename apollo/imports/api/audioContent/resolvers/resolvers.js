import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetAllAudioId from "./queries/getAllAudioId"
import GetAudioDataByAudioId from "./queries/getAudioDataByAudioId"

const resolvers = merge(Upload, GetAllAudioId, GetAudioDataByAudioId);

export default resolvers;