import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetAllAudioId from "./queries/getAllAudioId"
import GetAudioDataByAudioId from "./queries/getAudioDataByAudioId"
import GetUserAudioId from "./queries/getUserAudioId"

const resolvers = merge(Upload, GetAllAudioId, GetAudioDataByAudioId, GetUserAudioId);

export default resolvers;