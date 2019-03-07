import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetAllAudioData from "./queries/getAllAudioData"
import GetAudioFileById from "./queries/getAudioFileByAudioId"

const resolvers = merge(Upload, GetAllAudioData, GetAudioFileById);

export default resolvers;