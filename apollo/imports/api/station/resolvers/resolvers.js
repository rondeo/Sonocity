import merge from "lodash/merge";

import CreateStation from "./mutations/createStation"
import GetStationDataByUserId from "./queries/getStationDataByUserId"
import UpdateName from "./mutations/updateName"
import UpdateDescription from "./mutations/updateDescription"

const resolvers = merge(CreateStation, GetStationDataByUserId, UpdateName, UpdateDescription);

export default resolvers;