import UsersResolvers from "../../api/users/resolvers/resolvers"
import AudioContentResolvers from "../../api/audioContent/resolvers/resolvers"
import LogResolvers from "../../api/log/resolvers/resolvers"
import StationResolvers from "../../api/station/resolvers/resolvers"
import MessengerResolvers from "../../api/messenger/resolvers/resolvers"

import merge from "lodash/merge";

const resolvers = merge(UsersResolvers, AudioContentResolvers, LogResolvers, StationResolvers, MessengerResolvers);

export default resolvers;