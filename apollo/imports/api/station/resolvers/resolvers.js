import merge from "lodash/merge";

import CreateStation from "./mutations/createStation"
import GetStationDataByUserId from "./queries/getStationDataByUserId"
import UpdateName from "./mutations/updateName"
import UpdateDescription from "./mutations/updateDescription"
import AddToUpNext from "./mutations/addToUpNext"
import ClearUpNext from "./mutations/clearUpNext"

const resolvers = merge(CreateStation, GetStationDataByUserId, UpdateName, UpdateDescription, AddToUpNext, ClearUpNext);

export default resolvers;