import merge from "lodash/merge";

import CreateStation from "./mutations/createStation"
import GetStationDataByUserId from "./queries/getStationDataByUserId"

const resolvers = merge(CreateStation, GetStationDataByUserId);

export default resolvers;