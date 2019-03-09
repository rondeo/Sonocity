import UsersResolvers from "../../api/users/resolvers/resolvers"
import UserSettingsResolvers from "../../api/userSettings/resolvers/resolvers"
import AudioContentResolvers from "../../api/audioContent/resolvers/resolvers"
import LogResolvers from "../../api/log/resolvers/resolvers"

import merge from "lodash/merge";

const resolvers = merge(UsersResolvers, UserSettingsResolvers, AudioContentResolvers, LogResolvers);

export default resolvers;