import merge from "lodash/merge";

import CreateStation from "./mutations/createStation"
import GetStationDataByUserId from "./queries/getStationDataByUserId"
import UpdateName from "./mutations/updateName"
import UpdateDescription from "./mutations/updateDescription"
import AddToUpNext from "./mutations/addToUpNext"
import ClearUpNext from "./mutations/clearUpNext"
import UpdateCurrentAudio from "./mutations/updateCurrentAudio"
import UpdateCover from "./mutations/updateCover"
import UpdateUpNext from "./mutations/updateUpNext"
import GetOnlineStations from "./queries/getOnlineStations"
import GetStationDataByStationId from "./queries/getStationDataByStationId"
import GetStationInProximity from "./queries/getStationInProximity"
import GetStationLikeName from "./queries/getStationIdLikeName"
import GetAnotherStationDataByUserId from "./queries/getAnotherUserStationDataById"

const resolvers = merge(CreateStation, GetStationDataByUserId, UpdateName, UpdateDescription, GetStationInProximity, GetStationLikeName,
                        AddToUpNext, ClearUpNext, UpdateCurrentAudio, UpdateCover, UpdateUpNext, GetOnlineStations, GetStationDataByStationId, GetAnotherStationDataByUserId);

export default resolvers;