import merge from "lodash/merge";

import Upload from "./mutations/upload"
import GetCoverImage from "./queries/getCoverImage"

const resolvers = merge(Upload, GetCoverImage);

export default resolvers;